import { useContext, createContext } from "react";

const AuthContext = createContext();

// custom hook
const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
