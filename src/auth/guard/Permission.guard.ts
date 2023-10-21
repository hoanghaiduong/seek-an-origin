// src/auth/firebase.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { GroupPermissonService } from 'src/group-permisson/group-permisson.service';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService,
        private reflector: Reflector,
        private readonly permissionService: GroupPermissonService,
        private readonly userService: UsersService
    ) { }
    // private extractTokenFromHeader(request: Request): string | undefined {
    //     const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //     return type === 'Bearer' ? token : undefined;
    // }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        try {
            const uid = request.query.uid;
            const requiredRoles = this.reflector.getAllAndOverride<string[]>('permission', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            
            const checkRole = (await this.userService.findOne(uid)).groupPermission.name;
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
