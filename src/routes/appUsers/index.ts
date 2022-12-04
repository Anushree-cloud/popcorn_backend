import Joi from 'joi'

import UsersController from "../../controller/appUsers"

const router:any[] = [
    {
        method: 'GET',
        path: '/get-all',
        options:{
            tags: ['api','auth'],
            handler: UsersController.getAllUsers,
            description: 'User Registration',
        }
    },
]

export default router;