import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { useActiveAccount } from "thirdweb/react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/api.service";
import { CHAIN_ID } from "@/constants";
import useRole from "@/hooks/use-role";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(
    [
      "ADMIN_ROLE",
      "MANUFACTURER_ROLE",
      "RECYCLER_ROLE",
      "RAGPICKER_ROLE",
      "CITIZEN_ROLE",
    ],
    {
      required_error: "Please select a role",
    }
  ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const activeAccount = useActiveAccount();
  const { data } = useRole();
  const navigate = useNavigate();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess(data) {
      console.log("Registration successful:", data);

      activeAccount
        .sendTransaction(data.transaction)
        // .sendTransaction({
        //   ...data.transaction,
        //   chainId: CHAIN_ID,
        //   gas: BigInt(data.transaction.gas || 100000), // Set reasonable gas limit
        //   gasPrice: undefined,
        // })
        .then((d) => {
          navigate("/dashboard", { replace: true });
          toast({
            title: "Registration Successful",
            description: "Your account has been created successfully!",
            variant: "default",
          });
        })
        .catch((e) => {
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
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const message = `Register role: ${data.role}`;

    const signature = await activeAccount.signMessage({
      message,
      chainId: CHAIN_ID,
    });

    if (signature) {
      mutate({
        role: data.role,
        wallet: activeAccount.address || "",
        name: data.name,
        email: data.email,
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
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255)_1px,transparent_0)] [background-size:50px_50px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex flex-row-reverse items-center justify-between">
            <WalletConnectButton />

            {data?.user?.role ? (
              <p className="text-white/70 text-sm underline underline-offset-2">
                <Link to={"/dashboard"}>Dashboard</Link>
              </p>
            ) : null}

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">PlasticTrace</h1>
                <p className="text-xs text-white/60">Sustainable Future</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">
                  Join PlasticTrace
                </CardTitle>
                <CardDescription className="text-white/70">
                  Create your account and start making a difference in plastic
                  waste management
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    {/* Role Field */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Select Your Role
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              {/* <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="MANUFACTURER_ROLE"
                                  id="MANUFACTURER_ROLE"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="MANUFACTURER_ROLE"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    Manufacturer
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    {" "}
                                    Track products from creation to disposal
                                    lifecycle
                                  </p>
                                </div>
                              </div> */}

                              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="RAGPICKER_ROLE"
                                  id="RAGPICKER_ROLE"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="RAGPICKER_ROLE"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    RagPicker
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    Scan waste items and earn instant blockchain
                                    rewards
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="RECYCLER_ROLE"
                                  id="RECYCLER_ROLE"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="RECYCLER_ROLE"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    Recycler
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    Verify and process collected waste materials
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="CITIZEN_ROLE"
                                  id="CITIZEN_ROLE"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="CITIZEN_ROLE"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    Citizen
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    View Leaderboard
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div>
                      {!activeAccount?.address && (
                        <p className="text-sm text-center text-red-600 mb-1">
                          Please connect your wallet
                        </p>
                      )}
                      {data?.user?.role && (
                        <p className="text-sm text-center text-red-600 mb-1">
                          Already registered with role: {data.user.role}
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={
                          activeAccount?.address
                            ? data?.user?.role
                              ? true
                              : isPending
                            : true
                        }
                        className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 font-medium"
                      >
                        {isPending ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-white/60 text-sm">
                    Back to{" "}
                    <Link
                      to="/"
                      className="text-white hover:text-white/80 font-medium underline underline-offset-4"
                    >
                      Home
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center">
          <p className="text-white/50 text-xs">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
