#!/usr/bin/env node
import {createDirectoryContents, createEnvFile, getProjectAnswer} from './src/setup-script.js'
import {setupRepository} from './src/setup-repository.js'
import {setupStart} from './src/setup-start.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const main = async () => {
    const projectName = await getProjectAnswer('Enter project name: ');
    const templatePath = `${__dirname}/studioTemplate`;


    console.warn('');
    console.warn("%c----> Start setupRepository.....",   "color: yellow; font-style: italic; background-color: blue;padding: 2px");
    console.warn('');
    await setupRepository(projectName);
    console.warn('');
    console.warn('----> Done setupRepository.....');
    console.warn('');

    await createEnvFile(projectName);
    await createDirectoryContents(templatePath, `${projectName}/apps/studio`);

    await setupStart(projectName);


    console.warn('----> All steps are done!');
};

main().catch(console.error);