import * as Hapi from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../../response/macros'
import Jwt from '@hapi/jwt'
import * as Bcrypt from 'bcryptjs'

import 'colors'

const prisma = new PrismaClient()

async function jwtLogin(req: Hapi.Request, res: Hapi.ResponseToolkit) {

    const payload = (req.payload as { email?: string | undefined, password: string})

    try{
        let userInfo = await prisma.users.findFirst({
            where: { 
                email: payload.email 
            }
        })

        if(!userInfo) {
            return response.error({}, "Email doesn't exist")(res)
        }

        const {password,...user} = userInfo

        let isPasswordExist: any = Bcrypt.compareSync(payload.password, password)

        if(!isPasswordExist) {
            return response.error({}, 'Wrong password!')(res)
        }
                
        const token = Jwt.token.generate({
            expiresIn: 36000,
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            maxAgeSec: 86400,
            timeSkewSec: 15,
            user: {id: userInfo.id}
        }, process.env.SECRET_KEY||'');

        return response.success({token,user}, 'Logged in successfully!')(res)

    }catch(err:any) {
        console.log(`${err}`.red)
        return response.error({}, 'Something went wrong')
    }
}

export = {
    jwtLogin
}