import axios from "axios"
import { createContext, useEffect, useState } from "react"
// Creación del grupo de whatsapp
const AuthContext = createContext()
// El mensaje a enviar
const AuthProvider = ({ children }) => {
    //Cargar la info del perfil del usuario - login
    const [auth, setAuth] = useState({})
    const [data, setData] = useState("Info del context")
    
    
    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            console.log(url)
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            console.log(respuesta.data)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    const actualizarPerfil = async (form) => {
    
        console.log(form);
        const token = localStorage.getItem("token")
        try {
            
            const respuesta=await axios.put (`${process.env.VITE_BACKEND_URL}/administrador/${auth._id} `,form,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
                    })
                    return {respuesta: respuesta.data,tipo:true}
                  

        } catch (error) {
            return {respuesta: error.data,tipo:false}
            
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                data,
                setData,
                actualizarPerfil
                     
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider

}
export default AuthContext
///nfdgjhgfd