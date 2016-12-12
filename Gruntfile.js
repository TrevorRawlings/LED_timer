var eaglePath = (function() {
	var exec = require('sync-exec'),
		where = exec('where.exe eagle.exe');
		
	if (where.status === 0 && where.stdout.length > 0) {
		return where.stdout.trim();
	}
	
	// TODO: Eagle on windows seems to install to C:\\EAGLE-*\\bin\\eagle.exe
	//       We could search there before giving up
	grunt.log.error("Eagle was not found on the path");
})();

function echoCommand(command) {
	console.log(command);
	return command;
}


var gerberFiles = ['.dri', 'GBL', 'GBO', 'GBS', 'GTL', 'GTO','GTS','TXT','dri','gpi','GML','GTP'].map((extension) => `./eagle/schematic.${extension}`);


module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	shell: {
        eagle_images: {
            command: function () { return echoCommand(eaglePath + ' ./eagle/schematic.sch -C "EXPORT image schematic.png 1000; BOARD;EXPORT image pcb.png 1000;PRINT FILE ./pcb.pdf;QUIT"'); } 
        }
    },
	clean: {
		images: ['schematic.png', 'pcb.png', 'pcb.pdf'],
		eagle: [].concat(gerberFiles,['./eagle/schematic.b#*','./eagle/schematic.s#*', './eagle/schematic_0*.pro','./eagle/schematic_0*.job'])
	}
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('images', ['clean:images', 'shell:eagle_images']);
};