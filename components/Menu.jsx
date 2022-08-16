import { Image } from "@mantine/core"
import React from "react"
import { urlFor } from "../lib/client"
import Link from "next/link"
import css from "../styles/Menu.module.css"

const Menu = ({ pizzas }) => {
  console.log(pizzas)
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>Our Menu</span>
        <span> Menu That Always</span>
        <span>Make You Fall In Love With</span>
      </div>

      {/* card  */}
      <div className={css.menu}>
        {pizzas.map((pizza, id) => {
          const src = urlFor(pizza.image[0].asset._ref).url()
          console.log(src)
          return (
            <div key={id} className={css.pizza} style={{}}>
              {pizza.status == 1 ? (
                <Link href={`/pizza/${pizza.slug.current}`}>
                  <div className={css.imageWrapper}>
                    <span>
                      <Image loader={() => src} src={src} alt={pizza.name} objectfit="cover" layout="fill" />
                    </span>
                  </div>
                </Link>
              ) : (
                <div className={css.imageWrapperStatusNo}>
                  <div></div>
                  <span>
                    <Image loader={() => src} src={src} alt={pizza.name} objectfit="cover" layout="fill" />
                  </span>
                </div>
              )}
              {pizza.status == 1 ? (
                <>
                  <span>{pizza.name}</span>
                  <span>
                    <span style={{ color: "var(--themeRed)" }}> $ </span>
                    {pizza.price[1]}
                  </span>
                </>
              ) : (
                <>
                  <span>{pizza.name}</span>

                  <span style={{ color: "var(--themeRed)" }}> NOT AVAILABLE!! </span>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Menu
