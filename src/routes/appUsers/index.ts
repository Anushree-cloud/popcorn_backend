import Joi from 'joi'

import UsersController from "../../controller/appUsers"

const router:any[] = [
    {
        method: 'GET',
        path: '/get-all',
        options:{
            tags: ['api','users'],
            handler: UsersController.getAllUsers,
            description: 'User Registration',
        }
    },
]

export default router;