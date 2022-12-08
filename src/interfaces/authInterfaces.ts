import * as Hapi from '@hapi/hapi'

export default interface IRequest extends Hapi.Request {
    user: object
}