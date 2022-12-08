'use strict'

import * as Hapi from '@hapi/hapi';

import server from './config/server';

import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import 'colors';

import BaseRoute from './routes'
import jwtAuth from './config/authentication';

const init = async () => {

    await jwtAuth.jwtAuthentication(server)

    const swaggerOptions = {
        basePath:'/api',
        info:{
            title:'Popcorn API Documentation',
        },
        grouping: 'tags',
        securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
        },
        security: [{ jwt: [] }],
        schemes: ['http','https']
    }

    const plugins: any[] = [
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]

    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Hapi.Request, reply: Hapi.ResponseValue) => {
            return '<h1>This is Popcorn</h1>'
        }
    })

    await server.register(plugins)

    await server.register(BaseRoute, {
        routes:{
            prefix: '/api'
        }
    })

    await server.start()

    console.log(`Server is running on ${server.info.uri}`.blue.bgWhite);

}

process.on('unhandledRejection', (err) => {
    if(err) throw err
})

init()
