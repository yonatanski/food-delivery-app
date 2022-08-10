import React from "react"
import css from "../styles/Header.module.css"
import Logo from "../assets/Logo.png"
import Image from "next/image"
import { UilShoppingBag } from "@iconscout/react-unicons"

const Header = () => {
  return (
    <div className={css.header}>
      {/* logo  */}
      <div className={css.logo}>
        <Image src={Logo} alt="logo of the navigation bar" width={50} height={50} />
        <span>Foodie</span>
      </div>
      {/* Menu  */}
      <ul className={css.menu}>
        <li>Home</li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>
      {/* right side  */}
      <div className={css.rightSide}>
        <div className={css.cart}>
          <UilShoppingBag size={35} color="black" />
          <div className={css.badge}>0</div>
        </div>
      </div>
    </div>
  )
}

export default Header
