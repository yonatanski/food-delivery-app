import Layout from "../components/Layout"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { useStore } from "../store/store"
import toast, { Toaster } from "react-hot-toast"
import css from "../styles/Cart.module.css"
import { useState } from "react"
import OrderModal from "../components/OrderModal"

export default function Cart() {
  const [paymentMethod, setPaymentMethod] = useState(null)
  const CartData = useStore((state) => state.cart)
  const removePizza = useStore((state) => state.removePizza)
  const handleRemoveCart = (id) => {
    removePizza(id)
    toast.error("Pizza removed from the cart")
  }

  const total = () => CartData.pizzas.reduce((acc, curr) => acc + curr.quanity * curr.price, 0)

  const handelOnDelivery = () => {
    setPaymentMethod(0)
    typeof window !== "undefined" && localStorage.setItem("total", total())
  }
  return (
    <Layout>
      <div className={css.contanier}>
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url()
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image loader={() => src} src={src} alt="" objectfit="cover" width={85} height={85} />
                      </td>
                      <td>{pizza.name}</td>

                      <td>{pizza.size == 0 ? "Small" : pizza.size == 1 ? "Medium" : "Large"}</td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quanity}</td>
                      <td>{pizza.price * pizza.quanity}</td>
                      <td style={{ color: "var(--themeRed)", cursor: "pointer" }} onClick={() => handleRemoveCart(i)}>
                        x
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        {/* summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetail}>
            <div>
              <span>Items</span>
              <span>{CartData.pizzas.length}</span>
            </div>

            <div>
              <span>Total</span>
              <span>{total()}</span>
            </div>
          </div>
          <div className={css.buttons}>
            <button className="btn" onClick={handelOnDelivery}>
              Pay On Delivery
            </button>
            <button className="btn">Pay Now</button>
          </div>
        </div>
      </div>

      <Toaster />

      {/* MODAL FOR PAYMENT FORM */}
      <OrderModal paymentMethod={paymentMethod} opened={paymentMethod === 0} setOpened={setPaymentMethod} />
    </Layout>
  )
}
