import { Request, ResponseToolkit} from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../../response/macros'
import * as Bcrypt from 'bcryptjs'

const prisma = new PrismaClient()


async function registration (req: Request, res: ResponseToolkit) {

    const payload = (req.payload as {
        first_name:string,
        last_name:string,
        email:string,
        password:string,
        org_id: number,
        role_id: number,
        date_of_birth: Date,
        blood_group: string
    })

    try{

        const userInfo = await prisma.users.findFirst({
            where: {email: payload.email },
            select: {
                email: true
            }
        })

        if(userInfo) {
            return response.error({}, 'User already exists!')(res)
        }

        let hashedPassword = Bcrypt.hashSync(payload.password, Bcrypt.genSaltSync())
        
        const data: any = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            password: hashedPassword,
            org_id: payload.org_id,
            role_id: payload.role_id,
            date_of_birth: payload.date_of_birth,
            blood_group: payload.blood_group
        }
        
        let user: any = await prisma.users.create({ data })
        return response.success({}, 'User Created Successfully')(res)

    }catch(err:any){
        console.log(`${err}`.red);
        return response.error({},'Something went wrong.')(res)
    }
}

export = {
    registration
}