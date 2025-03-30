import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";

export interface SpotMarkerProps {
  id?: string;
  lat?: number;
  lng?: number;
  price?: number;
  available?: boolean;
  type?: "standard" | "premium" | "handicap";
  onClick?: () => void;
}

const SpotMarker = ({
  id = "spot-1",
  lat = 37.7749,
  lng = -122.4194,
  price = 15,
  available = true,
  type = "standard",
  onClick = () => {},
}: SpotMarkerProps) => {
  // Determine marker color based on availability and type
  const getMarkerColor = () => {
    if (!available) return "bg-gray-400";

    switch (type) {
      case "premium":
        return "bg-purple-500";
      case "handicap":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  // Determine badge variant based on availability
  const getBadgeVariant = () => {
    if (!available) return "secondary";
    return "default";
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onClick}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full ${getMarkerColor()} shadow-md hover:scale-110 transition-transform duration-200 border-2 border-white`}
              aria-label={`Parking spot ${id}, ${price} per hour, ${available ? "available" : "unavailable"}`}
            >
              <MapPin className="w-5 h-5 text-white" />
              <div className="absolute -top-3 -right-3">
                <Badge
                  variant={getBadgeVariant()}
                  className="text-xs px-1.5 py-0.5"
                >
                  ${price}
                </Badge>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              <p className="font-bold">
                {type.charAt(0).toUpperCase() + type.slice(1)} Spot
              </p>
              <p>${price}/hr</p>
              <p className={available ? "text-green-500" : "text-red-500"}>
                {available ? "Available" : "Unavailable"}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SpotMarker;
