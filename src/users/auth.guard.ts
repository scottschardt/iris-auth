import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql'
import { jwtConstants } from "src/auth/constants";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";


@Injectable() 
export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService
    ){}
    async canActivate(
        context: ExecutionContext
        ){
        const ctx = GqlExecutionContext.create(context).getContext();
        if(!ctx.headers.authorization) {
            return false;
        }
        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        if(auth.split(' ')[0] !== 'Bearer') 
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

        const token = auth.split(' ')[1];
        const secret = this.configService.get('JWT_SECRET')
        try {
            return await jwt.verify(token, secret)
        } catch(err) {
            throw new HttpException('Invalid JWT token', HttpStatus.UNAUTHORIZED);
        }

    }
}