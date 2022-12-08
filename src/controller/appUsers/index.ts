import * as Hapi from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../../response/macros'

import IRequest from '../../interfaces/authInterfaces'

import 'colors'

const {
    users: Users,
    roles: Roles
} = new PrismaClient()

async function getAllUsersUnderAdmin(req:IRequest, res:Hapi.ResponseToolkit) {

    const { role_id, org_id } = (req.user as {
        role_id: number,
        org_id: number
    })

    try{

        const fetchRole = (await Roles.findFirst({
            where: { id: role_id },
            select: {
                role_name: true
            }
        }))?.role_name

        if(fetchRole !== 'admin') {
            return response.error({}, 'You have no permission to view user list!', 401)(res)
        }

        const allUsers = await Users.findMany({
            where: {
                org_id
            },
            include: {
                role: {
                    select: {
                        display_name: true,
                        role_name: true
                    }
                }
            }
        })
        
        return response.success(allUsers, 'All users fetched successfully.')(res)

    }catch(err:any) {
        console.log(`${err}`.red)
        return response.error({}, 'Something went wrong')(res)
    }

}

export = {
    getAllUsersUnderAdmin
}
