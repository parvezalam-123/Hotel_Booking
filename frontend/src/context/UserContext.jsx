import { createContext, useEffect, useState } from "react"
import api from "../api/api";

export const UserDataContext = createContext();
function UserContext({ children }) {
    // will removed after making backend
    const demoUserData = {
        profileImg: null,
        name: "User 1",
        isOwner: true
    }
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    async function checkLogin() {
        try {
            const res = await api.get("/auth/me");
            if (res.status == 200) {
                const userData = res?.data?.data;
                const isOwner = userData.role == "hotel-manager";
                setUser({ ...userData, isOwner });
            }
        }
        catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false);
        }
    }
    async function logout() {
        try {
            const res = await api.post("/auth/logout");
            if (res.status == 200) {
                setUser(null);
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        checkLogin();
    }, [])
    return <UserDataContext.Provider value={{ user, setUser, logout, loading }}>
        {children}
    </UserDataContext.Provider>
}

export default UserContext;
