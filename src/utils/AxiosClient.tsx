import axios from 'axios'

const AxiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

// eslint-disable-next-line react-refresh/only-export-components
export const generateConfig = (token:string) => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
}

export default AxiosClient;