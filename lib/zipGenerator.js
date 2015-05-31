var child_process = require('child_process');

function generateZip(setName) {
	console.log('Creating zip...');

	var home = process.env['HOME'],
		cmd = 'zip',
		params = [
			'-r',
			setName + '-flatified',
			'flatified'
		],
		opts = {
			cwd: home + '/Downloads'
		},
		zipProcess = child_process.spawn(cmd, params, opts);

	zipProcess.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	zipProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	zipProcess.on('exit', function(exitCode) {
		console.log('Flatification complete!');
	});
}


module.exports.generateZip = generateZip;
