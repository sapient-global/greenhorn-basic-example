'use strict';

/*global module:false*/
module.exports = function(grunt) {

  // Config options
  var appConfig = {
    app: 'app',
    build: 'build',
    scripts: 'app/assets/scripts'
  }

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    config: appConfig,

    pkg: grunt.file.readJSON('package.json'),
    banner: '/* */ ',

    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
          '<%= config.scripts %>/*.js'
      ]
    },
    clean: {
      dist: {
        files: [{
          dot: true,
            src: [
              '<%= config.build %>/*',
            ]
        }]
      },
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.build %>/styles/main.css': ['<%= config.app %>/styles/{,*/}*.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          //collapseWhitespace: true,
          removeRedundantAttributes: true,
          //useShortDoctype: true,
          removeEmptyAttributes: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.app %>',
            src: '**/*.html',
            dest: '<%= config.build %>'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
            expand: true,
            cwd: '<%= config.app %>/assets/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= config.build %>/assets/images'
        }]
      }
    },
    copy: {
      dist: {
        files:[{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.build %>',
          src: ['.htaccess','assets/images/{,*/}*.{webp,gif}','assets/fonts/*']
        }]
      }
    },
    useminPrepare: {
      html: '<%= config.app %>/index.html',
      options: {
        dest: '<%= config.build %>'
      }
    },
    usemin: {
      html: ['build/**/*.html'],
      css: ['build/**/*.css'],
      options: {
          dirs: ['<%= config.build %>']
      }
    }
  });

   // Load NPM Tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint','clean','useminPrepare','concat','cssmin','uglify','htmlmin','imagemin','copy','usemin'])
};