import React from "react";

import Slider from "../component/Slider/Slider";
import Facility from "../component/Static/Facility/Facility";
import ShortIntro from "../component/Static/ShortIntro/ShortIntro";

import WhyChose from "../component/Static/WhyChose/WhyChose";

import ContactMessage from "../component/Static/ContactMessage/ContactMessage";
import PatentReviews from "../component/Static/PatentReviews/PatentReviews";

const Home = () => {
  return (
    <>
      <Slider />
      <Facility />
      <ShortIntro />
      <WhyChose />
      <PatentReviews />
      <ContactMessage />
    </>
  );
};

export default Home;