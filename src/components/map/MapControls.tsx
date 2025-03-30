import React, { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Sliders,
  Clock,
  DollarSign,
  Car,
  ParkingSquare,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface MapControlsProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  onLocationSelect?: (location: string) => void;
}

interface FilterOptions {
  priceRange: [number, number];
  duration: string;
  amenities: string[];
  parkingType: string;
}

const MapControls = ({
  onSearch = () => {},
  onFilterChange = () => {},
  onLocationSelect = () => {},
}: MapControlsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50],
    duration: "hourly",
    amenities: [],
    parkingType: "all",
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];

    handleFilterChange({ amenities: updatedAmenities });
  };

  const handleCurrentLocationClick = () => {
    setUseCurrentLocation(true);
    // In a real implementation, this would use the browser's geolocation API
    onLocationSelect("Current Location");
  };

  return (
    <Card className="w-[350px] h-[500px] bg-white overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Find Parking</CardTitle>
        <CardDescription>
          Search and filter available parking spots
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleCurrentLocationClick}
          >
            <MapPin className="h-4 w-4" />
            Use Current Location
          </Button>
        </form>

        <div className="mt-6">
          <Tabs defaultValue="filters" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="filters" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filters
              </TabsTrigger>
              <TabsTrigger value="sort" className="flex items-center gap-1">
                <Sliders className="h-4 w-4" />
                Sort
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </h3>
                <Slider
                  defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    handleFilterChange({ priceRange: [value[0], value[1]] })
                  }
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration
                </h3>
                <Select
                  defaultValue={filters.duration}
                  onValueChange={(value) =>
                    handleFilterChange({ duration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Parking Type
                </h3>
                <Select
                  defaultValue={filters.parkingType}
                  onValueChange={(value) =>
                    handleFilterChange({ parkingType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parking type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="street">Street Parking</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="lot">Parking Lot</SelectItem>
                    <SelectItem value="private">Private Driveway</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <ParkingSquare className="h-4 w-4" />
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="covered"
                      checked={filters.amenities.includes("covered")}
                      onCheckedChange={() => handleAmenityToggle("covered")}
                    />
                    <label htmlFor="covered" className="text-sm">
                      Covered
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="security"
                      checked={filters.amenities.includes("security")}
                      onCheckedChange={() => handleAmenityToggle("security")}
                    />
                    <label htmlFor="security" className="text-sm">
                      Security
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ev-charging"
                      checked={filters.amenities.includes("ev-charging")}
                      onCheckedChange={() => handleAmenityToggle("ev-charging")}
                    />
                    <label htmlFor="ev-charging" className="text-sm">
                      EV Charging
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="handicap"
                      checked={filters.amenities.includes("handicap")}
                      onCheckedChange={() => handleAmenityToggle("handicap")}
                    />
                    <label htmlFor="handicap" className="text-sm">
                      Handicap
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sort" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sort By</h3>
                <Select defaultValue="distance">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onFilterChange(filters)}>
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MapControls;
