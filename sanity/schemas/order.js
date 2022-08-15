export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      options: {
        maxLength: 40,
      },
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
      options: {
        maxLength: 20,
      },
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      options: {
        maxLength: 100,
      },
    },
    {
      name: "comment",
      title: "Comment",
      type: "string",
      options: {
        maxLength: 400,
      },
    },
    {
      name: "method",
      title: "Method",
      type: "number",
    },

    {
      name: "total",
      title: "Total",
      type: "number",
    },
    {
      name: "orderDetail",
      title: "OrderDetail",
      type: "array",
      // of: [{ _id: "string", details: "string", name: "string", price: "number", quanity: "number", size: "number" }],
      of: [{ type: "pizza" }, { name: "price", type: "number" }, { name: "quanity", type: "number" }, { name: "size", type: "number" }],
      // of: [
      //   { name: "details", type: "string" },
      //   { name: "name", type: "string" },
      //   { name: "price", type: "number" },
      //   { name: "quanity", type: "number" },
      //   { name: "size", type: "number" },
      // ],
    },
    {
      name: "preparing",
      title: "Preparing",
      type: "number",
    },
    {
      name: "delivering",
      title: "Delivering",
      type: "number",
    },

    {
      name: "status",
      title: "Status",
      type: "number",
    },
  ],
}
