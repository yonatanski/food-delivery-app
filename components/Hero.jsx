import Image from "next/image"
import React from "react"
import Cherry from "../assets/Cherry.png"
import HeroImage from "../assets/HeroImage.png"
import { UilPhone } from "@iconscout/react-unicons"
import Pizzza1 from "../assets/p1.jpg"
import css from "../styles/Hero.module.css"

const Hero = () => {
  return (
    <div className={css.container}>
      {/* left side  */}
      <div className={css.leftSide}>
        <div className={css.cherryDiv}>
          <span>More than faster</span>
          <Image src={Cherry} alt=" logo of cherry" width={40} height={25} />
        </div>
        <div className={css.heroText}>
          <span>Be The Fastest </span>
          <span>In Delivering </span>
          <span>
            Your <span style={{ color: "var(--themeRed)" }}>Pizza</span>
          </span>
          <span className={css.miniText}>Our Mission is to filling your tummy with delicious food and with fast and free delivery</span>
          <button className={`btn ${css.btn}`}>Get Started</button>
        </div>
      </div>
      {/* right side  */}
      <div className={css.rightSide}>
        <div className={css.imgContainer}>
          <Image src={HeroImage} alt=" logo of hero " layout="intrinsic" />
        </div>

        <div className={css.ContactUs}>
          <span>Contact Us</span>
          <div>
            <UilPhone size={25} color="white" />
          </div>
        </div>
        <div className={css.Pizza}>
          <div>
            <Image src={Pizzza1} alt=" logo of hero " objectFit="cover" layout="intrinsic" width="" />
          </div>
          <div className={css.details}>
            <span>Italian Pizza</span>
            <span>
              <span style={{ color: "var(--themeRed)" }}>$</span> 10.00
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
