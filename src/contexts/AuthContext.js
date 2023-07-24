// Under Progress...
import { useState } from "react";
import { useContext } from "react";
import { auth } from '../Firebase'

const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext) 
}
const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password)

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState([]);
    const value = {currentUser}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}