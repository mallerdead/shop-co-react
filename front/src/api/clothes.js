import { instance } from './instance'

export const getClothes = async () => await instance.get(`/clothes`).then((response) => response.data)

export const getClothesById = async (id) => await instance.get(`/clothes/${id}`)

export const getTopSelling = async () => await instance.get(`/clothes/top-selling`)

export const getNewArrivals = async () => await instance.get(`/clothes/new-arrivals`)
