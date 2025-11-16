import { CHAIN_ID } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { scanQr } from "@/services/api.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { useActiveAccount } from "thirdweb/react";

const QrScanner = () => {
  const [stop, setStop] = useState(false);
  const activeAccount = useActiveAccount();

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: scanQr,
    onSuccess(data) {
      console.log("Registration successful:", data);

      activeAccount
        .sendTransaction(data.transaction)
        // .sendTransaction({
        //   ...data.transaction,
        //   // chainId: CHAIN_ID,
        //   gas: BigInt(data.transaction.gas || 100000), // Set reasonable gas limit
        //   // gasPrice: undefined,
        // })
        .then((d) => {
          setStop(false);
          console.log("Transaction sent:", d);
          queryClient.invalidateQueries({ queryKey: ["user-stats"] });
          toast({
            title: "Qr Scanned Successfully",
            description: "Your transaction has been sent successfully.",
          });
        })
        .catch((e) => {
          console.log(e);
          console.error("Transaction failed:", e);
          toast({
            title: "Transaction Failed",
            description: e instanceof Error ? e.message : "An error occurred",
            variant: "destructive",
          });
        })
        .finally(() => {
          setStop(false);
        });
    },
    onError(err) {
      toast({
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
      setStop(false);
    },
  });

  const onScanHandler = async (err: any, result: any) => {
    // if (err) {
    //   toast({
    //     title: "Scan Error",
    //     description: err.message || "An error occurred while scanning",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    console.log("Scan Result:", result);

    if (result) {
      console.log("QR Code Result:", result.text);
      if (result.text.startsWith("QR-")) {
        setStop(true);
        const qrId = result.text.split("-").at(-1);

        const message = `Scan QR: ${qrId}`;
        const signature = await activeAccount.signMessage({
          message,
          chainId: CHAIN_ID,
        });
        if (signature) {
          mutate({
            qrId,
            wallet: activeAccount.address || "",
            signature,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to sign the message. Please try again.",
            variant: "destructive",
          });

          setStop(false);
        }
      } else {
        toast({
          title: "Invalid QR Code",
          description: "Please scan a valid QR code.",
          variant: "destructive",
        });
        return;
      }
    }
  };

  return (
    <div className="w-48 sm:w-64 h-48 sm:h-64 mx-auto bg-muted/20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <BarcodeScanner
          width={500}
          height={500}
          facingMode="environment"
          onUpdate={onScanHandler}
          stopStream={stop}
        />

        {isPending ? (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              Scanning and Processing...
            </p>
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              Scan a QR code to get started
            </p>
            <p className="text-xs text-muted-foreground">
              Ensure the QR code is clear and well-lit
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
