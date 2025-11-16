import { useState } from "react";
import { QrCode } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GenerateQrDialog from "@/components/qr/generate-qr-dialog";
import QrTable from "@/components/qr/qr-table";
import { useQuery } from "@tanstack/react-query";
import { getQrStats } from "@/services/api.service";

export default function QRManager() {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["qrStats"],
    queryFn: getQrStats,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });


  return (
    <div className="space-y-4 p-2 sm:p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">QR Code Manager</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Generate, assign, and track QR codes for plastic products
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button> */}
          <GenerateQrDialog
            isGenerateOpen={isGenerateOpen}
            setIsGenerateOpen={setIsGenerateOpen}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total QR Codes
            </CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Badge variant="secondary" className="text-xs">
              Ready
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.Available || 0}
            </div>
            <p className="text-xs text-muted-foreground">Unassigned codes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scanned</CardTitle>
            <Badge className="text-xs">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.Scanned || 0}
            </div>
            <p className="text-xs text-muted-foreground">In circulation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycled</CardTitle>
            <Badge variant="default" className="text-xs bg-success">
              Complete
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.Verified || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-Responsive Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">
                QR Code Inventory
              </CardTitle>
              <CardDescription>
                Manage and track all generated QR codes
              </CardDescription>
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="w-4 h-4" />
              </Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="block">
            <QrTable />
          </div>

          {/* Mobile Cards 
          <div className="lg:hidden space-y-3 p-4">
            {filteredData.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedCodes.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectCode(item.id, checked as boolean)
                      }
                    />
                    <div>
                      <div className="font-medium text-sm">{item.code}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.productType}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download QR</DropdownMenuItem>
                      <DropdownMenuItem>Assign User</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <span>{item.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      className={
                        statusColors[item.status as keyof typeof statusColors]
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned:</span>
                    <span>{item.assignedTo || "Unassigned"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{item.createdAt}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>*/}
        </CardContent>
      </Card>
    </div>
  );
}
