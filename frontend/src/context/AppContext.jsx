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

    const fetchUser = async ()=>{
        try {
            const {data} =await axios.get("/api/user", {headers: {Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                setIsOwner(data.role === 'hotelOwner');
                setSearchedCities(data.searchedCities || []);
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

    useEffect(()=>{
        if(user){
            fetchUser();
        }
    },[user]);

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
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);