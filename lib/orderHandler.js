export const createOrder = async ({ name, phone, address, comment, total, paymentMethod, orderDetail }) => {
  const result = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address,
      comment: comment,
      total: parseFloat(total),
      method: paymentMethod,
      orderDetail: orderDetail,
      status: 1,
    }),
  })

  const id = await result.json()
  return id
}
