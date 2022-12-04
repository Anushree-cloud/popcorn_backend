import Joi from 'joi'

import registrationController from "../../controller/auth/registration"
import loginController from "../../controller/auth/login"

const router:any[] = [
    {
        method: 'POST',
        path: '/registration',
        options:{
            tags: ['api','auth'],
            handler: registrationController.registration,
            description: 'User Registration',
            validate: {
                payload: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
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