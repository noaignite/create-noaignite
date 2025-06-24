import { createInterface as _createInterface } from 'node:readline';
import { execSync } from 'node:child_process';

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