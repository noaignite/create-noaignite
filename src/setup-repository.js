import { execCommand } from './setup-script.js';
import fs from 'node:fs'
import path from 'node:path'

const TEMPLATE_REPO_URL = 'https://github.com/noaignite/create-noaignite-sanity.git';

export const setupRepository = async (projectName) => {
    
    const projectPath = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectPath)){
        fs.mkdirSync(projectPath);
    }
 
    execCommand(`npx create-turbo@latest .`, { cwd: projectPath });
    console.log(" ")
    console.log("---------------------------> done! (npx create-turbo@latest)")
    console.log(" ")
    execCommand('npx @noaignite/create-app', { cwd: projectPath });
    console.log(" ")
    console.log("---------------------------> done! (npx @noaignite/create-app)")
    console.log(" ")
    execCommand('npm create sanity@latest -- --dataset production --template clean --typescript --output-path ./apps/studio', { cwd: projectPath })
    console.log(" ")
    console.log("---------------------------> done! SANITY")
    console.log(" ")
    execCommand('git init', { cwd: projectPath });
    // execCommand('git add .', { cwd: projectPath });
    // execCommand('git commit -m "Initial commit"', { cwd: projectPath });
    console.log(" ")
    console.log("---------------------------> done! GIT")
    console.log(" ")
    console.log("Don't forget to publish to GitHub later when you are ready :)")
};