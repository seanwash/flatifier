var child_process = require('child_process'),
	zipGenerator = require('./zipGenerator.js');

function generateFont(setName) {
	console.log('Creating font...');

	// fontcustom compile ./svg --output ./font -n "solid" --selector ".flaticon.setName.{{glyph}}"
	var home = process.env['HOME'],
		cmd = 'fontcustom',
		params = [
			'compile', 'svg',
			'-o', 'font',
			'-n', setName,
			'-S', '.flaticon.' + setName + '.{{glyph}}'
		],
		opts = {
			cwd: home + '/Downloads/flatified'
		},
		fontCustomProcess = child_process.spawn(cmd, params, opts);

	fontCustomProcess.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	fontCustomProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	fontCustomProcess.on('exit', function (exitCode) {
		console.log('exit: ' + exitCode);

		zipGenerator.generateZip(setName);
	});
}

module.exports.generateFont = generateFont;
