import axios from 'axios'

const DUMMY_CLOTHES = [
  {
    id: 1,
    name: 'Gradient Graphic T-shirt',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 145,
    rating: 3.5,
    imageLink: 'gradientTShirt.png',
    sizes: [
      { id: 1, size: 'XX-Small' },
      { id: 2, size: 'X-Small' },
      { id: 3, size: 'Small' },
    ],
    color: { id: 3, colorName: 'blue' },
  },
  {
    id: 2,
    name: 'Polo with Tipping Details',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 180,
    rating: 4.5,
    imageLink: 'poloTipping.png',
    sizes: [{ id: 3, size: 'Small' }],
    color: { id: 2, colorName: 'black' },
  },
  {
    id: 3,
    name: 'Black Striped T-shirt',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 120,
    discount: 30,
    oldPrice: 150,
    rating: 5.0,
    imageLink: 'blackStrippedShirt.png',
    sizes: [{ id: 3, size: 'Small' }],
    color: { id: 1, colorName: 'white' },
  },
  {
    id: 4,
    name: 'Skinny Fit Jeans',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    oldPrice: 260,
    price: 240,
    discount: 20,
    rating: 3.5,
    imageLink: 'skinnyFitJeans.png',
    sizes: [{ id: 3, size: 'Small' }],
    color: { id: 1, colorName: 'white' },
  },
  {
    id: 5,
    name: 'Gradient Graphic T-shirt',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 145,
    rating: 3.5,
    imageLink: 'gradientTShirt.png',
    sizes: [
      { id: 4, size: 'Medium' },
      { id: 5, size: 'Large' },
      { id: 6, size: 'X-Large' },
    ],
    color: { id: 1, colorName: 'white' },
  },
  {
    id: 6,
    name: 'Polo with Tipping Details',
    price: 180,
    rating: 4.5,
    imageLink: 'poloTipping.png',
    sizes: [
      { id: 7, size: 'XX-Large' },
      { id: 8, size: '3X-Large' },
    ],
    color: { id: 1, colorName: 'white' },
  },
  {
    id: 7,
    name: 'Black Striped T-shirt',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 120,
    discount: 30,
    oldPrice: 150,
    rating: 5.0,
    imageLink: 'blackStrippedShirt.png',
    sizes: [
      { id: 7, size: 'XX-Large' },
      { id: 8, size: '3X-Large' },
    ],
    color: { id: 1, colorName: 'white' },
  },
  {
    id: 8,
    name: 'Skinny Fit Jeans',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 240,
    oldPrice: 260,
    discount: 20,
    rating: 3.5,
    imageLink: 'skinnyFitJeans.png',
    sizes: [{ id: 9, size: '4X-Large' }],
    color: { id: 1, colorName: 'white' },
  },
  {
    id: 9,
    name: 'Gradient Graphic T-shirt',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 145,
    rating: 3.5,
    imageLink: 'gradientTShirt.png',
    sizes: [{ id: 9, size: '4X-Large' }],
    color: { id: 1, colorName: 'white' },
  },
]

export const getClothes = async () => {
  return axios.get(`https://localhost:7001/clothes`).then((response) => response.data)
}

export const getClothesById = async (id) => {
  return await axios.get(`https://localhost:7001/clothes/${id}`).then((response) => response.data)
}

export const register = async (data) => {
  return await axios.post(`https://localhost:7001/register`, data).then((response) => response.data)
}

export const login = async (data) => {
  return axios.post(`https://localhost:7001/login`, data).then((response) => response.data)
}

export const getTopSelling = () => {
  const result = []
  for (let i = 0; i < 4; i++) {
    result.push(DUMMY_CLOTHES[Math.floor(Math.random() * DUMMY_CLOTHES.length)])
  }
  return result
}

export const getNewArrivals = () => {
  const result = []
  for (let i = 0; i < 4; i++) {
    result.push(DUMMY_CLOTHES[Math.floor(Math.random() * DUMMY_CLOTHES.length)])
  }
  return result
}

export const getUserInfo = async () => {
  const token = document.cookie.split('=')[1]
  if (!token) {
    throw new Error('No token provided')
  }
  return await axios.get('https://localhost:7001/user', {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}

export const getCart = async () => {
  const token = document.cookie.split('=')[1]

  return await axios
    .get(`https://localhost:7001/cart`, {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    })
    .then((response) => response.data)
}
