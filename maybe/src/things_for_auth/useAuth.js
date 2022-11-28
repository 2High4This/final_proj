import { useContext } from "react";
import AuthContext from "./keepAuth";

const useAuth = () => {

    const { auth } = useContext(AuthContext);
    return useContext(AuthContext);

}

export default useAuth;