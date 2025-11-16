import { useActiveAccount } from "thirdweb/react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/api.service";

const useRole = () => {
  const activeAccount = useActiveAccount();

  const { data, isLoading } = useQuery({
    queryKey: ["users", activeAccount?.address],
    queryFn: () => getUser(activeAccount?.address),
    enabled: !!activeAccount?.address,
  });

  // const { data: hasAnyRole, isLoading: isHasAnyRoleLoading } = useReadContract({
  //   contract: roleMangerContract,
  //   method: "function hasAnyRole(address) view returns (bool)",
  //   params: [
  //     activeAccount?.address || "0x0000000000000000000000000000000000000000",
  //   ],
  //   queryOptions: { enabled: !!activeAccount?.address },
  // });

  // const { data: isAdmin, isLoading: isAdminLoading } = useReadContract({
  //   contract: roleMangerContract,
  //   method:
  //     "function hasRole(bytes32 role, address account) view returns (bool)",
  //   params: [
  //     keccak256(toHex("ADMIN_ROLE")),
  //     activeAccount?.address || "0x0000000000000000000000000000000000000000",
  //   ],
  //   queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  // });

  // const { data: isManufacturer, isLoading: isManufacturerLoading } =
  //   useReadContract({
  //     contract: roleMangerContract,
  //     method:
  //       "function hasRole(bytes32 role, address account) view returns (bool)",
  //     params: [
  //       keccak256(toHex("MANUFACTURER_ROLE")),
  //       activeAccount?.address || "0x0000000000000000000000000000000000000000",
  //     ],
  //     queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  //   });

  // const { data: isRecycler, isLoading: isRecyclerLoading } = useReadContract({
  //   contract: roleMangerContract,
  //   method:
  //     "function hasRole(bytes32 role, address account) view returns (bool)",
  //   params: [
  //     keccak256(toHex("RECYCLER_ROLE")),
  //     activeAccount?.address || "0x0000000000000000000000000000000000000000",
  //   ],
  //   queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  // });

  // const { data: isRagPicker, isLoading: isRagPickerLoading } = useReadContract({
  //   contract: roleMangerContract,
  //   method:
  //     "function hasRole(bytes32 role, address account) view returns (bool)",
  //   params: [
  //     keccak256(toHex("RAGPICKER_ROLE")),
  //     activeAccount?.address || "0x0000000000000000000000000000000000000000",
  //   ],
  //   queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  // });

  // const { data: isCitizen, isLoading: isCitizenLoading } = useReadContract({
  //   contract: roleMangerContract,
  //   method:
  //     "function hasRole(bytes32 role, address account) view returns (bool)",
  //   params: [
  //     keccak256(toHex("CITIZEN_ROLE")),
  //     activeAccount?.address || "0x0000000000000000000000000000000000000000",
  //   ],
  //   queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  // });

  // useEffect(() => {
  //   if (isAdmin) {
  //     setRole("admin");
  //   } else if (isManufacturer) {
  //     setRole("manufacturer");
  //   } else if (isRecycler) {
  //     setRole("recycler");
  //   } else if (isRagPicker) {
  //     setRole("ragpicker");
  //   } else if (isCitizen) {
  //     setRole("citizen");
  //   } else {
  //     setRole("");
  //   }

  //   console.log("Role:", {
  //     role,
  //     isAdmin,
  //     isManufacturer,
  //     isRecycler,
  //     isRagPicker,
  //     isCitizen,
  //   });
  // }, [
  //   isAdminLoading,
  //   isManufacturerLoading,
  //   isRecyclerLoading,
  //   isRagPickerLoading,
  //   isCitizenLoading,
  // ]);

  return {
    data,
    isLoading,
  };
};

export default useRole;
