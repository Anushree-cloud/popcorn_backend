import Joi from 'joi'

import AdminController from "../../controller/admin"
import AdminValidator from "../../validators/admin"

const router:any[] = [
    {
        method: 'GET',
        path: '/get-all',
        options:{
            tags: ['api','users'],
            handler: AdminController.getAllUsersUnderAdmin,
            description: 'User Registration',
            validate: {
                query: AdminValidator.getAllQuery
            }
        }
    },
]

export default router;