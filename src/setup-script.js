import { createInterface as _createInterface } from 'node:readline';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
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

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      // Rename
      if (file === '.npmignore') file = '.gitignore';

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
};