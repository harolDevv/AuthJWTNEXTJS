import { serialize } from "cookie"
import { verify } from "jsonwebtoken"

const logOutHandler = (req,res) => {
    const {myTokenName} = req.cookies

    if(!myTokenName){v
        res.status(401).json({err: 'no-token'})
    }
    try {
        verify(myTokenName, 'secret')
        //estamos en prudduccion es necesario que uses ssl
        const serializedToken = serialize('myTokenName', null, 
            {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'none', 
                maxAge: 0,
                path:'/'
            },
        )
        res.setHeader('set-cookie', serializedToken)
        res.status(200).json('logout successfully')
        
    } catch (error) {
        return res.status(401).json({err: 'invalid token'})
    }
}

export default logOutHandler