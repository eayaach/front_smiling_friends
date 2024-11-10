import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    // Obtén el valor inicial de token desde localStorage y verifica si es válido
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken !== "null" && initialToken !== null ? initialToken : null);
    const [isOnline, setIsOnline] = useState(!!initialToken && initialToken !== "null");
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
    const [gameId, setGameId] = useState(localStorage.getItem('game_id') || null);

    function logout() {
        setToken(null);
        setIsOnline(false);
        setUserId(null);
        setGameId(null);

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('game_id');

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
    }, [userId]);


    return (
        <AuthContext.Provider value={{ token, setToken, logout, isOnline , setUserId, userId, gameId, setGameId}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;