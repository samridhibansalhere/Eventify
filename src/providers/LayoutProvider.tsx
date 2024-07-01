"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { RiSidebarUnfoldLine, RiSidebarFoldLine } from "react-icons/ri"; // Import Remix icons for sidebar unfold and fold
import Loading from "@/app/loading"; // Adjust the path according to your file structure

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loggedInUserData, setLoggedInUserData] = useState<{ userName: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const menusForAdmin = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Events",
      path: "/admin/events",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
    },
    {
      title: "Reports",
      path: "/admin/reports",
    },
  ];

  const menusForUser = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Bookings",
      path: "/bookings",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [menusToShow, setMenusToShow] = useState<any[]>([]);
  const isPrivateRoute = !["/sign-in", "/sign-up"].includes(pathname);

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/current-user");
      const userData = response.data.user;
      setLoggedInUserData(userData);
      if (userData.isAdmin) {
        setMenusToShow(menusForAdmin);
        setIsAdmin(true);
      } else {
        setMenusToShow(menusForUser);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPrivateRoute) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <Loading />;
  }

  // Conditionally render based on loggedInUserData and pathname
  const renderHeader = () => {
    if (!loggedInUserData || pathname === "/sign-in" || pathname === "/sign-up") {
      return null; // If user is not logged in or on sign-in/up page, do not render header
    }

    return (
      <header className="lg:px-20 p-4 flex justify-between items-center border-b border-solid bg-white shadow-md">
        <h1
          className="font-semibold text-blue-900 text-lg md:text-xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          EVENTIFY
        </h1>
        {loggedInUserData ? (
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">{loggedInUserData?.userName}</span>
            <UserButton />
          </div>
        ) : null /* Remove the sign-in button from header rendering */}
      </header>
    );
  };

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      {renderHeader()}
      <div className="flex flex-grow">
        {isPrivateRoute && (
          <div
            className={`bg-white shadow-md p-2 transition-width duration-300 ${
              isSidebarOpen ? "min-w-25" : "min-w-12"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h1
                className={`font-semibold cursor-pointer text-blue-900 text-lg md:text-xl`}
                onClick={() => router.push("/")}
              >
                {isSidebarOpen ? "Profile" : "P"}
              </h1>
              <button className="text-blue-900 p-2" onClick={toggleSidebar}>
                <i className="text-2xl">
                  {!isSidebarOpen ? <RiSidebarUnfoldLine /> : <RiSidebarFoldLine />}
                </i>
              </button>
            </div>
            <ul>
              {menusToShow.map((menu) => (
                <li
                  key={menu.title}
                  className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
                  onClick={() => {
                    router.push(menu.path);
                  }}
                >
                  <span className={`flex-grow ${isSidebarOpen ? "block" : "hidden"}`}>
                    {menu.title}
                  </span>
                  <span className={`${isSidebarOpen ? "hidden" : "block"}`}>
                    {menu.title.charAt(0)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex-grow p-5">
          {!isAdmin && pathname.includes("admin")
            ? "You are not authorized to view this page"
            : children}
        </div>
      </div>
    </div>
  );
}

export default LayoutProvider;
