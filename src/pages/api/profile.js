import { verify } from "jsonwebtoken"

export default function profileHandler(req,res){
    try {
        const {myTokenName} = req.cookies
        const user = verify(myTokenName, 'secret')
        return res.status(200).json({email: user.email, username: user.username})
    } catch (error) {
        return res.status(401).json({err: 'invalid token'})
    }
}