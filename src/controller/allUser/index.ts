import * as Hapi from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../../response/macros'

const { 
    users: Users,
    roles: Roles
} = new PrismaClient()

async function getUserDetails (req: Hapi.Request, res: Hapi.ResponseToolkit) {

    const { user_id } = (req.query as { user_id: number})

    try{

        let fetchUserDetails: object | null = await Users.findUnique({
            where: { id: user_id },
            include: {
                role: {
                    select: { display_name: true }
                }
            }
        })

        return response.success(fetchUserDetails, 'User Details fetched successfully')(res)

    } catch (err: any ){
        console.log(err)
        return response.error({}, 'Something went wrong!')(res)
    }
}

export = {
    getUserDetails
}