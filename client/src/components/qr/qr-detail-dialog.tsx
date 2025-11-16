import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";

const statusColors = {
  Available: "bg-muted text-muted-foreground",
  Assigned: "bg-secondary text-secondary-foreground",
  Scanned: "bg-primary text-primary-foreground",
  Verified: "bg-success text-success-foreground",
  Recycled: "bg-destructive text-destructive-foreground",
};

interface QrDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  qrData: {
    qrId: string;
    status: string;
    manufacturer?: string;
    createdAt: string;
  };
  //     location?: string;
  //     weight?: number;
  //     plasticType?: string;
  //     lastScannedAt?: string;
  //     transactions?: Array<{
  //       date: string;
  //       action: string;
  //       by: string;
  //     }>;
  //   } | null;
}

export function QrDetailDialog({
  isOpen,
  onClose,
  qrData,
}: QrDetailDialogProps) {
  if (!qrData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>QR Code Details</DialogTitle>
          <DialogDescription>
            Detailed information about QR-2025-{qrData.qrId}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <div className="col-span-3">
              <Badge
                className={
                  statusColors[qrData.status as keyof typeof statusColors]
                }
              >
                {qrData.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Created:</span>
            <span className="col-span-3">
              {new Date(qrData.createdAt).toLocaleString()}
            </span>
          </div>

          {qrData.manufacturer && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Manufacturer:</span>
              <span className="col-span-3">{qrData.manufacturer}</span>
            </div>
          )}

          <div>
            <span className="font-medium">QR Code:</span>
            <div className="flex justify-center">
              <QRCode
                value={`QR-2025-${qrData.qrId}`}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>

          {/* {qrData.location && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Location:</span>
              <span className="col-span-3">{qrData.location}</span>
            </div>
          )}

          {qrData.weight && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Weight:</span>
              <span className="col-span-3">{qrData.weight} kg</span>
            </div>
          )}

          {qrData.plasticType && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Plastic Type:</span>
              <span className="col-span-3">{qrData.plasticType}</span>
            </div>
          )}

          {qrData.lastScannedAt && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Last Scanned:</span>
              <span className="col-span-3">
                {new Date(qrData.lastScannedAt).toLocaleString()}
              </span>
            </div>
          )}

          {qrData.transactions && qrData.transactions.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              <span className="font-medium">Transaction History:</span>
              <div className="space-y-2">
                {qrData.transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm border-b py-2"
                  >
                    <span>{new Date(tx.date).toLocaleString()}</span>
                    <span>{tx.action}</span>
                    <span>{tx.by}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
