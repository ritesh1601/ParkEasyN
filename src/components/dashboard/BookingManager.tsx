import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Search,
  X,
  CheckCircle,
  XCircle,
  Edit,
} from "lucide-react";
import { format, addDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Booking {
  id: string;
  spotId: string;
  spotName: string;
  driverName: string;
  driverEmail: string;
  startTime: Date;
  endTime: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  amount: number;
}

interface BookingManagerProps {
  bookings?: Booking[];
  onApprove?: (bookingId: string) => void;
  onReject?: (bookingId: string) => void;
  onModify?: (bookingId: string, updatedBooking: Partial<Booking>) => void;
}

// Helper function to get status badge - moved outside component to be accessible to BookingTable
const getStatusBadge = (status: Booking["status"]) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "confirmed":
      return <Badge variant="default">Confirmed</Badge>;
    case "completed":
      return <Badge variant="outline">Completed</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return null;
  }
};

const BookingManager = ({
  bookings = [
    {
      id: "1",
      spotId: "spot-001",
      spotName: "Downtown Parking A12",
      driverName: "John Smith",
      driverEmail: "john.smith@example.com",
      startTime: addDays(new Date(), 1),
      endTime: addDays(new Date(), 1.33),
      status: "pending",
      amount: 25.0,
    },
    {
      id: "2",
      spotId: "spot-002",
      spotName: "City Center B5",
      driverName: "Sarah Johnson",
      driverEmail: "sarah.j@example.com",
      startTime: addDays(new Date(), 2),
      endTime: addDays(new Date(), 2.17),
      status: "confirmed",
      amount: 15.5,
    },
    {
      id: "3",
      spotId: "spot-003",
      spotName: "Riverside Parking C8",
      driverName: "Michael Brown",
      driverEmail: "mbrown@example.com",
      startTime: addDays(new Date(), -1),
      endTime: addDays(new Date(), -0.58),
      status: "completed",
      amount: 30.0,
    },
    {
      id: "4",
      spotId: "spot-001",
      spotName: "Downtown Parking A12",
      driverName: "Emily Davis",
      driverEmail: "emily.d@example.com",
      startTime: addDays(new Date(), 3),
      endTime: addDays(new Date(), 3.13),
      status: "cancelled",
      amount: 12.75,
    },
  ],
  onApprove = () => {},
  onReject = () => {},
  onModify = () => {},
}: BookingManagerProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter bookings based on active tab and search query
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && booking.status === "pending") ||
      (activeTab === "confirmed" && booking.status === "confirmed") ||
      (activeTab === "completed" && booking.status === "completed") ||
      (activeTab === "cancelled" && booking.status === "cancelled");

    const matchesSearch =
      booking.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.spotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.driverEmail.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Booking Management</CardTitle>
        <div className="flex items-center justify-between mt-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select defaultValue="today">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <BookingTable
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          <TabsContent value="pending" className="mt-0">
            <BookingTable
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          <TabsContent value="confirmed" className="mt-0">
            <BookingTable
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          <TabsContent value="completed" className="mt-0">
            <BookingTable
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          <TabsContent value="cancelled" className="mt-0">
            <BookingTable
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Booking ID
                    </p>
                    <p>{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <div className="mt-1">
                      {getStatusBadge(selectedBooking.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Parking Spot
                  </p>
                  <p>
                    {selectedBooking.spotName} (ID: {selectedBooking.spotId})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Driver
                    </p>
                    <p>{selectedBooking.driverName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <p className="truncate">{selectedBooking.driverEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Start Time</p>
                      <p className="text-sm">
                        {format(selectedBooking.startTime, "PPP")}
                      </p>
                      <p className="text-sm">
                        {format(selectedBooking.startTime, "p")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">End Time</p>
                      <p className="text-sm">
                        {format(selectedBooking.endTime, "PPP")}
                      </p>
                      <p className="text-sm">
                        {format(selectedBooking.endTime, "p")}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Amount
                  </p>
                  <p className="text-lg font-semibold">
                    ${selectedBooking.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex space-x-2 w-full sm:w-auto">
                  {selectedBooking.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={() => {
                          onReject(selectedBooking.id);
                          setIsDetailsOpen(false);
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        className="flex-1 sm:flex-none"
                        onClick={() => {
                          onApprove(selectedBooking.id);
                          setIsDetailsOpen(false);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </>
                  )}
                  {selectedBooking.status === "confirmed" && (
                    <Button
                      variant="outline"
                      className="flex-1 sm:flex-none"
                      onClick={() => {
                        // Open modify dialog or implement inline editing
                        onModify(selectedBooking.id, {});
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Modify Booking
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto mt-2 sm:mt-0"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

interface BookingTableProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
}

const BookingTable = ({
  bookings = [],
  onViewDetails = () => {},
}: BookingTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Parking Spot</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-muted-foreground"
              >
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.spotName}</TableCell>
                <TableCell>{booking.driverName}</TableCell>
                <TableCell>
                  {format(booking.startTime, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>${booking.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onViewDetails(booking)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingManager;
