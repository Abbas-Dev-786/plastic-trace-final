import { useState } from "react";
import {
  ArrowRight,
  Leaf,
  Shield,
  Coins,
  Globe,
  Users,
  Recycle,
  Play,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { NavLink, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-ocean-cleanup.jpg";
import useRole from "@/hooks/use-role";

type UserRole =
  | "admin"
  | "manufacturer"
  | "rag-picker"
  | "recycler"
  | "citizen";

const roles = [
  {
    title: "Admin",
    value: "admin",
    description: "Manage the entire ecosystem with comprehensive controls",
    icon: Shield,
  },
  // {
  //   title: "Manufacturer",
  //   value: "manufacturer",
  //   description: "Track products from creation to disposal lifecycle",
  //   icon: Globe,
  // },
  {
    title: "Rag Picker",
    value: "rag-picker",
    description: "Scan waste items and earn instant blockchain rewards",
    icon: Users,
  },
  {
    title: "Recycler",
    value: "recycler",
    description: "Verify and process collected waste materials",
    icon: Recycle,
  },
  {
    title: "Citizen",
    value: "citizen",
    description: "Participate actively in the circular economy",
    icon: Leaf,
  },
];

export default function LandingPage() {
  const { data } = useRole();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    // In a real app, this would set the user role in context/auth
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
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

      {/* Glass Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
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
            </div>

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
              <NavLink
                to="/qrs"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                Qr Collection
              </NavLink>
              {data?.user?.role ? (
                <NavLink
                  to="/dashboard"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  Register
                </NavLink>
              )}
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
                {data?.user?.role ? (
                  <NavLink
                    to="/dashboard"
                    className="text-white/80 hover:text-white transition-colors text-base font-medium py-2"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/register"
                    className="text-white/80 hover:text-white transition-colors text-base font-medium py-2"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Now Live on Flow Testnet
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
                  Transform
                  <span className="block bg-gradient-to-r from-blue-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
                    Waste to Wealth
                  </span>
                </h2>

                <p className="text-xl sm:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                  Revolutionary blockchain ecosystem that rewards sustainable
                  actions. Scan, track, earn — every piece of plastic becomes a
                  step toward environmental restoration.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0 h-14 px-8 text-lg font-semibold rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                  onClick={() => setShowRoleSelection(true)}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Start Your Journey
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                    2.5M+
                  </div>
                  <div className="text-sm text-white/60 mt-1">
                    Items Recycled
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent mx-auto mt-2" />
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                    15K+
                  </div>
                  <div className="text-sm text-white/60 mt-1">Active Users</div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent mx-auto mt-2" />
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                    850T
                  </div>
                  <div className="text-sm text-white/60 mt-1">CO₂ Saved</div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent mx-auto mt-2" />
                </div>
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full backdrop-blur-sm animate-float" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full backdrop-blur-sm animate-float-delayed" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                  <img
                    src={heroImage}
                    alt="Ocean cleanup efforts"
                    className="w-full h-80 lg:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Overlay card */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                            <Recycle className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold">Live Impact</div>
                            <div className="text-sm text-white/70">
                              Real-time tracking
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">+125</div>
                          <div className="text-xs text-white/70">Today</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
              <Coins className="w-4 h-4" />
              Revolutionary Features
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Transform Waste with
              <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                Blockchain Technology
              </span>
            </h3>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Experience the future of recycling with our cutting-edge features
              designed to reward sustainable actions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Recycle,
                title: "Smart QR Tracking",
                description:
                  "Every plastic item gets a unique QR code for complete lifecycle tracking from production to recycling.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Coins,
                title: "Instant Crypto Rewards",
                description:
                  "Earn tokens immediately when you scan and recycle items. Your environmental impact has real value.",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Shield,
                title: "Transparent Verification",
                description:
                  "Blockchain ensures every transaction is verified, transparent, and immutable for complete trust.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Globe,
                title: "Global Impact Network",
                description:
                  "Join a worldwide community of eco-warriors making measurable environmental change together.",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: Users,
                title: "Community Rewards",
                description:
                  "Participate in challenges, competitions, and collaborative goals with increasing rewards.",
                gradient: "from-indigo-500 to-blue-500",
              },
              {
                icon: Leaf,
                title: "Carbon Credit System",
                description:
                  "Convert your recycling actions into verified carbon credits that can be traded or held.",
                gradient: "from-teal-500 to-green-500",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="group relative bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 p-8 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-0 space-y-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
              <Play className="w-4 h-4" />
              Simple Process
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              How PlasticTrace
              <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                Actually Works
              </span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Scan & Identify",
                description:
                  "Use our mobile app to scan QR codes on plastic items or generate new ones for untracked waste.",
                icon: "📱",
              },
              {
                step: "02",
                title: "Verify & Track",
                description:
                  "Our blockchain network verifies the item's authenticity and tracks its complete recycling journey.",
                icon: "🔗",
              },
              {
                step: "03",
                title: "Earn & Impact",
                description:
                  "Receive instant cryptocurrency rewards while contributing to verified environmental impact metrics.",
                icon: "💚",
              },
            ].map((step, index) => (
              <div key={step.step} className="relative text-center group">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-green-400 opacity-30 transform -translate-x-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Real Impact,
              <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                Real Results
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2.5M+", label: "Plastic Items Recycled", icon: "♻️" },
              { value: "850T", label: "CO₂ Emissions Saved", icon: "🌍" },
              { value: "15K+", label: "Active Community Members", icon: "👥" },
              { value: "₹25L+", label: "Rewards Distributed", icon: "💰" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:scale-110 transition-transform mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm sm:text-base">
                  {stat.label}
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
              <Users className="w-4 h-4" />
              Join Our Ecosystem
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Find Your
              <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                Perfect Role
              </span>
            </h3>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Every role contributes to our mission. Choose your path and start
              earning rewards while building a sustainable future.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <Card
                key={role.title}
                className="group relative bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2 p-6 sm:p-8 overflow-hidden"
                onClick={() => handleRoleSelect(role.value as UserRole)}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative text-center p-0 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                      {role.title}
                    </h4>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <p className="text-white/70 group-hover:text-white/90 transition-colors leading-relaxed text-sm">
                    {role.description}
                  </p>

                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm text-green-400 font-medium">
                      Get Started
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
              <Info className="w-4 h-4" />
              Common Questions
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked
              <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                Questions
              </span>
            </h3>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How do I earn rewards through PlasticTrace?",
                a: "Simply scan QR codes on plastic items using our mobile app. Each verified scan earns you cryptocurrency tokens instantly. The more you recycle, the more you earn!",
              },
              {
                q: "Is my environmental impact really tracked?",
                a: "Yes! Every action is recorded on the blockchain, creating an immutable record of your environmental contributions. You can view your complete impact history anytime.",
              },
              {
                q: "What types of plastic can I track?",
                a: "All types of plastic waste can be tracked - from bottles and bags to packaging materials. If it doesn't have a QR code, you can generate one through our app.",
              },
              {
                q: "How secure are my earnings?",
                a: "Your rewards are stored securely on the blockchain using industry-standard cryptographic protocols. Only you have access to your wallet and earnings.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  {faq.q}
                </h4>
                <p className="text-white/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-900/50 backdrop-blur-sm" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform
            <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
              Your Impact?
            </span>
          </h3>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of eco-warriors who are already earning rewards while
            saving our planet. Your sustainable journey starts with a single
            scan.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0 h-16 px-12 text-xl font-semibold rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              onClick={() => setShowRoleSelection(true)}
            >
              <Play className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
              Start Earning Now
            </Button>

            <div className="flex items-center gap-4 text-white/60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full border-2 border-white/20"
                  />
                ))}
              </div>
              <span className="text-sm">Join 15,000+ users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
}
