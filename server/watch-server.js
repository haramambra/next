const {join} = require('path');
const nodemon = require('nodemon');

nodemon({
	cwd: join(__dirname, '..'),
	watch: ['./server/**/*.ts'],
	execMap: {
		ts: 'ts-node -T --project "./tsconfig.server.json"',
	},
	ext: 'ts',
	script: './server/index.ts',
});
