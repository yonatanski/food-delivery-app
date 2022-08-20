import React from "react"
import { UilFacebook, UilGithub, UilInstagram } from "@iconscout/react-unicons"
import Logo from "../assets/Logo.png"
import css from "../styles/Footer.module.css"
import Image from "next/image"

const Footer = () => {
  return (
    <div className={css.container} id="contact">
      <span>ALL RIGHT RESERVED!</span>
      <div className={css.socail}>
        <UilFacebook size={45} />
        <UilGithub size={45} />
        <UilInstagram size={45} />
      </div>
      <div className={css.logo}>
        <Image src={Logo} alt="logo of the navigation bar" width={50} height={50} />
        <span>Foodie</span>
      </div>
    </div>
  )
}
export default Footer
