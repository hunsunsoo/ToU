import axios from "axios";

export const customAxios = axios.create({
  baseURL : "/api",
  headers : {
    // 로컬스토리지가 아닌 recoil에서 꺼내쓰도록 바꿔야함
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }
})

export const authAxios = axios.create({
  baseURL : "/api",
})
