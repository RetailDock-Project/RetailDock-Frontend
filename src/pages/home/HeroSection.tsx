import { Button } from "../../components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Complete Retail
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                {" "}
                Business{" "}
              </span>
              Management
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Streamline your retail operations with our comprehensive platform.
              From inventory management to point-of-sale, analytics, and team
              collaboration – everything you need in one powerful solution.
            </p>

            {/* Key Benefits */}
            <div className="mt-8 space-y-4">
              {[
                "Real-time inventory tracking across all locations",
                "Advanced analytics and reporting for all user roles",
                "Seamless POS integration with payment processing",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 group hover:pl-1 transition-all duration-200"
                >
                  <CheckCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 10,000+ retail businesses worldwide
              </p>
              <div className="flex items-center space-x-8">
                {[
                  { label: "Active Stores", value: "10K+" },
                  { label: "Uptime", value: "99.9%" },
                  { label: "Support", value: "24/7" },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-foreground group-hover:text-primary">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl rotate-1 blur-sm"></div>

              {/* Main Image Placeholder */}
              <div className="relative bg-white rounded-2xl shadow-elegant p-4 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-500">
                {/* Uncomment if you have image */}
                {/* <img src={heroDashboard} alt="RetailDock Dashboard" className="w-full h-auto rounded-lg shadow-md" /> */}

                {/* Floating Highlights */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse hover:scale-105 transition-transform">
                  Live Updates
                </div>

                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform">
                  AI Analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Bubbles */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 pointer-events-none">
        <div className="w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 pointer-events-none">
        <div className="w-72 h-72 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
