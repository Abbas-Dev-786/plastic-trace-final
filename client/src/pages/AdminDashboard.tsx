import {
  Recycle,
  Users,
  QrCode,
  Leaf,
  TrendingUp,
  Plus,
  Download,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const kpiData = [
  {
    title: "Total QR Codes",
    value: "12,483",
    change: "+12.5%",
    trend: "up",
    icon: QrCode,
    color: "text-primary",
  },
  {
    title: "Items Recycled",
    value: "8,749",
    change: "+8.2%",
    trend: "up",
    icon: Recycle,
    color: "text-success",
  },
  {
    title: "Active Users",
    value: "1,523",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "text-secondary",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "QR_SCANNED",
    user: "Alice Cooper",
    item: "Plastic Bottle #QR12345",
    time: "2 minutes ago",
    status: "verified",
  },
  {
    id: 2,
    type: "REWARD_EARNED",
    user: "Bob Wilson",
    item: "10 PTC Tokens",
    time: "5 minutes ago",
    status: "completed",
  },
  {
    id: 3,
    type: "ITEM_RECYCLED",
    user: "EcoRecycling Co.",
    item: "Food Container #QR67890",
    time: "12 minutes ago",
    status: "processing",
  },
  {
    id: 4,
    type: "QR_GENERATED",
    user: "System",
    item: "Batch #B001 (100 codes)",
    time: "1 hour ago",
    status: "completed",
  },
];

const milestones = [
  {
    title: "Daily Recycling Target",
    current: 847,
    target: 1000,
    color: "bg-primary",
  },
  {
    title: "Monthly User Growth",
    current: 1523,
    target: 2000,
    color: "bg-accent",
  },
  {
    title: "CO₂ Reduction Goal",
    current: 245,
    target: 300,
    color: "bg-success",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor and manage the plastic waste tracking system
          </p>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" variant="outline" className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Generate QRs
          </Button>
        </div> */}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {/* <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success">{kpi.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      {/* <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recycling Activity</CardTitle>
            <CardDescription>
              Daily plastic waste collection over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 sm:h-80 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2" />
                <p>Chart visualization would go here</p>
                <p className="text-sm">(Integration with recharts/chart.js)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Tracking</CardTitle>
            <CardDescription>Current milestone progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{milestone.title}</span>
                  <span className="text-muted-foreground">
                    {milestone.current}/{milestone.target}
                  </span>
                </div>
                <Progress
                  value={(milestone.current / milestone.target) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system events and user actions
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.item}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      activity.status === "completed" ? "default" : "secondary"
                    }
                    className="mb-1"
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
