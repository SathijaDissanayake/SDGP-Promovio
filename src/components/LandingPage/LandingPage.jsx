import React from "react";
import BodyPart1 from "./BodyPart1";
import BodyPart2 from "./BodyPart2";
import FeatureSection from "./FeatureSection";
import AboutUs from "./AboutUs";

export default function LandingPage() {
    return (
        <div>
            <BodyPart1 />
            <BodyPart2 />
            <FeatureSection id="features" />
            <AboutUs />
            
        </div>
    );
}
