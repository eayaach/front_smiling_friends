import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";



function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isOnline, setIsOnline] = useState(!!token);

    function logout() {
        setToken(null)
        setIsOnline(false)
    }

    useEffect(() => {
        localStorage.setItem('token', token);
        if(token) {
            setIsOnline(true)
        } else {
            setIsOnline(false)
        }

    }, [token]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'token') {
                setToken(event.newValue);
            }
        };

        // Escucha el evento 'storage'
        window.addEventListener('storage', handleStorageChange);

        // Limpieza del event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <AuthContext.Provider value={{ token, setToken, logout, isOnline }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;