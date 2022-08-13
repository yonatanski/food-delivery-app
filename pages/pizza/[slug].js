import React, { useState } from "react"
import { useStore } from "../../store/store"
import Layout from "../../components/Layout"
import { urlFor } from "../../lib/client"
import { client } from "../../lib/client"
import LeftArrow from "../../assets/arrowLeft.png"
import RightArrow from "../../assets/arrowRight.png"
import css from "../../styles/Pizzza.module.css"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"

export default function Pizza({ pizza }) {
  const [size, setSize] = useState(0)
  const [quanity, setQuantity] = useState(1)
  const handleQty = (type) => {
    type === "inc" ? setQuantity((prev) => prev + 1) : quanity === 1 ? null : setQuantity((prev) => prev - 1)
  }
  const addPizza = useStore((state) => state.addPizza)
  const addTocart = () => {
    addPizza({ ...pizza, price: pizza.price[size], quanity: quanity, size: size })
    toast.success("Pizza added to cart")
  }

  const src = urlFor(pizza.image).url()
  console.log(pizza)
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image loader={() => src} src={src} alt="" layout="fill" unoptimized objectfit="cover" />
        </div>
        {/* size part  */}
        <div className={css.detail}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>
          <span>
            <span style={{ color: "var(--themeRed)" }}>$</span> {pizza.price[size]}
          </span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariant}>
              <div onClick={() => setSize(0)} className={size === 0 ? css.selected : ""}>
                Small
              </div>
              <div onClick={() => setSize(1)} className={size === 1 ? css.selected : ""}>
                Medium
              </div>
              <div onClick={() => setSize(2)} className={size === 2 ? css.selected : ""}>
                Large
              </div>
            </div>
          </div>
          {/* quantity part  */}
          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image src={LeftArrow} alt="" height={20} width={20} objectfit="contain" onClick={() => handleQty("dec")} />
              <span>{quanity}</span>
              <Image src={RightArrow} alt="" height={20} width={20} objectfit="contain" onClick={() => handleQty("inc")} />
            </div>
          </div>
          {/* add to cart button  */}
          <div className={`btn ${css.btn}`} onClick={addTocart}>
            Add to Cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type=="pizza" && defined(slug.current)][].slug.current`)

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params
  const pizza = await client.fetch(`*[_type=="pizza" && slug.current=='${slug}'][0]`)
  return {
    props: {
      pizza,
    },
  }
}
