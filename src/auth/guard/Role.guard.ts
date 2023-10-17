// src/auth/firebase.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService,
        private reflector: Reflector,
        private readonly memberShipService: MemberShipsService,
        private readonly userService: UsersService
    ) { }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const authHeader = request.headers.authorization;

        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     throw new ForbiddenException({
        //         message: 'Token is required'
        //     }); // No Bearer token found in the header
        // }

        const token = this.extractTokenFromHeader(request);


        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            const decodedToken = await this.firebaseService.verifyIdToken(token);
            const uid = decodedToken.uid;
            request.user = decodedToken;
            request.uid = uid;

            const checkRole = (await this.userService.findOne(uid)).memberShip.name;
            if (!requiredRoles.includes(checkRole)) {
                throw new ForbiddenException({
                    message: 'Method not allowed'
                })
            }
            return true;
        } catch (error) {
            throw new ForbiddenException({
                message: error.message,
            });
        }
    }
}
