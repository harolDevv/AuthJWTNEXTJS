import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const DashBoard = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email:'',
        username:''
    })

    const getProfile = async () => {
        const response = await axios.get("/api/profile");
        setUserData(response.data)
    };
    const logOut = async () => {
        try {
            await axios.post("/api/Auth/LogOut ");
            router.push('/Login')
        } catch (error) {
            router.push('/Login')
        }
    };
  return (
        <div>
        <h1>DashBoard</h1>
        <pre>
            {JSON.stringify(userData, null, 2)}
        </pre>
            <button
                onClick={() => getProfile()}
                aria-label="boton para obtener perfil"
                aria-describedby="profile-button-description"
            >
                Get Profile
            </button>
            <p id="profile-button-description">
                Haz clic en el botón para obtener el perfil.
            </p>
            <button
                onClick={() => logOut()}
                aria-label="boton cerrar la sesion"
                aria-describedby="profile-button-description"
            >
                Close Sesion
            </button>
            <p id="profile-button-description">
                Haz clic en el botón para cerrar el perfil.
            </p>
        </div>
  );
};

export default DashBoard;
