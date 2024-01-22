import { instance } from './instance'

export const createNewOrder = async (data) => {
  const token = document.cookie.split('=')[1]

  const newData = []
  data.forEach((product) => {
    newData.push({
      count: product.count,
      clothId: product.clothId,
      sizeId: product.size.id,
      colorId: product.color.id,
    })
  })

  const newOrder = {
    name: 'test',
    products: newData,
  }

  return await instance.post(`/order/create`, newOrder, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}
