import { Wallet, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import {
  ecoNftContract,
  ecoRewardTokenContract,
} from "@/config/thirdweb.config";
import { toTokens } from "thirdweb";
import { Skeleton } from "@/components/ui/skeleton";

const nftCollection = [
  {
    id: 1,
    name: "Eco Warrior Bronze",
    description: "First scans milestone",
    image: "bronze-badge.png",
    rarity: "Common",
  },
  {
    id: 2,
    name: "Eco Warrior Silver",
    description: "First 3 scans milestone ",
    image: "ocean-badge.png",
    rarity: "Rare",
  },
  {
    id: 3,
    name: "Eco Warrior GOld",
    description: "5 scans milestone",
    image: "carbon-badge.png",
    rarity: "Epic",
  },
];

export default function WalletDashboard() {
  const activeAccount = useActiveAccount();
  const { data, isPending } = useReadContract({
    contract: ecoRewardTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [activeAccount?.address],
    queryOptions: {
      enabled: Boolean(activeAccount?.address),
    },
  });

  const { data: nftCount, isPending: isNftPending } = useReadContract({
    contract: ecoNftContract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [activeAccount?.address],
    queryOptions: {
      enabled: Boolean(activeAccount?.address),
    },
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Wallet Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your tokens, NFTs, and rewards
          </p>
        </div>
      </div>

      {/* Token Balance Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-white">
                PlasticTrace Tokens (PTC)
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Your environmental impact rewards
              </CardDescription>
            </div>
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-4xl font-bold text-white">
                {isPending ? <Skeleton></Skeleton> : toTokens(data, 18)} PTC
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievement NFTs</CardTitle>
          <CardDescription>
            Collectible badges representing your environmental achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isNftPending ? (
            <Skeleton></Skeleton>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({
                length: Number(nftCount || 0) > 3 ? 3 : Number(nftCount || 0),
              }).map((_, id) => (
                <Card
                  key={id}
                  className="hover:shadow-elegant transition-shadow"
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gradient-eco rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-lg">
                      {nftCollection?.[id]?.name}
                    </CardTitle>
                    <Badge variant="secondary">
                      {nftCollection?.[id]?.rarity}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      {nftCollection?.[id]?.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
