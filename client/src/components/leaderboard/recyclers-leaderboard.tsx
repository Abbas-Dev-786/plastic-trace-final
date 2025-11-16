import { Trophy, Medal, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getRecyclerLeaderboard } from "@/services/api.service";

const leaderboardData = [
  {
    count: "3",
    user: "0xdae87f8605f873d1e85d7575cdc253fd24842f25",
  },
  {
    count: "1",
    user: "0xdae87f8605f873d1e85d7575cdc253fd24842f25",
  },
  {
    count: "90",
    user: "0xdae87f8605f873d1e85d7575cdc253fd24842f25",
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-orange-500" />;
    default:
      return (
        <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">
          #{rank}
        </span>
      );
  }
};

const RecyclersLeaderboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getRecyclerLeaderboard,
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            {/* Rank Skeleton */}
            <div className="flex items-center justify-center w-12">
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>

            {/* User Info Skeleton */}
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-6 w-[200px]" />
            </div>

            {/* Stats Skeleton */}
            <div className="hidden lg:flex flex-col items-end gap-1">
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((entry, i) => (
        <div
          key={entry.user}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          {/* Rank */}
          <div className="flex items-center justify-center w-12">
            {getRankIcon(i + 1)}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 flex-1">
            <Link to={"#"}>
              <h4 className="font-semibold hover:underline cursor-pointer">
                {entry.user}
              </h4>
            </Link>
          </div>

          {/* Stats */}
          <div className="hidden lg:flex flex-col items-end text-sm">
            <span className="font-normal">
              {entry.count.toLocaleString()} items Verified and Recycled
            </span>
            {/* <span className="text-muted-foreground">
              {entry.stats.tokensEarned.toLocaleString()} PTC
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecyclersLeaderboard;
