import { getAllQrCodes } from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Leaf, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import QRCode from "react-qr-code";
import { CustomPagination } from "@/components/ui/pagination";
import { WalletConnectButton } from "@/components/WalletConnectButton";

const limit = 12;
const QrLib = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: [
      "qrCodes",
      {
        page,
        limit,
        status: "Available",
      },
    ],
    queryFn: getAllQrCodes,
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to={"/"} className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  PlasticTrace
                </h1>
                <p className="text-xs text-white/60">Sustainable Future</p>
              </div>
              <h1 className="sm:hidden text-lg font-bold text-white">
                PlasticTrace
              </h1>
            </Link>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#features"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#impact"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                Impact
              </a>
              <a
                href="#faq"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                FAQ
              </a>
            </nav>

            {/* Mobile Menu Button & Wallet */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              <div className="hidden sm:block">
                <WalletConnectButton />
              </div>

              {/* Compact wallet button for mobile */}
              <div className="sm:hidden">
                <WalletConnectButton />
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              mobileMenuOpen
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-white/80 hover:text-white transition-colors text-base font-medium py-2 border-b border-white/10"
                  onClick={closeMobileMenu}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-white/80 hover:text-white transition-colors text-base font-medium py-2 border-b border-white/10"
                  onClick={closeMobileMenu}
                >
                  How It Works
                </a>
                <a
                  href="#impact"
                  className="text-white/80 hover:text-white transition-colors text-base font-medium py-2 border-b border-white/10"
                  onClick={closeMobileMenu}
                >
                  Impact
                </a>
                <a
                  href="#faq"
                  className="text-white/80 hover:text-white transition-colors text-base font-medium py-2 border-b border-white/10"
                  onClick={closeMobileMenu}
                >
                  FAQ
                </a>
                <NavLink
                  to="/qrs"
                  className="text-white/80 hover:text-white transition-colors text-base font-medium py-2 border-b border-white/10"
                  onClick={closeMobileMenu}
                >
                  Qr Collection
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Background matching LandingPage */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10 mt-28">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent mb-4">
            QR Code Directory
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Browse all available QR codes for plastic waste tracking and
            recycling verification
          </p>
        </div>

        {/* QR Code Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.docs.map((qr) => (
            <Card
              key={qr.id}
              className="bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="py-4">
                <div className="flex items-center justify-center text-sm">
                  <QRCode
                    value={`QR-2025-${qr.qrId}`}
                    size={300}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data?.data?.docs.length === 0 && (
          <div className="text-center py-12">
            <QrCode className="h-12 w-12 text-white/60 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">
              No QR codes found
            </h3>
            <p className="text-white/70">Try adjusting your search terms</p>
          </div>
        )}

        {!isLoading && (
          <CustomPagination
            currentPage={page}
            totalPages={data?.pagination?.totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        )}
      </div>

      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">PlasticTrace</span>
          </div>
          <p className="text-white/60">
            © 2024 PlasticTrace. Building a sustainable future with blockchain
            technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QrLib;
