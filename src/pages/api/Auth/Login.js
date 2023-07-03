import { serialize } from "cookie"
import jwt from "jsonwebtoken"


const handleLogin = (req,res) => {
    const {email, password} = req.body
    
    if (email === 'admin@admin.com' && password === 'admin123') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: 'admin@admin.com',
            username: 'haroldev',
        }, 'secret' )

        //estamos en prudduccion es necesario que uses ssl
        const serializedToken = serialize('myTokenName', token, 
            {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'none', 
                maxAge: 1000 * 60 *60 * 24 * 30,
                path:'/'
            },
        )

        res.setHeader('set-cookie', serializedToken)//primer valor nombre // segunndo valor
        return res.status(200).json('logginSuccess')
    }

    return res.status(401).json({err: 'invalid email or password'})
}

export default handleLogin