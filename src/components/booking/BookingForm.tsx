import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  spotId?: string;
  spotName?: string;
  hourlyRate?: number;
  onSubmit?: (bookingDetails: BookingDetails) => void;
  onCancel?: () => void;
}

interface BookingDetails {
  date: Date | undefined;
  startTime: string;
  duration: number;
  vehicleType: string;
  licensePlate: string;
}

const BookingForm = ({
  spotId = "spot-123",
  spotName = "Downtown Parking Spot #42",
  hourlyRate = 15,
  onSubmit = () => {},
  onCancel = () => {},
}: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState(1);
  const [vehicleType, setVehicleType] = useState("sedan");
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      startTime,
      duration,
      vehicleType,
      licensePlate,
    });
  };

  const calculateTotal = () => {
    return hourlyRate * duration;
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book Parking Spot</h3>
      <p className="text-sm text-gray-500 mb-6">{spotName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <Label htmlFor="time">Start Time</Label>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            <Input
              id="time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Duration Selection */}
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours)</Label>
          <Select
            value={duration.toString()}
            onValueChange={(value) => setDuration(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((hours) => (
                <SelectItem key={hours} value={hours.toString()}>
                  {hours} {hours === 1 ? "hour" : "hours"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <div className="flex items-center">
            <Car className="mr-2 h-4 w-4 text-gray-500" />
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* License Plate */}
        <div className="space-y-2">
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="Enter license plate"
          />
        </div>

        {/* Price Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between">
            <span>Hourly Rate:</span>
            <span>${hourlyRate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>
              {duration} {duration === 1 ? "hour" : "hours"}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
