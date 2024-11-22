import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken !== "null" && initialToken !== null ? initialToken : null);
    const [isOnline, setIsOnline] = useState(!!initialToken && initialToken !== "null");
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
    const [gameId, setGameId] = useState(localStorage.getItem('game_id') || null);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('is_admin') === 'true' || false);

    function logout() {
        setToken(null);
        setIsOnline(false);
        setUserId(null);
        setGameId(null);
        setIsAdmin(false);

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('game_id');
        localStorage.removeItem('is_admin');
    }

    useEffect(() => {
        // Almacena el token en localStorage y actualiza isOnline según el valor de token
        if (token) {
            localStorage.setItem('token', token);
            setIsOnline(true);
        } else {
            localStorage.removeItem('token');
            setIsOnline(false);
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('user_id', userId);
        localStorage.setItem('game_id', gameId);
        localStorage.setItem('is_admin', isAdmin);
    }, [userId, gameId, isAdmin]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout, isOnline, setUserId, userId, gameId, setGameId, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;