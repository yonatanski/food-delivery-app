import React, { useEffect, useState } from "react"
import css from "../styles/Header.module.css"
import Logo from "../assets/Logo.png"
import Image from "next/image"
import { useStore } from "../store/store"
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons"
import Link from "next/link"

const Header = () => {
  const state = useStore((state) => state)
  // console.log("state", state)
  const [order, setOrder] = useState("")
  const itemLength = useStore((state) => state.cart.pizzas.length)

  useEffect(() => {
    setOrder(localStorage.getItem("order"))
  }, [])
  return (
    // <div className={css.fixed}>
    <div className={css.header}>
      {/* logo  */}
      <div className={css.logo}>
        <Image src={Logo} alt="logo of the navigation bar" width={50} height={50} />
        <span>Foodie</span>
      </div>
      {/* Menu  */}
      <ul className={css.menu}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <a href="#menu">
          <li>Menu</li>
        </a>
        <a href="#contact">
          <li>Contact</li>
        </a>
      </ul>
      {/* right side  */}
      <div className={css.rightSide}>
        <Link href="/Cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="black" />
            <div className={css.badge}>{itemLength}</div>
          </div>
        </Link>
        {order && (
          <Link href={`/order/${order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="black" />
              {order !== "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
    // </div>
  )
}

export default Header
