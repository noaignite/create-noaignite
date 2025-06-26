#!/usr/bin/env node
import {createInterface, askQuestion, createDirectoryContents} from './src/setup-script.js'
import {setupRepository} from './src/setup-repository.js'
import cmdParameter from 'yargs';
import path from 'node:path';
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getProjectName = async () => {
    let projectName = cmdParameter?.argv?.name;

    if (!projectName) {
        const cmdInput = createInterface();
        projectName = await askQuestion(cmdInput, 'Enter project name: ');
        cmdInput.close();
    }

    return projectName;
};

const createEnvFile = async (projectName) => {
    const projectPath = path.join(process.cwd(), projectName);

    const cmdInput = createInterface();

    // Step 1: Tell the user where to get the relevant information
    console.log('You now need to provide your Sanity   API key and secret.\n');
    console.log('You can get your Sanity   API key and secret from the Sanity Dashboard at: \n\n');

    // Step 2: Ask for Sanity   API key and secret
    const sanityToken = await askQuestion(cmdInput, 'Enter your SANITY_STUDIO_TOKEN: ');
    const sanityDataset = await askQuestion(cmdInput, 'Enter your SANITY_STUDIO_DATASET ("stage" or "production"): ');
    const sanityProjectId = await askQuestion(cmdInput, 'Enter your SANITY_STUDIO_PROJECT_ID: ')
    const sanityApiVersion = await askQuestion(cmdInput, 'Enter your SSANITY_STUDIO_API_VERSION (v2025-06-26): ')
    // const sanityPreviewSecret = await askQuestion(cmdInput, 'Enter your SANITY_PREVIEW_SECRET: ')
    // const centraCheckoutApi = await askQuestion(cmdInput, 'Enter your CENTRA_CHECKOUT_API: ')
    // const centraCheckoutSecret = await askQuestion(cmdInput, 'Enter your CENTRA_CHECKOUT_SECRET: ')
    // NEXT_PUBLIC_SANITY_TOKEN
    // NEXT_PUBLIC_SANITY_DATASET
    // NEXT_PUBLIC_SANITY_PROJECT_ID
    // SANITY_PREVIEW_SECRET
    // CENTRA_CHECKOUT_API
    // CENTRA_CHECKOUT_SECRET


    // Step 3: Create .env.local file
    const envLocalPath = path.join(projectPath, '.env.local');
    if (!fs.existsSync(envLocalPath)) {
        fs.appendFileSync(envLocalPath, `SANITY_STUDIO_TOKEN=${sanityToken}\n`, 'utf8');
        fs.appendFileSync(envLocalPath, `SANITY_STUDIO_DATASET=${sanityDataset}\n`, 'utf8');
        fs.appendFileSync(envLocalPath, `SANITY_STUDIO_PROJECT_ID=${sanityProjectId}\n`, 'utf8');
        fs.appendFileSync(envLocalPath, `SANITY_STUDIO_API_VERSION=${sanityApiVersion}\n`, 'utf8');
    }

    //    // Step 4: Ask for userId and userName
    // const userId = await askQuestion(cmdInput, 'Enter the user ID: ');
    // const userName = await askQuestion(cmdInput, 'Enter the user name: ');
    // cmdInput.close();

    // // Step 5: Update page.tsx
    // updateFile(
    //     path.join(projectPath, 'app/page.tsx'),
    //     'const userId = undefined;',
    //     `const userId = "${userId}";`
    // );

    // updateFile(
    //     path.join(projectPath, 'app/page.tsx'),
    //     'const userName = undefined;',
    //     `const userName = "${userName}";`
    // );

    cmdInput.close();
}


const main = async () => {
    const projectName = await getProjectName();
    const templatePath = `${__dirname}/studioTemplate`;
    await setupRepository(projectName);
    await createEnvFile(projectName);
    await createDirectoryContents(templatePath, projectName)
};

main().catch(console.error);