import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CHAIN_ID } from "@/constants";
import { useActiveAccount } from "thirdweb/react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { generateQr } from "@/services/api.service";

const GenerateQrDialog = ({ isGenerateOpen, setIsGenerateOpen }: any) => {
  const activeAccount = useActiveAccount();
  const [count, setCount] = useState(1);

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: generateQr,
    onSuccess(data) {
      console.log("Registration successful:", data);

      setIsGenerateOpen(false);

      queryClient.invalidateQueries({ queryKey: ["qrCodes"] });
      queryClient.invalidateQueries({ queryKey: ["qrStats"] });

      toast({
        title: "QR Codes Generated",
        description: `Successfully generated ${count} QR codes.`,
        variant: "default",
      });
    },
    onError(err) {
      toast({
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async () => {
    if (!count || count < 0 || count > 100) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a quantity between 1 and 100.",
        variant: "destructive",
      });

      return;
    }

    const message = `Generate QR codes: ${count}`;

    const signature = await activeAccount.signMessage({
      message,
      chainId: CHAIN_ID,
    });

    if (signature) {
      mutate({
        amount: count,
        wallet: activeAccount.address || "",
        signature,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to sign the message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-button w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Generate QRs
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Generate QR Codes</DialogTitle>
          <DialogDescription>
            Create a new batch of QR codes for plastic products
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              placeholder="100"
              className="w-full"
              value={count}
              onChange={(e) => {
                setCount(Number(e.target.value));
              }}
            />
          </div>
          {/* <div className="grid gap-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecocorp">EcoCorp Ltd</SelectItem>
                      <SelectItem value="greenpack">GreenPack Inc</SelectItem>
                      <SelectItem value="aquaclean">AquaClean Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottle">Plastic Bottle</SelectItem>
                      <SelectItem value="container">Food Container</SelectItem>
                      <SelectItem value="bag">Shopping Bag</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setIsGenerateOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            className="w-full sm:w-auto"
            disabled={isPending}
          >
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateQrDialog;
