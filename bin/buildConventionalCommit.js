import * as readlinePromises from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';

const COMMIT_SCOPES = [
	'build',
	'chore',
	'ci',
	'docs',
	'feat',
	'fix',
	'perf',
	'refactor',
	'revert',
	'style',
	'test'
];

const readline = readlinePromises.createInterface({ input, output });

console.log(chalk.bold('----Conventional Commits----\n'));
console.log('<type>[scope]: <description>\n[optional body]\n[optional footer(s)]');

let type;
do {
	type = await readline.question(chalk.blue('\nWhat is the type of your commit (i.e. fix, chore)? Type help to see all options.\n'));

	if (type === 'help') {
		console.log(COMMIT_SCOPES);
	}
} while (!COMMIT_SCOPES.includes(type));

const scope = await readline.question(chalk.blue('\nWhat is the scope? This can be blank.\n'));

let description;
do {
	description = await readline.question(chalk.blue('\nWhat is the description / commit message? This is required and should be 50 chars or less\n'));
} while (!description || description.trim() === '');

let body = await readline.question(chalk.blue('\nWould you like to add a body to this commit message? This can be as long as you desire.\n'));

if (body && body.length > 80) {
	for (let i = 0, mostRecentWS = 0, currentLineLength = 0; i < body.length; i++) {
		currentLineLength++;
		if (body[i] === ' ') {
			mostRecentWS = i;
		}

		if (currentLineLength > 80) {
			body = body.substring(0, mostRecentWS) + '\n' + body.substring(mostRecentWS + 1);
			currentLineLength = i - mostRecentWS;
		}
	}
}

const footer = await readline.question(chalk.blue('\nAny footer message? i.e. [BOLT-123] or [BUGS-12345]\n'));

readline.close();

const message = `${type}${scope ? '(' + scope + ')' : ''}: ${description}${body ? '\n\n' + body : ''}${footer ? '\n\n' + footer : ''}`;

console.log(chalk.green('\nSuccess! Copy the following message into your commit.\n'));
console.log(chalk.bold(message) + '\n');
