
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
const rootDirectory = process.cwd();
const adminConfigFile = path.join(rootDirectory, '.', 'firebase-admin-config.json');
// Read the JSON file synchronously
const adminJson = fs.readFileSync(adminConfigFile, 'utf8');
const adminConfig = JSON.parse(adminJson);

const firebaseConfig = {
    credential: admin.credential.cert(adminConfig),
}
const defaultApp = admin.initializeApp(firebaseConfig);
const defaultAuth = defaultApp.auth();
export {
    firebaseConfig,
    defaultApp,
    defaultAuth
}