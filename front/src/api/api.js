import axios from './instance'

export const getClothes = async () => {
  return await axios.get(`/clothes`).then((response) => response.data)
}

export const getClothesById = async (id) => await axios.get(`/clothes/${id}`)

export const register = async (data) => await axios.post(`/register`, data)

export const login = async (data) => await axios.post(`/login`, data)

export const getTopSelling = async () => {
  return await axios.get(`/clothes/top-selling`).then((response) => response.data)
}

export const getNewArrivals = async () => {
  return await axios.get(`/clothes/new-arrivals`).then((response) => response.data)
}

export const ChangeUserName = async (newName) => {
  const token = document.cookie.split('=')[1]

  return await axios.put(`/user/change/name`, JSON.stringify(newName), {
    headers: {
      Authorization: `Jwt ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const ChangeUserEmail = async (newEmail) => {
  const token = document.cookie.split('=')[1]

  return await axios.put(`/user/change/email`, JSON.stringify(newEmail), {
    headers: {
      Authorization: `Jwt ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const addCartProductToCart = async (product) => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }
  return await axios
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
  return await axios
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

  return await axios
    .post(`/cart/products/change-count`, product, { headers: { Authorization: `Jwt ${token}` } })
    .then((response) => response.status)
}

export const getUserInfo = async () => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  return await axios.get(`/user`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}

export const getCart = async () => {
  const token = document.cookie.split('=')[1]

  return await axios.get(`/cart`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}

export const createOrder = async (data) => {
  const token = document.cookie.split('=')[1]

  return await axios.post(`/order/create`, data, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}
