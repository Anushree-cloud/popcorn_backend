import Joi from 'joi'

import registrationController from "../../controller/registration/registration"
import loginController from "../../controller/auth"

const router:any[] = [
    {
        method: 'POST',
        path: '/registration',
        options:{
            tags: ['api','registration'],
            handler: registrationController.registration,
            description: 'User Registration',
            validate: {
                payload: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    org_id: Joi.number().integer().required(),
                    roles_id: Joi.number().integer().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path:'/login',
        options: {
            tags:['api','auth'],
            handler: loginController.jwtLogin,
            description: 'User Login',
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }
]

export default router;