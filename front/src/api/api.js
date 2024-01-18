import axios from 'axios'

const host = 'https://192.168.1.37:7001'

export const getClothes = async () => {
  return axios.get(`${host}/clothes`).then((response) => response.data)
}

export const getClothesById = async (id) => {
  return await axios.get(`${host}/clothes/${id}`).then((response) => response.data)
}

export const register = async (data) => {
  return await axios.post(`${host}/register`, data).then((response) => response.data)
}

export const login = async (data) => {
  return await axios.post(`${host}/login`, data).then((response) => response.data)
}

export const getTopSelling = async () => {
  return await axios.get(`${host}/clothes/top-selling`).then((response) => response.data)
}

export const getNewArrivals = async () => {
  return await axios.get(`${host}/clothes/new-arrivals`).then((response) => response.data)
}

export const ChangeUserName = async (newName) => {
  const token = document.cookie.split('=')[1]

  return await axios.put(`${host}/user/change/name`, JSON.stringify(newName), {
    headers: {
      Authorization: `Jwt ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const ChangeUserEmail = async (newEmail) => {
  const token = document.cookie.split('=')[1]

  return await axios.put(`${host}/user/change/email`, JSON.stringify(newEmail), {
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
    .post(`${host}/cart/products/add`, product, {
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
    .post(`${host}/cart/products/remove`, product, {
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
    .post(`${host}/cart/products/change-count`, product, { headers: { Authorization: `Jwt ${token}` } })
    .then((response) => response.status)
}

export const getUserInfo = async () => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  return await axios.get(`${host}/user`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}

export const getCart = async () => {
  const token = document.cookie.split('=')[1]

  return await axios.get(`${host}/cart`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}

export const createOrder = async (data) => {
  const token = document.cookie.split('=')[1]

  return await axios.post(`${host}/order/create`, data, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}
