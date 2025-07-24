import HeroSection from "./HeroSection";
import HomeNavbar from "./HomeNavbar";

const HomeIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <HeroSection />
    </div>
  );
};

export default HomeIndex;
