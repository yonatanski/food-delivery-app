export const createOrder = async ({ name, phone, address, comment, total, paymentMethod }) => {
  const result = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address,
      comment: comment,
      total: parseFloat(total),
      method: paymentMethod,
      status: 1,
    }),
  })

  const id = await result.json()
  return id
}
