import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
    Strategy,
    'firebase-auth',
) {
    private defaultApp: firebase.app.App;
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        const rootDirectory = process.cwd();
        const adminConfigFile = path.join(rootDirectory, '.', 'firebase-admin-config.json');
        // Read the JSON file synchronously
        const adminJson = fs.readFileSync(adminConfigFile, 'utf8');
        const adminConfig = JSON.parse(adminJson);

        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(adminConfig),
        });
    }
    async validate(token: string) {
        const firebaseUser: any = await this.defaultApp
            .auth()
            .verifyIdToken(token, true)
            .catch((err) => {
                console.log(err);
                throw new UnauthorizedException(err.message);
            });
        if (!firebaseUser) {
            throw new UnauthorizedException();
        }
        return firebaseUser;
    }
}