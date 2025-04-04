import React, { useState } from "react";
import Header from "./layout/Header";
import ParkingMap from "./map/ParkingMap";
import SpotDetailsModal from "./booking/SpotDetailsModal";
import OwnerDashboard from "./dashboard/OwnerDashboard";
import NotificationCenter from "./notifications/NotificationCenter";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from './Footer/Footer'

interface ParkingSpot {
  id: string;
  lat: number;
  lng: number;
  price: number;
  available: boolean;
  type: "standard" | "premium" | "handicap";
  name: string;
  address: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
  amenities: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  rating: number;
  reviews: number;
  images: string[];
  distance: string;
}

const Home = () => {
  const [userType, setUserType] = useState<"driver" | "owner">("driver");
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isSpotDetailsOpen, setIsSpotDetailsOpen] = useState(false);

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const userData = isAuthenticated
    ? {
        name: user?.name || "Guest",
        email: user?.email || "",
        avatar: user?.picture || "",
      }
    : {
        name: "Guest",
        email: "",
        avatar: "",
      };

  const handleLogin = () => loginWithRedirect();
  const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });

  const handleToggleUserType = () => {
    setUserType(userType === "driver" ? "owner" : "driver");
  };

  const handleSpotSelect = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setIsSpotDetailsOpen(true);
  };

  const handleCloseSpotDetails = () => {
    setIsSpotDetailsOpen(false);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isAuthenticated}
        userType={userType}
        userName={userData.name}
        userAvatar={userData.avatar}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onToggleUserType={handleToggleUserType}
        onSearch={handleSearch}
      />

      <main className="pt-[70px]">
        {userType === "driver" ? (
          <div className="relative">
            <ParkingMap onSpotSelect={handleSpotSelect} />
            <div className="absolute top-4 right-4 z-10">
              <NotificationCenter />
            </div>
            {selectedSpot && (
              <SpotDetailsModal
                isOpen={isSpotDetailsOpen}
                onClose={handleCloseSpotDetails}
                spot={{
                  ...selectedSpot,
                  description: selectedSpot.description || "A convenient parking spot in a great location.",
                  hourlyRate: selectedSpot.hourlyRate || selectedSpot.price,
                  dailyRate: selectedSpot.dailyRate || selectedSpot.price * 5,
                  monthlyRate: selectedSpot.monthlyRate || selectedSpot.price * 100,
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
                  images: selectedSpot.images || ["https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80"],
                  distance: selectedSpot.distance || "0.5 miles",
                  type: selectedSpot.type || "standard",
                }}
              />
            )}
          </div>
        ) : (
          <OwnerDashboard ownerName={userData.name} ownerEmail={userData.email} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
