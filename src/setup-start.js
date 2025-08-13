import { execCommand, createEnvFile} from './setup-script.js';
import fs from 'node:fs'
import path from 'node:path'

const TEMPLATE_REPO_URL = 'https://github.com/noaignite/create-noaignite-sanity.git';

export const setupStart = async (projectName) => {
    
    const projectPath = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectPath)){
        fs.mkdirSync(projectPath);
    }
 
    execCommand(`turbo run dev`, { cwd: projectPath });
    console.log(" ")
    console.log("---------------------------> done! (turbo run dev)")
    console.log(" ")
 
    return true;
    
};