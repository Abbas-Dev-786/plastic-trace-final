import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import QRManager from "./pages/QRManager";
import Scanner from "./pages/Scanner";
import WalletDashboard from "./pages/WalletDashboard";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Verification from "./pages/Verification";
import QrLib from "./pages/QrLib";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/qrs" element={<QrLib />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/qr-manager" element={<QRManager />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/wallet" element={<WalletDashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
