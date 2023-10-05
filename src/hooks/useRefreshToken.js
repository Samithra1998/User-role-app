import axios from "../api/axios"
import { useAuthContext } from "../context/AuthProvider"

const useRefreshToken = () => {
    const {setAuth} = useAuthContext()

    const refresh = async() => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials:true
            });
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {...prev, accessToken: response.data.accessToken}
            })
            return response.data.accessToken;
        } catch (error) {
            console.error(error)
        }
    }
  return (
    refresh
  )
}
export default useRefreshToken