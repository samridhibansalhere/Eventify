import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    paymentId: {
      type: String,
      required: true,
    },
    ticketType: {
      type: String,
      required: true,
    },
    ticketsCount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status : {
      type: String,
      required: true,
      default: "booked"
    }
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.bookings) {
  delete mongoose.models.bookings;
}

const BookingModel = mongoose.model("bookings", bookingSchema);
export default BookingModel;