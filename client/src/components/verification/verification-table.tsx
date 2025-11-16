import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Package } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  getAllQrCodes,
  rewardDistributor,
  verifyQrScan,
} from "@/services/api.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomPagination } from "../ui/pagination";
import { CHAIN_ID } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { rewardDistributorContract } from "@/config/thirdweb.config";

const statusColors = {
  Available: "bg-muted text-muted-foreground",
  Assigned: "bg-secondary text-secondary-foreground",
  Scanned: "bg-primary text-primary-foreground",
  Verified: "bg-success text-success-foreground",
  Recycled: "bg-destructive text-destructive-foreground",
};

const VerificationTable = () => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Scanned");

  const { mutate: sendTx, isPending: isRewardPending } = useSendTransaction();

  const { data, isLoading } = useQuery({
    queryKey: [
      "qrCodes",
      {
        page,
        limit: 10,
        status: activeTab,
      },
    ],
    queryFn: getAllQrCodes,
  });

  const activeAccount = useActiveAccount();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: verifyMutate, isPending: isVerifyPending } = useMutation({
    mutationFn: verifyQrScan,
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
          console.log("Transaction sent:", d);
          queryClient.invalidateQueries({ queryKey: ["qrCodes"] });
          toast({
            title: "Verification Successfull",
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
        });
    },
    onError(err) {
      toast({
        title: "Transaction Failed",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onVerifyBtnClick = async (qrId) => {
    const message = `Verify QR: ${qrId}`;
    const signature = await activeAccount.signMessage({
      message,
      chainId: CHAIN_ID,
    });
    if (signature) {
      verifyMutate({
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
    }
  };

  const { mutate: rewardMutate } = useMutation({
    mutationFn: rewardDistributor,
  });

  const onRewardBtnClick = async (qrId) => {
    const tx = await prepareContractCall({
      contract: rewardDistributorContract,
      method: "function distributeRewards(uint256 qrId)",
      params: [qrId],
    });

    sendTx(tx);

    rewardMutate({ qrId });
    // const message = `Distribute rewards for QR: ${qrId}`;
    // const signature = await activeAccount.signMessage({
    //   message,
    //   chainId: CHAIN_ID,
    // });
    // if (signature) {
    //   rewardMutate({
    //     qrId,
    //     wallet: activeAccount.address || "",
    //     signature,
    //   });
    // } else {
    //   toast({
    //     title: "Error",
    //     description: "Failed to sign the message. Please try again.",
    //     variant: "destructive",
    //   });
    // }
  };

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
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Scanned">Pending </TabsTrigger>
        <TabsTrigger value="Verified">Verified </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QR Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scanned By</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.docs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No items found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.docs?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      QR-2025-{item.qrId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[item.status as keyof typeof statusColors]
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.ragPicker}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item.status == "Scanned" ? (
                        <Button
                          size="sm"
                          disabled={isVerifyPending}
                          onClick={() => onVerifyBtnClick(item.qrId)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Verify
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={isRewardPending}
                          onClick={() => onRewardBtnClick(item.qrId)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Transfer Reward
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && (
          <CustomPagination
            currentPage={page}
            totalPages={data?.pagination?.totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default VerificationTable;
