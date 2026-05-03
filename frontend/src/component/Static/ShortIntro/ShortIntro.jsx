import React from 'react'
import "./ShortIntro.css";
import ImageHos from '../../../assets/images/hospital/hos.jpg'

const ShortIntro = () => {
  return (
    <>
      <div className="intro-container">
        <div className="row">
          <div className="col-md-6 img-container">
            <img src={ImageHos} alt="hosimage" className="hos-image" />
          </div>
          <div className="col-md-5 info-container">
            <h1>MEITRA HOSPITAL</h1>
            <h6>A Super Speciality Hospital</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae iste, dignissimos assumenda quia omnis quod fuga doloremque, 
                itaque repellat quos placeat, facilis officiis! Facere accusamus officiis velit, quibusdam natus debitis?</p>

                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae iste, dignissimos assumenda quia omnis quod fuga doloremque, 
                itaque repellat quos placeat, facilis officiis! Facere accusamus officiis velit, quibusdam natus debitis?</p>
                <button className="btn btn-primary">Book A Appointment Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShortIntro