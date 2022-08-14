export const getServerSideProps = async (params) => {
  const query = `*[_type == "order" && _id ==='${params.id}']`
  const pizzas = await client.fetch(query)
  console.log(pizzas)
  return {
    props: {
      pizzas,
    },
  }
}

export default function Orders({ order }) {}
