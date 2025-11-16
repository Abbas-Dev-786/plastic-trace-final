import { Camera, Zap, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QrScanner from "@/components/qr/qr-scanner";
import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/services/api.service";
import { Skeleton } from "@/components/ui/skeleton";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { ecoRewardTokenContract } from "@/config/thirdweb.config";
import { toTokens } from "thirdweb";

export default function ScannerPage() {
  const activeAccount = useActiveAccount();

  const { data: tokenData, isPending } = useReadContract({
    contract: ecoRewardTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [activeAccount?.address],
    queryOptions: {
      enabled: Boolean(activeAccount?.address),
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["user-stats", activeAccount?.address],
    queryFn: getUserStats,
    select: (data) => data.data,
    enabled: Boolean(activeAccount?.address),
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto p-4">
      {/* Page Header */}
      <div className="text-center space-y-2 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">QR Scanner</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Scan plastic waste QR codes to earn rewards
        </p>
      </div>

      {/* Scanner Section */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Camera className="w-6 h-6" />
            Start Scanning
          </CardTitle>
          <CardDescription>
            Point your camera at a QR code on plastic waste items
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <QrScanner />

          {/* <Button 
            size="lg" 
            onClick={handleScan}
            className="w-full sm:w-auto rounded-button h-12 sm:h-14 text-base sm:text-lg"
            disabled={isCameraOpen}
          >
            {isCameraOpen ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Camera className="w-6 h-6 mr-2" />
                Scan QR Code
              </>
            )}
          </Button> */}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Earned</CardTitle>
            <Zap className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            {isPending ? (
              <Skeleton></Skeleton>
            ) : (
              <div className="text-2xl font-bold">
                {toTokens(tokenData, 18)} PTC
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Scan History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Your latest scanning activity</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton></Skeleton>
          ) : (
            <div className="space-y-4">
              {data?.map((scan) => (
                <div
                  key={scan.qrId}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <div>
                      <p className="font-medium">QR-2025-{scan.qrId}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          scan.status === "Verified" ? "default" : "secondary"
                        }
                      >
                        {scan.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(scan.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
