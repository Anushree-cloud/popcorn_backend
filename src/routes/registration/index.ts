import Joi from 'joi'

import registrationController from "../../controller/registration"

const router:any[] = [
    {
        method: 'POST',
        path: '/registration',
        options:{
            tags: ['api','registration'],
            auth:false,
            handler: registrationController.registration,
            description: 'User Registration',
            validate: {
                payload: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    org_id: Joi.number().integer().required(),
                    role_id: Joi.number().integer().required(),
                    date_of_birth: Joi.date().required(),
                    blood_group: Joi.string().required()
                })
            }
        }
    }
]

export default router;