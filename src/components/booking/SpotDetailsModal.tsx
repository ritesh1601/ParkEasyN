import React, { useState } from "react";
import { X, MapPin, Clock, Car, CreditCard, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";

interface SpotDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  spot?: {
    id: string;
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
    type: string;
  };
}

const SpotDetailsModal = ({
  isOpen = true,
  onClose = () => {},
  spot = {
    id: "spot-123",
    name: "Downtown Secure Parking",
    address: "123 Main St, Downtown",
    description:
      "Secure parking spot in the heart of downtown with 24/7 access and security cameras. Easy access to restaurants, shopping, and public transportation.",
    hourlyRate: 5,
    dailyRate: 25,
    monthlyRate: 300,
    amenities: ["Security Camera", "Covered", "24/7 Access", "Well-lit"],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    rating: 4.7,
    reviews: 28,
    images: [
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&q=80",
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
    ],
    distance: "0.3 miles",
    type: "Garage",
  },
}: SpotDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingStage, setBookingStage] = useState<"details" | "payment">(
    "details",
  );
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleBookingSubmit = (details: any) => {
    setBookingDetails(details);
    setBookingStage("payment");
  };

  const handlePaymentSubmit = (paymentDetails: any) => {
    // In a real app, this would submit the booking and payment to an API
    console.log("Booking submitted:", {
      ...bookingDetails,
      payment: paymentDetails,
    });
    onClose();
  };

  const handleBackToDetails = () => {
    setBookingStage("details");
  };

  const getDayAvailability = () => {
    const days = [
      { day: "Mon", key: "monday" },
      { day: "Tue", key: "tuesday" },
      { day: "Wed", key: "wednesday" },
      { day: "Thu", key: "thursday" },
      { day: "Fri", key: "friday" },
      { day: "Sat", key: "saturday" },
      { day: "Sun", key: "sunday" },
    ];

    return (
      <div className="flex justify-between mt-2">
        {days.map(({ day, key }) => (
          <div
            key={key}
            className={`flex flex-col items-center p-2 rounded-md ${spot.availability[key as keyof typeof spot.availability] ? "bg-green-50" : "bg-gray-100"}`}
          >
            <span className="text-xs font-medium">{day}</span>
            <span
              className={`text-xs mt-1 ${spot.availability[key as keyof typeof spot.availability] ? "text-green-600" : "text-gray-400"}`}
            >
              {spot.availability[key as keyof typeof spot.availability]
                ? "✓"
                : "✗"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{spot.name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{spot.address}</span>
            <Badge variant="outline" className="ml-2">
              {spot.distance}
            </Badge>
            <Badge variant="secondary" className="ml-2">
              {spot.type}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Images and details */}
          <div>
            <div className="relative h-64 overflow-hidden rounded-md mb-2">
              <img
                src={spot.images[activeImageIndex]}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex space-x-2 mb-4">
              {spot.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-16 w-16 rounded-md overflow-hidden border-2 ${index === activeImageIndex ? "border-primary" : "border-transparent"}`}
                >
                  <img
                    src={image}
                    alt={`${spot.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <Tabs
              defaultValue="details"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{spot.description}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Pricing</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <Clock className="h-4 w-4 text-gray-500 mb-1" />
                      <span className="text-xs font-medium">Hourly</span>
                      <span className="text-sm font-bold">
                        ${spot.hourlyRate}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <Calendar className="h-4 w-4 text-gray-500 mb-1" />
                      <span className="text-xs font-medium">Daily</span>
                      <span className="text-sm font-bold">
                        ${spot.dailyRate}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <CreditCard className="h-4 w-4 text-gray-500 mb-1" />
                      <span className="text-xs font-medium">Monthly</span>
                      <span className="text-sm font-bold">
                        ${spot.monthlyRate}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {spot.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  {getDayAvailability()}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                    <span className="text-lg font-bold text-green-600">
                      {spot.rating}
                    </span>
                    <span className="text-green-600 ml-1">★</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {spot.reviews} reviews
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Mock reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">John D.</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-xs">★★★★★</span>
                          <span className="text-xs text-gray-500 ml-1">
                            2 weeks ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Great parking spot! Very convenient location and easy to
                      find. The spot was clean and well-maintained.
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Sarah M.</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-xs">★★★★</span>
                          <span className="text-xs text-gray-500 ml-1">
                            1 month ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      The security cameras made me feel safe leaving my car
                      here. Would definitely use this spot again when I'm in the
                      area.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Michael T.</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-xs">★★★★★</span>
                          <span className="text-xs text-gray-500 ml-1">
                            2 months ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Perfect location for downtown access. The 24/7 access was
                      exactly what I needed for my late night work schedule.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Booking form */}
          <div className="bg-gray-50 p-4 rounded-lg">
            {bookingStage === "details" ? (
              <BookingForm
                spotId={spot.id}
                spotName={spot.name}
                hourlyRate={spot.hourlyRate}
                onSubmit={handleBookingSubmit}
                onCancel={onClose}
              />
            ) : (
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToDetails}
                  className="mb-2"
                >
                  ← Back to details
                </Button>
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  totalAmount={
                    bookingDetails
                      ? spot.hourlyRate * bookingDetails.duration
                      : 0
                  }
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-start mt-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Car className="h-4 w-4 mr-1" />
            <span>Managed by verified parking owner</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpotDetailsModal;
