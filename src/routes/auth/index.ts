import Joi from 'joi'

import registrationController from "../../controller/registration"
import loginController from "../../controller/auth"

const router:any[] = [
    {
        method: 'POST',
        path:'/login',
        options: {
            auth: false,
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