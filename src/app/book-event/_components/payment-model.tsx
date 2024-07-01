import React from "react";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EventType } from "@/interfaces/events";
import axios from "axios";
interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalAmount: number;
}

function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  event,
  ticketType,
  ticketsCount,
  totalAmount,
}: PaymentModalProps) {
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url:"https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });
      if (result.error) {
        toast.error(result.error.message!);
      } else {
        toast.success("Payment successful");

        const reqBody = {
          event: event._id,
          ticketType,
          ticketsCount,
          totalAmount,
          paymentId: result.paymentIntent?.id,
        };

        await axios.post("/api/bookings", reqBody);
        toast.success("Event booked successfully");
        router.push("/bookings");
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong, if you have been charged, please contact us"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      size="2xl"
    >
      <ModalContent>
        <form className="p-5" onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{
              allowedCountries: ["US"],
              mode: "shipping",
            }}
          />
          <div className="flex justify-end gap-5 mt-5">
            <Button type="button">Cancel</Button>
            <Button color="primary" type="submit" isLoading={loading}>
              Pay
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;
