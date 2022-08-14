import React from "react"
import css from "../styles/Header.module.css"
import Logo from "../assets/Logo.png"
import Image from "next/image"
import { useStore } from "../store/store"
import { UilShoppingBag } from "@iconscout/react-unicons"
import Link from "next/link"

const Header = () => {
  const state = useStore((state) => state)
  // console.log("state", state)
  const itemLength = useStore((state) => state.cart.pizzas.length)
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
        <Link href="/Cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="black" />
            <div className={css.badge}>{itemLength}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
