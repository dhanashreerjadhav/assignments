module.exports = function(grunt) {

	// configuration setting
	grunt.initConfig({
		cssmin: {
		  target: {
		    files: {
		      //'src/css/output.css': ['src/css/module1.css', 'src/css/module2.css']

		      'src/css/output.css': ['src/**/*.css']

		      //'src/css/output.css': ['src/**/*.css', '!src/css/lib_core/**/*.css']
		    }
		  }
		},

		uglify: {
			target: {
				files: {
					'src/js/iwayJs.min.js' : ['src/js/iwayJs.js']
				}
			},

			letsBeautify: {
				options: {
					beautify: true,
					//mangle: false
				},
				files: {
					'src/js/iwayJs.beautify.js' : ['src/js/iwayJs.js']
				}
			}
		},

		/*jshint: {
			  files: ['src/js/module1.js', 'src/js/module2.js'],
		},*/

		watch: {
		css: {
		 		files: ['src/**/*.css'],
				tasks: ['cssmin'],
		 	},
		 },

	});

	// Lets load the installed plugins
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Lets run the task
		grunt.registerTask('default', ['watch']);

		/*OR*/

		/*grunt.registerTask('default', 'This is default task', function(){
			grunt.task.run(['cssmin']);
		});*/

		/*************************Specific Task

		grunt.registerTask('scriptTask', 'This is uglify task', function(){
			grunt.task.run(['uglify']);
		});

		grunt.registerTask('cssTask', 'This is cssmin task', function(){
			grunt.task.run(['cssmin']);
		});*/

		/******************************************/
		//grunt.registerTask('target', ['cssmin:target', 'uglify:target']);


};