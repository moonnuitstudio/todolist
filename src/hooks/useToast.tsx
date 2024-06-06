import { toast, Bounce } from 'react-toastify'

const useToast = () => {
    const showSuccessToast = (msg:string) => {
        toast.success(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const showErrorToast = (msg:string) => {
        toast.error(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const clearAllToasts = () => toast.dismiss()

    return {
        showSuccessToast,
        showErrorToast,
        clearAllToasts
    }
}
 
export default useToast