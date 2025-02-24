import React from "react";
import Pricing from "./Pricing";
import BodyPart1 from "./BodyPart1";
import Footer from "./Footer";
import CheckoutPage from "./CheckoutPage";

export default function PricingPage() {
    return (
        <div>
            
            <BodyPart1 />
            <Pricing/>
            <CheckoutPage/>
            <Footer />
        </div>
    );
}
