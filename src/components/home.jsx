import React, { useState } from "react";
import Header from "./layout/Header";
import ParkingMap from "./map/ParkingMap";
import SpotDetailsModal from "./booking/SpotDetailsModal";
import OwnerDashboard from "./dashboard/OwnerDashboard";
import NotificationCenter from "./notifications/NotificationCenter";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("driver");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isSpotDetailsOpen, setIsSpotDetailsOpen] = useState(false);

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleToggleUserType = () => {
    setUserType(userType === "driver" ? "owner" : "driver");
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotDetailsOpen(true);
  };

  const handleCloseSpotDetails = () => {
    setIsSpotDetailsOpen(false);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // In a real app, this would filter spots or navigate to search results
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        userType={userType}
        userName={userData.name}
        userAvatar={userData.avatar}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onToggleUserType={handleToggleUserType}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="pt-[70px]">
        {" "}
        {/* Offset for fixed header */}
        {userType === "driver" ? (
          <div className="relative">
            {/* Driver View - Map Interface */}
            <ParkingMap onSpotSelect={handleSpotSelect} />

            {/* Notification Center - Positioned in top right */}
            <div className="absolute top-4 right-4 z-10">
              <NotificationCenter />
            </div>

            {/* Spot Details Modal */}
            {selectedSpot && (
              <SpotDetailsModal
                isOpen={isSpotDetailsOpen}
                onClose={handleCloseSpotDetails}
                spot={{
                  ...selectedSpot,
                  // Add any missing properties with default values
                  description:
                    selectedSpot.description ||
                    "A convenient parking spot in a great location.",
                  hourlyRate: selectedSpot.hourlyRate || selectedSpot.price,
                  dailyRate: selectedSpot.dailyRate || selectedSpot.price * 5,
                  monthlyRate:
                    selectedSpot.monthlyRate || selectedSpot.price * 100,
                  amenities: selectedSpot.amenities || ["Standard Parking"],
                  availability: selectedSpot.availability || {
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    sunday: true,
                  },
                  rating: selectedSpot.rating || 4.5,
                  reviews: selectedSpot.reviews || 12,
                  images: selectedSpot.images || [
                    "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
                  ],
                  distance: selectedSpot.distance || "0.5 miles",
                  type: selectedSpot.type || "standard",
                }}
              />
            )}
          </div>
        ) : (
          /* Owner View - Dashboard Interface */
          <OwnerDashboard
            ownerName={userData.name}
            ownerEmail={userData.email}
          />
        )}
      </main>

      {/* Footer - Simple version */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-lg font-bold">ParkEasy</span>
              <span className="text-sm text-gray-500 ml-2">
                © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Help
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
