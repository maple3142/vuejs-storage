process.env.CHROME_BIN = require('chromium').path
const cp = require('child_process')
const child = cp.spawn(__dirname + '/node_modules/.bin/karma', [
	'start',
	'--single-run',
])
process.stdin.pipe(child.stdin)
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
child.on('exit', (code) => process.exit(code))
