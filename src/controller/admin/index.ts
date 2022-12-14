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

    const { user_role_id } = (req.query as { user_role_id: number})

    try{

        let whereClause: object = user_role_id ? {role_id: user_role_id} : {}

        const fetchRole = (await Roles.findFirst({
            where: { id: role_id },
            select: {
                role_name: true
            }
        }))?.role_name

        if(fetchRole !== 'admin') {
            return response.error({}, 'You have no permission to view user list!', 401)(res)
        }

        const allUsers: any[] | null = await Users.findMany({
            where: {
                org_id,
                ...whereClause,
                NOT: {
                    role_id
                }
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

        if(allUsers.length == 0) {
            return response.error({}, 'No users fetched', 401)(res)
        }
        
        return response.success({allUserCount: allUsers.length, allUsers}, 'All users fetched successfully.')(res)

    }catch(err:any) {
        console.log(`${err}`.red)
        return response.error({}, 'Something went wrong')(res)
    }

}


export = {
    getAllUsersUnderAdmin
}
