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
    execCommand('npx @noaignite/create-app', { cwd: projectPath });

    execCommand(`git clone --depth=1 ${TEMPLATE_REPO_URL} ${projectPath}/apps/studio`);
    fs.rmSync(path.join(`{projectPath}/apps/studio`, '.git'), { recursive: true });

    execCommand('npm install', { cwd: `{projectPath}/apps/studio` });
    // execCommand('git init', { cwd: projectPath });
    // execCommand('git add .', { cwd: projectPath });
    // execCommand('git commit -m "Initial commit"', { cwd: projectPath });
};