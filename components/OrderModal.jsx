import React, { useState } from "react"
import { createOrder } from "../lib/orderHandler"
import css from "../styles/OrderModal.module.css"
import toast, { Toaster } from "react-hot-toast"
import { Modal, useMantineTheme } from "@mantine/core"
import { useStore } from "../store/store"
import { useRouter } from "next/router"

const OrderModal = ({ paymentMethod, opened, setOpened }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const restCart = useStore((state) => state.clearingCart)

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const total = typeof window !== "undefined" && localStorage.getItem("total")

  const handleSumbitForm = async (e) => {
    e.preventDefault()
    const id = await createOrder({ ...formData, total, paymentMethod })
    console.log("formData--->", { ...formData, total, paymentMethod })
    toast.success("Order Placed Successfully")
    console.log("orderPlaced", id)
    restCart()
    {
      typeof window !== "undefined" && localStorage.setItem("order", id)
    }
    await router.push(`/order/${id}`)
  }
  const theme = useMantineTheme()
  return (
    <Modal overlayColor={theme.colorscheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]} overlayOpacity={0.55} overlayBlur={3} opened={opened} onClose={() => setOpened(null)}>
      {/* Modal Content */}
      <form onSubmit={handleSumbitForm} className={css.formContainer}>
        <input onChange={handleInput} type="text" name="name" required placeholder="name" />
        <input onChange={handleInput} type="text" name="phone" required placeholder="Phone Number" />

        <textarea onChange={handleInput} name="address" rows={3} required placeholder="Delivery Address"></textarea>
        <textarea onChange={handleInput} name="comment" rows={4} placeholder="right here if you have extra message for us"></textarea>
        <span>
          You will pay <span>$ {total}</span> on Delivery
        </span>
        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  )
}

export default OrderModal
