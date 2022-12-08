import Joi from 'joi'

import UsersController from "../../controller/appUsers"

const router:any[] = [
    {
        method: 'GET',
        path: '/get-all',
        options:{
            tags: ['api','users'],
            handler: UsersController.getAllUsersUnderAdmin,
            description: 'User Registration',
        }
    },
]

export default router;