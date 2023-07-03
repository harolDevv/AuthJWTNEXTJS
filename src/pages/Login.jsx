import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {

    const router = useRouter()
    const [credentials, setCredentials] = useState({email:'', password:''})

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await axios.post('api/Auth/Login',credentials)
        console.log(response);
        if(response.status == 200){
            console.log('entre');
            router.push('/DashBoard')
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <fieldset>
            <legend>Inicia Sesion</legend>
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="email" placeholder='Coloca tu email' name='email'/>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" placeholder='Coloca tu password' name='password' />
            <input type="submit" value={'Login'}/>
        </fieldset>
    </form>
  )
}

export default Login
