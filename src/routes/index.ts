import * as Hapi from '@hapi/hapi';
import authRoute from './auth';
import userRoute from './appUsers'

function addPrefix(prefix:string,route:any) {
  return route.map((item:any) => {
    item.path = `/${prefix}${item.path}`
    return item
  })
}
const baseRouter = {
    name: "base-route",
    version: "1.0.0",
    register: (server: Hapi.Server) => {
      server.route(addPrefix('auth',authRoute)),
      server.route(addPrefix('users',userRoute))
    }
  };

export default baseRouter