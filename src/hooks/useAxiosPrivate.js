import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const {auth} = useAuthContext();
    const refresh = useRefreshToken();

    return axiosPrivate;
}

export default useAxiosPrivate;