import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin'

import * as fs from 'fs'
import * as path from 'path'
@Injectable()
export class FirebaseService {
    private admin: admin.app.App;

    constructor() {

    }

    async getAdminInstance(): Promise<admin.app.App> {
        if (!this.admin) {
            const rootDirectory = process.cwd();
            const adminConfigFile = path.join(rootDirectory, '.', 'firebase-admin-config.json');
            // Read the JSON file synchronously
            const adminJson = fs.readFileSync(adminConfigFile, 'utf8');
            const adminConfig = JSON.parse(adminJson);

            this.admin = admin.initializeApp({
                credential: admin.credential.cert(adminConfig),
            });
        }

        return this.admin;
    }
    async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {

        const adminInstance = await this.getAdminInstance();
        const decodedToken = adminInstance.auth().verifyIdToken(token);
        if (!decodedToken) {
            throw new ForbiddenException(`Authentication token invalid`)
        }
        return decodedToken;

    }
}
