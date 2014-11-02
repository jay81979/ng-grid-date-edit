"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    templates: [
        'src/templates/**.html'
    ],
    srcFiles: [
        'src/*.js',
        'src/directives/*.js',
        'src/services/*.js',
        '<%= ngtemplates.ngGridDatePicker.dest %>'
    ],
    ngtemplates: {
        ngGridDatePicker: {
            cwd: 'src/templates',
            src: '*.html',
            dest: "build/<%= pkg.name %>.js"
        }
    },
    concat: {
        development: {
            src: ['<%= srcFiles %>'],
            dest: 'build/<%= pkg.name %>.js'
        }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task
  grunt.registerTask('default', ['ngtemplates', 'concat']);

};