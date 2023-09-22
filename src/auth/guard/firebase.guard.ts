// src/auth/firebase.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ForbiddenException({
                message: 'Token is required'
            }); // No Bearer token found in the header
        }

        const token = authHeader.split(' ')[1];


        try {
            const decodedToken = await this.firebaseService.verifyIdToken(token);

            request.user = decodedToken;
            return true;
        } catch (error) {
            throw new ForbiddenException({
                message: error.message,
            });
        }
    }
}
