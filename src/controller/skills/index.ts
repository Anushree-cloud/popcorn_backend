import {Request, ResponseToolkit} from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../../response/macros'

const {
    users: Users,
    roles: Roles,
    user_with_skills: UserWithSkills,
    skills: Skills
} = new PrismaClient()

async function addSkills (req:Request, res: ResponseToolkit) {
    try{

        

    } catch (err: any ){
        console.log('15=>',err);
        return response.error({}, 'Something went wrong!')(res)
    }
}


