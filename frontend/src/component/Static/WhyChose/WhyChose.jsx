import React from "react";
import "./WhyChose.css";

import Image1 from "../../../assets/images/hospital/personalize.png";
import Image2 from "../../../assets/images/hospital/trust.png";
import Image3 from "../../../assets/images/hospital/empower.png";

const WhyChose = () => {
  return (
    <>
      <h1 className="text-center mt-5">Why Choose Us?</h1>

      <div className="row why-container">
        <div className="col-md-3">
          <img src={Image1} alt="personalize" width="150px" />
          <h2>Personalized Excellence</h2>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>

        <div className="col-md-3">
          <img src={Image2} alt="trusted" width="150px" />
          <h2>Trusted Care</h2>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>

        <div className="col-md-3">
          <img src={Image3} alt="empower" width="150px" />
          <h2>Empowering Wellness Journey</h2>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    </>
  );
};

export default WhyChose;

