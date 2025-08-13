import { createInterface as _createInterface } from 'node:readline';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import cmdParameter from 'yargs';
const CURR_DIR = process.cwd();

export const createInterface = () => {
    return _createInterface({
        input: process.stdin,
        output: process.stdout,
    });
};

export const askQuestion = (cmdInput, question) => {
    return new Promise((resolve) => {
        cmdInput.question(question, (answer) => {
            resolve(answer);
        });
    });
};

export const execCommand = (command, options = {}) => {
    try {
        execSync(command, { stdio: 'inherit', ...options });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
};

export const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    const newFilePath = `${CURR_DIR}/${newProjectPath}/${file}`;
    const fileExist = fs.existsSync(newFilePath);
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
        if(fileExist) {
            fs.unlink(newFilePath,function(err){
                if(err){
                    // File deletion failed
                    console.error(`Error message (${newFilePath}):`, err.message);
                    return;
                }
                // console.log(`File deleted successfully (${newFilePath}):`);
                      const contents = fs.readFileSync(origFilePath, 'utf8');

                // Rename
                if (file === '.npmignore') file = '.gitignore';

                const writePath = newFilePath;

                fs.writeFileSync(writePath, contents, 'utf8');
                // console.log(" ")
                // console.log("---------------------------> done!")
                // console.log(" ")      
            });
        } else {

            const contents = fs.readFileSync(origFilePath, 'utf8');

            // Rename
            if (file === '.npmignore') file = '.gitignore';

            const writePath = newFilePath;

            fs.writeFileSync(writePath, contents, 'utf8');
        }


    } else if (stats.isDirectory()) {
        if( fileExist ) {
            fs.rm(newFilePath, { recursive: true }, (err) => {
                if(err){
                    // File deletion failed
                    console.error(`Error message (${newFilePath}) :`, err.message);
                    return;
                }

                // console.log(`File deleted successfully (${newFilePath})`);
                fs.mkdirSync(newFilePath);

                // recursive call
                createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);

                // console.log(" ")
                // console.log("---------------------------> done!")
                // console.log(" ")
                
            })
        } else {
            fs.mkdirSync(newFilePath);

            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);

        }
       
    }

  });

  return true;
};

export const getCurrentFilenames = (templatePath) => { 
    console.log("\nCurrent filenames:"); 
    fs.readdirSync(templatePath).forEach(file => { 
        console.log(file); 
    }); 
    console.log(""); 
}

export const createEnvFile = async (projectName) => {
    const projectPath = path.join(CURR_DIR, projectName);
    const envLocalPath = `${projectPath}/.env.local`;
    const cmdInput = createInterface();
    

    // Step 1: Tell the user where to get the relevant information
    console.warn('');
    console.log('You now need to provide your Sanity API key and secret:');
    console.warn('');

    console.warn('');
    console.log('env.local exist?', fs.existsSync(envLocalPath));
    console.warn('');
    // Step 2: Ask for Sanity   API key and secret
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

    if (!fs.existsSync(envLocalPath)) {
        console.warn('');
        console.log('Start creating env.local: ');
        console.warn('');

        const sanityToken = await askQuestion(cmdInput, 'Enter your SANITY_STUDIO_TOKEN: ');
        const sanityDataset = await askQuestion(cmdInput, 'Enter your SANITY_STUDIO_DATASET ("stage" or "production"): ');
        const sanityProjectId = await askQuestion(cmdInput, 'Enter your SANITY_STUDIO_PROJECT_ID: ')
        const sanityApiVersion = await askQuestion(cmdInput, 'Enter your SSANITY_STUDIO_API_VERSION (v2025-06-26): ')


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

export const getProjectAnswer = async (question) => {
    let projectAnswer = cmdParameter?.argv?.name;

    if (!projectAnswer) {
        const cmdInput = createInterface();
        projectAnswer = await askQuestion(cmdInput, question);
        cmdInput.close();
    }

    return projectAnswer;
};