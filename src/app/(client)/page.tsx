import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CustomerReviewSection from '@/components/CustomerReviewSection';
import FoodSection from '@/components/FoodSection';
import HeroSection from '@/components/HeroSection';

function HomePage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-white">
            <HeroSection />
            <AboutSection />
            <FoodSection />
            <CustomerReviewSection />
            <ContactSection />
        </div>
    );
}

export default HomePage;
