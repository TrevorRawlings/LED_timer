var exec = require('sync-exec'),
_ = require('underscore');

var eaglePath = (function() {
	var where = exec('where.exe eagle.exe');
		
	if (where.status === 0 && where.stdout.length > 0) {
		return where.stdout.trim();
	}
	
	// TODO: Eagle on windows seems to install to C:\\EAGLE-*\\bin\\eagle.exe
	//       We could search there before giving up
	console.log("Eagle was not found on the path");
})();

var freeCadPath = (function() {
	var where = exec('where.exe FreeCAD.exe');
		
	if (where.status === 0 && where.stdout.length > 0) {
		return where.stdout.trim();
    }
	
	console.log("freeCad was not found on the path");
})();

function echoCommand(command) {
	console.log(command);
	return command;
}

var gerberFiles = ['.dri', 'GBL', 'GBO', 'GBS', 'GTL', 'GTO','GTS','TXT','dri','gpi','GML','GTP'].map((extension) => `./eagle/schematic.${extension}`);
    freeCadModels = ['bottom', 'case'],
	freeCadExportFormats = ['step', 'stl'];

module.exports = function(grunt) {
// __dirname 

  var config = {
    pkg: grunt.file.readJSON('package.json'),
	shell: {
        eagle_images: {
            command: function () { return echoCommand(eaglePath + ' ./eagle/schematic.sch -C "EXPORT image schematic.png 1000; BOARD;EXPORT image pcb.png 1000;PRINT FILE ./pcb.pdf;QUIT"'); } 
        }
		// export_base_step
		// export_base_stl
		// export_case_step
		// export_case_stl		
    },
	clean: {
		images: ['schematic.png', 'pcb.png', 'pcb.pdf'],
		eagle: [].concat(gerberFiles,['./eagle/schematic.b#*','./eagle/schematic.s#*', './eagle/schematic_0*.pro','./eagle/schematic_0*.job']),
		freeCadExports: []
	}
  };
  var freeCadExportCommands = _.map(freeCadModels, function (model) {
	  return _.map(freeCadExportFormats, function (format) {
		  var command = 'export_' + model + '_' + format,
		      localDir = __dirname + "/freeCad/";

		  config.shell[command] = {
			  command: function () {
				  return echoCommand(`"${freeCadPath}" --hidden --output=${localDir}${model}.${format} ${localDir}${model}.FCStd`);
			  }
		  }
		  config.clean.freeCadExports.push(`./freeCad/${model}.${format}`);
		  return `shell:${command}`;		  
	  });
  });
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('images', ['clean:images', 'shell:eagle_images']);
  grunt.registerTask('freeCadExports',  ['clean:freeCadExports'].concat(_.flatten(freeCadExportCommands)))
};