import Layout from "../../components/Layout"
import Image from "next/image"
import Cooking from "../../assets/cooking.png"
import OnWay from "../../assets/onway.png"
import Spinner from "../../assets/spinner.svg"
import css from "../../styles/Orders.module.css"
import { UilBill, UilBox } from "@iconscout/react-unicons"
import { client } from "../../lib/client"

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

export default function Orders({ order }) {
  return (
    <Layout>
      <div className={css.container}>
        <span>Order in process</span>
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
            <span>Method</span>
            <span>{order.method ? "Online" : "Cash on delivery"}</span>
          </div>

          <div>
            <span>Total</span>
            <span>{order.total}</span>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilBill width={50} height={50} color="black" />
            <span>Payment</span>
            {order.method == 0 ? <span className={css.pending}>On Delivery</span> : <span className={css.complted}>Paid Online</span>}
          </div>
          <div className={css.status}>
            <Image src={Cooking} alt="logo of the navigation bar" width={50} height={50} />
            <span>Cooking</span>
            {order.method == 0 ? (
              <div className={css.spinner}>
                <Image src={Spinner} alt="logo of the navigation bar" />
              </div>
            ) : (
              <span className={css.pending}> On Delivery</span>
            )}
          </div>
          <div className={css.status}>
            <Image src={OnWay} alt="logo of the navigation bar" width={50} height={50} />
            <span>OnWay</span>
          </div>
          <div className={css.status}>
            <UilBox width={50} height={50} color="black" />
            <span>Deliverd</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}
