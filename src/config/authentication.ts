import * as Hapi from '@hapi/hapi'
import Jwt from '@hapi/jwt'
import hapiAuthJwt from '@hapi/jwt'
// import {VerifyTokenOptions} from '@ty'

import { Request, ResponseToolkit} from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function jwtAuthentication (server:any) {
    
    await server.register(Jwt);

    server.auth.strategy('jwt_strategy', 'jwt', {
        keys: process.env.SECRET_KEY,
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 86400,
            timeSkewSec: 15
        },
        validate: async(artifacts:any, request:Hapi.Request | any, h:Hapi.ResponseToolkit) => {

            const { isValid, error } = verifyToken(artifacts, process.env.SECRET_KEY,{
                aud: 'urn:audience:test',
                iss: 'urn:issuer:test',
                sub: false,
                nbf: true,
                exp: true,
                maxAgeSec: 864400,
                timeSkewSec: 15
            });

            if(isValid){
                const userDetails = await prisma.users.findUnique({
                    where: {
                        id: artifacts.decoded.payload.user.id
                    },
                    include: {
                        role: true
                    }
                })

                request.user = userDetails || {}

                return {
                    isValid,
                    credentials: { user: userDetails },
                    error
                };
            }
        }
    })

    server.auth.default('jwt_strategy');

};

function verifyToken(artifact:any, secret_key:string|undefined, options:any){
    
    try{
        if(!secret_key){
            throw new Error('Secret key is required')
        }
        
        Jwt.token.verify(artifact, secret_key, options)

        return {
            isValid: true,
            error: ''
        }
    }catch(err : any){
        return {
            isValid: false,
            error: err.message
        }
    }
}

export = {
    jwtAuthentication
}