import React, { useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Clock,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  description: string;
  price: number;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
  amenities: string[];
  images: string[];
  active: boolean;
}

const ListingManager = ({
  spots = defaultParkingSpots,
}: {
  spots?: ParkingSpot[];
}) => {
  const [activeTab, setActiveTab] = useState("active");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const activeSpots = spots.filter((spot) => spot.active);
  const inactiveSpots = spots.filter((spot) => !spot.active);

  const handleEdit = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the spot
    console.log(`Deleting spot with id: ${id}`);
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Parking Spots</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Spot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Parking Spot</DialogTitle>
              <DialogDescription>
                Fill in the details below to list your parking spot for rent.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Spot Name
                  </label>
                  <Input id="name" placeholder="e.g. Downtown Secure Parking" />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Full address of the parking spot"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your parking spot, including access instructions and notable features"
                    rows={3}
                  />
                </div>
                <div>
                  <label htmlFor="hourlyRate" className="text-sm font-medium">
                    Hourly Rate ($)
                  </label>
                  <Input id="hourlyRate" type="number" placeholder="0.00" />
                </div>
                <div>
                  <label htmlFor="dailyRate" className="text-sm font-medium">
                    Daily Rate ($)
                  </label>
                  <Input id="dailyRate" type="number" placeholder="0.00" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Availability</label>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div key={day} className="flex flex-col items-center">
                          <span className="text-xs">{day}</span>
                          <input type="checkbox" className="mt-1" />
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <label htmlFor="images" className="text-sm font-medium">
                    Upload Images
                  </label>
                  <Input id="images" type="file" multiple className="mt-1" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Spot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Parking Spot</DialogTitle>
              <DialogDescription>
                Update the details of your parking spot listing.
              </DialogDescription>
            </DialogHeader>
            {selectedSpot && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="edit-name" className="text-sm font-medium">
                      Spot Name
                    </label>
                    <Input id="edit-name" defaultValue={selectedSpot.name} />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="edit-address"
                      className="text-sm font-medium"
                    >
                      Address
                    </label>
                    <Input
                      id="edit-address"
                      defaultValue={selectedSpot.address}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="edit-description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <Textarea
                      id="edit-description"
                      defaultValue={selectedSpot.description}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-hourlyRate"
                      className="text-sm font-medium"
                    >
                      Hourly Rate ($)
                    </label>
                    <Input
                      id="edit-hourlyRate"
                      type="number"
                      defaultValue={selectedSpot.hourlyRate}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-dailyRate"
                      className="text-sm font-medium"
                    >
                      Daily Rate ($)
                    </label>
                    <Input
                      id="edit-dailyRate"
                      type="number"
                      defaultValue={selectedSpot.dailyRate}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Availability</label>
                    <div className="grid grid-cols-7 gap-2 mt-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day, index) => {
                          const dayKey = [
                            "monday",
                            "tuesday",
                            "wednesday",
                            "thursday",
                            "friday",
                            "saturday",
                            "sunday",
                          ][index] as keyof typeof selectedSpot.availability;
                          return (
                            <div
                              key={day}
                              className="flex flex-col items-center"
                            >
                              <span className="text-xs">{day}</span>
                              <input
                                type="checkbox"
                                className="mt-1"
                                defaultChecked={
                                  selectedSpot.availability[dayKey]
                                }
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Spot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        defaultValue="active"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="active">
            Active Listings ({activeSpots.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive Listings ({inactiveSpots.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                onEdit={() => handleEdit(spot)}
                onDelete={() => handleDelete(spot.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactiveSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                onEdit={() => handleEdit(spot)}
                onDelete={() => handleDelete(spot.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SpotCardProps {
  spot: ParkingSpot;
  onEdit: () => void;
  onDelete: () => void;
}

const SpotCard = ({ spot, onEdit, onDelete }: SpotCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            spot.images[0] ||
            "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80"
          }
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${spot.active ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}
          >
            {spot.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{spot.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {spot.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-medium mt-1">Hourly</span>
            <span className="text-sm font-bold">${spot.hourlyRate}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-medium mt-1">Daily</span>
            <span className="text-sm font-bold">${spot.dailyRate}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Car className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-medium mt-1">Monthly</span>
            <span className="text-sm font-bold">${spot.monthlyRate}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{spot.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

// Default mock data
const defaultParkingSpots: ParkingSpot[] = [
  {
    id: "1",
    name: "Downtown Secure Parking",
    address: "123 Main St, Downtown",
    description:
      "Secure parking spot in the heart of downtown with 24/7 access and security cameras.",
    price: 15,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    hourlyRate: 5,
    dailyRate: 25,
    monthlyRate: 300,
    amenities: ["Security Camera", "Covered", "24/7 Access"],
    images: [
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    ],
    active: true,
  },
  {
    id: "2",
    name: "Riverside Parking Lot",
    address: "456 River Rd, Riverside",
    description:
      "Spacious parking spot with easy access to the riverside park and downtown area.",
    price: 12,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    hourlyRate: 4,
    dailyRate: 20,
    monthlyRate: 250,
    amenities: ["Uncovered", "Well-lit", "Near Public Transit"],
    images: [
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&q=80",
    ],
    active: true,
  },
  {
    id: "3",
    name: "Shopping Center Parking",
    address: "789 Market St, Shopping District",
    description:
      "Convenient parking spot located near major shopping centers and restaurants.",
    price: 10,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    hourlyRate: 3,
    dailyRate: 18,
    monthlyRate: 220,
    amenities: ["Uncovered", "Shopping Nearby", "Restaurants"],
    images: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
    ],
    active: false,
  },
  {
    id: "4",
    name: "Office Building Garage",
    address: "101 Business Ave, Financial District",
    description:
      "Underground parking in a secure office building garage with elevator access.",
    price: 18,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    hourlyRate: 6,
    dailyRate: 30,
    monthlyRate: 350,
    amenities: ["Covered", "Security", "Elevator Access"],
    images: [
      "https://images.unsplash.com/photo-1545179605-1296651e9d43?w=800&q=80",
    ],
    active: true,
  },
  {
    id: "5",
    name: "Residential Driveway",
    address: "222 Oak St, Residential Area",
    description:
      "Private driveway in a quiet residential neighborhood, perfect for long-term parking.",
    price: 8,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    hourlyRate: 2,
    dailyRate: 15,
    monthlyRate: 180,
    amenities: ["Uncovered", "Residential", "Quiet Area"],
    images: [
      "https://images.unsplash.com/photo-1505545121909-2d5a31d5ec1e?w=800&q=80",
    ],
    active: false,
  },
];

export default ListingManager;
