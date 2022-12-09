import Joi from "joi"


const getAllQuery = Joi.object({
    user_role_id: Joi.number().integer()
})

export = {
    getAllQuery
}