import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const initialToken = sessionStorage.getItem('token');
    const [token, setToken] = useState(initialToken !== "null" && initialToken !== null ? initialToken : null);
    const [isOnline, setIsOnline] = useState(!!initialToken && initialToken !== "null");
    const [userId, setUserId] = useState(sessionStorage.getItem('user_id') || null);
    const [gameId, setGameId] = useState(sessionStorage.getItem('game_id') || null);
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('is_admin') === 'true' || false);
    const [game_status, setGameStatus] = useState(sessionStorage.getItem('game_status') || null);

    function logout() {
        setToken(null);
        setIsOnline(false);
        setUserId(null);
        setGameId(null);
        setIsAdmin(false);
        setGameStatus(null);

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('game_id');
        sessionStorage.removeItem('is_admin');
        sessionStorage.removeItem('game_status');
        sessionStorage.clear();
    }

    useEffect(() => {
        // Almacena el token en sessionStorage y actualiza isOnline según el valor de token
        if (token) {
            sessionStorage.setItem('token', token);
            setIsOnline(true);
        } else {
            sessionStorage.removeItem('token');
            setIsOnline(false);
        }
    }, [token]);

    useEffect(() => {
        sessionStorage.setItem('user_id', userId);
        sessionStorage.setItem('game_id', gameId);
        sessionStorage.setItem('is_admin', isAdmin);
        sessionStorage.setItem('game_status', game_status);
    }, [userId, gameId, isAdmin, game_status]);



    return (
        <AuthContext.Provider value={{ token, setToken, logout, isOnline, setUserId, userId, gameId, setGameId, isAdmin, setIsAdmin, game_status, setGameStatus}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;