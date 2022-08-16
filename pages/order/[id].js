import Layout from "../../components/Layout"
import Link from "next/link"
import { parseISO, format } from "date-fns"
import Image from "next/image"
import Cooking from "../../assets/cooking.png"
import OnWay from "../../assets/onway.png"
import Spinner from "../../assets/spinner.svg"
import css from "../../styles/Orders.module.css"
import { UilBill, UilBox } from "@iconscout/react-unicons"
import { client } from "../../lib/client"
import { useEffect } from "react"
import OrderReport from "../OrderReport"
import toast, { Toaster } from "react-hot-toast"
export const getServerSideProps = async ({ params }) => {
  console.log("paramsid", params)
  const query = `*[_type == 'order' && _id =='${params.id}']`
  const order = await client.fetch(query)
  console.log("order --->", order)
  return {
    props: {
      order: order[0],
    },
  }
}

const handleRefreshStatus = () => {
  toast.success("Order status updated!... You will be able to see the if the status is Updated from the Resturant")
}

export default function Orders({ order }) {
  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear()
    }
  }, [order])
  return (
    <Layout>
      <div className={css.container}>
        <Link href={`/order/${order._id}`}>
          <button className={`btn ${css.refreshStatubtn}`} onClick={handleRefreshStatus}>
            {" "}
            Click to see Updated Delivery Status{" "}
          </button>
        </Link>
        <span>Order in process</span>
        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilBill width={50} height={50} color="black" />
            <span>Payment</span>
            {order.method == 0 ? <span className={css.pending}>On Delivery</span> : <span className={css.complted}>Paid Online</span>}
          </div>
          <div className={css.status}>
            <Image src={Cooking} alt="logo of the navigation bar" width={50} height={50} />
            <div>
              <span>Cooking</span>
              {order.preparing && order.status == 1 && <p>{order.preparing} min</p>}
            </div>
            {order.status == 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="logo of the navigation bar" />
              </div>
            )}
            {order.status > 1 && <span className={css.complted}>Completed</span>}
          </div>
          <div className={css.status}>
            <Image src={OnWay} alt="logo of the navigation bar" width={50} height={50} />
            <div>
              <span>OnWay</span>
              {order.delivering && (order.status == 1 || order.status == 2) && <p>{order.delivering} min</p>}
            </div>
            {order.status == 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="logo of the navigation bar" />
              </div>
            )}
            {order.status > 2 && <span className={css.complted}>Completed</span>}
          </div>
          <div className={css.status}>
            <UilBox width={50} height={50} color="black" />
            <span>Deliverd</span>
            {order.status == 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="logo of the navigation bar" />
              </div>
            )}
            {order.status > 3 && <span className={css.complted}>Completed</span>}
          </div>
        </div>
        {/* hhhhh */}
        <span>Order Profile Detail</span>
        <div className={css.orderDetail}>
          <div>
            <span>OrderID</span>
            <span>{order._id}</span>
          </div>
          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>

          <div>
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Order Address</span>
            <a href={order.address} target="_blank" rel="noreferrer" style={{ color: "var(--themeRed)", cursor: "pointer" }}>
              <span>Clik here to see the address</span>
            </a>
          </div>
          <div>
            <span>Order Extra Comment</span>
            <span>{order.comment}</span>
          </div>
          <div>
            <span>Orderd Time</span>
            <span>{format(parseISO(order._createdAt), "EEEE, MMM. do - HH:mm")}</span>
          </div>

          <div>
            <span>Method</span>
            <span>{order.method ? "Online" : "Cash on delivery"}</span>
          </div>

          <div>
            <span>Total</span>
            <span>{order.total}</span>
          </div>
        </div>

        {/* ORDER STATUS */}

        <span>Order History</span>
      </div>
      <OrderReport order={order} />
      <Toaster />
    </Layout>
  )
}
