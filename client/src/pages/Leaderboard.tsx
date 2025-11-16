import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RagPickersLeaderboard from "@/components/leaderboard/rag-pickers-leaderboard";
import RecyclersLeaderboard from "@/components/leaderboard/recyclers-leaderboard";

const topRegions = [
  { name: "California", items: 345678, growth: 24.5 },
  { name: "Texas", items: 298432, growth: 18.3 },
  { name: "New York", items: 276543, growth: 21.7 },
  { name: "Florida", items: 234567, growth: 16.8 },
  { name: "Illinois", items: 198765, growth: 13.2 },
];

export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState("individuals");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Global Leaderboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Celebrating our top environmental contributors
          </p>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div> */}
      </div>

      {/* Impact Statistics */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {impactStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success">{stat.change}</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individuals">Top Pickers</TabsTrigger>
          <TabsTrigger value="regions">Top Recyclers</TabsTrigger>
        </TabsList>

        <TabsContent value="individuals" className="space-y-6">
          {/* Search Bar */}
          {/* <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contributors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>All-time top performers</CardDescription>
            </CardHeader>
            <CardContent>
              <RagPickersLeaderboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Recyclers</CardTitle>
              <CardDescription>
                Plastic waste Collection and verification Spots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecyclersLeaderboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
