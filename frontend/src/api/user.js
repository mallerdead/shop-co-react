import { instance } from './instance'

export const register = async (data) => await instance.post(`/register`, data)

export const login = async (data) => await instance.post(`/login`, data)

export const getUserInfo = async () => {
  const token = document.cookie.split('=')[1]

  if (token) {
    return await instance.get(`/user`, {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    })
  }
}

export const ChangeUserName = async (newName) => {
  const token = document.cookie.split('=')[1]

  return await instance.put(`/user/change/name`, JSON.stringify(newName), {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}

export const ChangeUserEmail = async (newEmail) => {
  const token = document.cookie.split('=')[1]

  return await instance.put(`/user/change/email`, JSON.stringify(newEmail), {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
}
