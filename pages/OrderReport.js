import React from "react"
import date from "date-and-time"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { useStore } from "../store/store"
import toast, { Toaster } from "react-hot-toast"
import css from "../styles/Cart.module.css"

const OrderReport = ({ order }) => {
  return (
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
          {order?.orderDetail.length > 0 &&
            order?.orderDetail?.map((pizza, i) => {
              const src = urlFor(pizza.image[0]).url()
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
                </tr>
              )
            })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ color: "var(--themeRed)", fontWeight: "bold" }}>{order?.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderReport
