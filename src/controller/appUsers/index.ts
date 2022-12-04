import * as Hapi from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../../response/macros'

import 'colors'

const prisma = new PrismaClient()

async function getAllUsers(req:Hapi.Request, res:Hapi.ResponseToolkit) {

    try{

        const allUsers = await prisma.users.findMany()
        
        return response.success(allUsers, 'All users fetched successfully.')(res)

    }catch(err:any) {
        console.log(`${err}`.red)
        return response.error({}, 'Something went wrong')(res)
    }

}

export = {
    getAllUsers
}
