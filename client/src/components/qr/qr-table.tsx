import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllQrCodes } from "@/services/api.service";
import { CustomPagination } from "@/components/ui/pagination";
import { Skeleton } from "../ui/skeleton";
import { QrDetailDialog } from "./qr-detail-dialog";
import useRole from "@/hooks/use-role";
import { ROLES } from "@/constants";

const statusColors = {
  Available: "bg-muted text-muted-foreground",
  Assigned: "bg-secondary text-secondary-foreground",
  Scanned: "bg-primary text-primary-foreground",
  Verified: "bg-success text-success-foreground",
  Recycled: "bg-destructive text-destructive-foreground",
};

const limit = 10; // items per page
const QrTable = () => {
  const [page, setPage] = useState(1);
  const { data: userRoleData } = useRole();
  const [selectedQr, setSelectedQr] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "qrCodes",
      {
        page,
        limit,
        status: userRoleData?.user?.role == ROLES.RECYCLER ? "Scanned" : null,
      },
    ],
    queryFn: getAllQrCodes,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>QR Code</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Assigned To</TableHead> */}
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.docs.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">QR-2025-{item.qrId}</TableCell>
              <TableCell>
                <Badge
                  className={
                    statusColors[item.status as keyof typeof statusColors]
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              {/* <TableCell>{item.manufacturer}</TableCell> */}
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedQr(item);
                        setIsDetailOpen(true);
                      }}
                    >
                      View Details
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Download QR</DropdownMenuItem> */}
                    {/* <DropdownMenuItem>Assign To Manufacturer</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {data?.data?.docs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No QR codes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <QrDetailDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        qrData={selectedQr}
      />

      {!isLoading && (
        <CustomPagination
          currentPage={page}
          totalPages={data?.pagination?.totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default QrTable;
