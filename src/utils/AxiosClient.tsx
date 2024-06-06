import axios from 'axios'

const AxiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

const generateConfig = (token:string) => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
}

export default AxiosClient;

export {
    generateConfig
}