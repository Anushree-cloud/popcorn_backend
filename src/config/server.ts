import * as Hapi from '@hapi/hapi'

const server:Hapi.Server = new Hapi.Server({
    host: 'localhost',
    port: '3050',
    routes: {
        cors: {
            origin: ['*'], // an array of origins or 'ignore'    
            headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], // an array of strings - 'Access-Control-Allow-Headers'
            exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'], // an array of exposed headers - 'Access-Control-Expose-Headers',
            additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
            maxAge: 60,
            credentials: true // boolean - 'Access-Control-Allow-Credentials'
        },
        validate: {
            failAction: async (req, res, err) => {
                return err
            }
        }
    }
})

export default server;