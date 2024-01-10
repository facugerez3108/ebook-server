import prisma from "../client";
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import config from "./config";
import { TokenType } from "@prisma/client";

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify: VerifyCallback = async (payload, done) => {
    try {
        
        if(payload.type !== TokenType.ACCESS) {
            throw new Error('Invalid token type');
        }

        const user = await prisma.user.findUnique({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
            where: {
                id: payload.sub
            
            }
        });

        if(!user) {
            throw new Error('User not found');
        }

        done(null, user);
    }catch(err) {
        done(err, false);
    }
}

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);