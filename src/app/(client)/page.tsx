import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CustomerReviewSection from "@/components/CustomerReviewSection";
import HeroSection from "@/components/HeroSection";

function HomePage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-white">
            <HeroSection />
            <AboutSection />
            <CustomerReviewSection />
            <ContactSection />
        </div>
    );
}

export default HomePage;
