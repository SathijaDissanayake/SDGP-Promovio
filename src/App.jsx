import { useState } from 'react';
import { Route, Routes } from "react-router-dom"; // No need to import BrowserRouter here
import Header from "./components/LandingPage/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import PricingPage from "./components/PricingPage/PricingPage";
import CheckoutPage from "./components/PricingPage/CheckoutPage";
import FeatureSection from './components/LandingPage/FeatureSection';
import AboutUs from './components/LandingPage/AboutUs';
import ContentSchedulingPage from "./components/ContentScheduling/ContentSchedulingPage"; // Ensure this is correct
import CreateIdeaModal from "./components/ContentScheduling/CreateIdeaModal";
import './App.css';




function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header/>
      <Routes>
        {/* Landing and Pricing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/featureSection" element={<FeatureSection />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/content-scheduling" element={<ContentSchedulingPage />} /> 
        <Route path="/CreateIdeaModal" element={<CreateIdeaModal />} /> 
       
      </Routes>
    </>
  );
}

export default App;
