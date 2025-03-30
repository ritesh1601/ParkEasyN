import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Calendar,
  DollarSign,
} from "lucide-react";

interface EarningsTrackerProps {
  earnings?: {
    total: number;
    monthly: number;
    weekly: number;
    daily: number;
  };
  bookingStats?: {
    total: number;
    completed: number;
    upcoming: number;
    cancelled: number;
  };
  revenueData?: {
    monthly: Array<{ month: string; amount: number }>;
    weekly: Array<{ week: string; amount: number }>;
  };
  popularSpots?: Array<{
    id: string;
    name: string;
    revenue: number;
    bookings: number;
  }>;
}

const EarningsTracker = ({
  earnings = {
    total: 12580,
    monthly: 2450,
    weekly: 680,
    daily: 120,
  },
  bookingStats = {
    total: 156,
    completed: 132,
    upcoming: 18,
    cancelled: 6,
  },
  revenueData = {
    monthly: [
      { month: "Jan", amount: 1200 },
      { month: "Feb", amount: 1800 },
      { month: "Mar", amount: 2200 },
      { month: "Apr", amount: 1900 },
      { month: "May", amount: 2450 },
      { month: "Jun", amount: 2100 },
    ],
    weekly: [
      { week: "Week 1", amount: 580 },
      { week: "Week 2", amount: 620 },
      { week: "Week 3", amount: 680 },
      { week: "Week 4", amount: 570 },
    ],
  },
  popularSpots = [
    { id: "1", name: "Downtown Garage A", revenue: 4200, bookings: 48 },
    { id: "2", name: "City Center Lot", revenue: 3650, bookings: 42 },
    { id: "3", name: "Riverside Parking", revenue: 2800, bookings: 36 },
    { id: "4", name: "Mall Parking Deck", revenue: 1930, bookings: 30 },
  ],
}: EarningsTrackerProps) => {
  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Earnings Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Select defaultValue="sixMonths">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="threeMonths">Last 3 Months</SelectItem>
                <SelectItem value="sixMonths">Last 6 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Earnings
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${earnings.total.toLocaleString()}
                  </h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Earnings
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${earnings.monthly.toLocaleString()}
                  </h3>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Weekly Earnings
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${earnings.weekly.toLocaleString()}
                  </h3>
                </div>
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                  <h3 className="text-2xl font-bold">
                    ${earnings.daily.toLocaleString()}
                  </h3>
                </div>
                <div className="p-2 bg-yellow-500/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="chart">
                    <BarChart className="h-4 w-4 mr-2" /> Bar Chart
                  </TabsTrigger>
                  <TabsTrigger value="line">
                    <LineChart className="h-4 w-4 mr-2" /> Line Chart
                  </TabsTrigger>
                  <TabsTrigger value="pie">
                    <PieChart className="h-4 w-4 mr-2" /> Distribution
                  </TabsTrigger>
                </TabsList>

                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${timeRange === "weekly" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                    onClick={() => setTimeRange("weekly")}
                  >
                    Weekly
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${timeRange === "monthly" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                    onClick={() => setTimeRange("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <TabsContent value="chart" className="space-y-4">
                <div className="h-[300px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                  {/* Placeholder for actual chart implementation */}
                  <div className="flex flex-col items-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Bar Chart Visualization
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Showing {timeRange} revenue data
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Revenue by Spot Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Garage Spots</span>
                          </div>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Street Parking</span>
                          </div>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <span className="text-sm">Lot Parking</span>
                          </div>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">Private Spots</span>
                          </div>
                          <span className="text-sm font-medium">12%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Booking Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                          <span className="text-2xl font-bold">
                            {bookingStats.total}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Total Bookings
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-green-500/10 rounded-lg">
                          <span className="text-2xl font-bold text-green-600">
                            {bookingStats.completed}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Completed
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-blue-500/10 rounded-lg">
                          <span className="text-2xl font-bold text-blue-600">
                            {bookingStats.upcoming}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Upcoming
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-red-500/10 rounded-lg">
                          <span className="text-2xl font-bold text-red-600">
                            {bookingStats.cancelled}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Cancelled
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="line">
                <div className="h-[300px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                  {/* Placeholder for actual line chart implementation */}
                  <div className="flex flex-col items-center">
                    <LineChart className="h-16 w-16 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Line Chart Visualization
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Showing {timeRange} revenue trends
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pie">
                <div className="h-[300px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                  {/* Placeholder for actual pie chart implementation */}
                  <div className="flex flex-col items-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Pie Chart Visualization
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Showing revenue distribution by spot type
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Top Performing Spots */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Parking Spots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{spot.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {spot.bookings} bookings
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${spot.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${(spot.revenue / spot.bookings).toFixed(2)} per booking
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarningsTracker;
