// src/auth/firebase.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>(
            "roles",
            context.getHandler(),
        );
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some(member => member === user.memberShip.name);

    }



}
