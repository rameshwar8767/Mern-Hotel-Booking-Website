import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser,useAuth} from "@clerk/clerk-react"
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const AppContext = createContext();

export const AppProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY || '₹';
    const navigate = useNavigate();
    const { user } = useUser();
    const {getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelRegister, setShowHotelRegister] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const {data} = await axios.get("/api/rooms", {headers: {Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                setRooms(data.rooms);
                toast.success(data.message || "Rooms fetched successfully");
            }else{
                toast.error(data.message || "Failed to fetch rooms");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong while fetching rooms");
            
        }
    }

    useEffect(()=>{
        fetchRooms();
    },[])

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get("/api/user", {headers: {Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                setIsOwner(data.role === 'hotelOwner');
                setSearchedCities(data.recentSearchedCities || []);
            }else{
                // Retry fetching the user data
                setTimeout(()=>{
                    fetchUser();
                },5000);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong while fetching user data");
        }
    }

    useEffect(() => {
    const registerAndFetchUser = async () => {
        try {
            const token = await getToken();

            // Register user on backend
            await axios.post("/api/user/register", {
            id: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || "",  // ✅ CORRECT
            username: user.username || user.fullName || user.firstName || "User",
            image_url: user.imageUrl,
            }, {
            headers: { Authorization: `Bearer ${token}` },
            });





            // Now fetch user data
            const { data } = await axios.get("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setIsOwner(data.role === 'hotelOwner');
                setSearchedCities(data.recentSearchedCities || []);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong while registering/fetching user");
        }
    };

    if (user) {
        registerAndFetchUser();
    }
}, [user]);

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        showHotelRegister,
        setShowHotelRegister,
        axios,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms,
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);