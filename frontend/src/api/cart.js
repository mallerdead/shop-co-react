import { instance } from './instance'

export const addCartProductToCart = async (product) => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }
  return await instance
    .post(`/cart/products/add`, product, {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    })
    .then((response) => response.status)
}

export const removeProductFromCart = async (product) => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }
  return await instance
    .post(`/cart/products/remove`, product, {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    })
    .then((response) => response.data)
}

export const changeCountInCart = async (product) => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  return await instance
    .post(`/cart/products/change-count`, product, { headers: { Authorization: `Jwt ${token}` } })
    .then((response) => response.status)
}

export const getCart = async () => {
  const token = document.cookie.split('=')[1]

  return await instance.get(`/cart`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}
