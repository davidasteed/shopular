module.exports = function configureGrunt(gruntConfig) {
  gruntConfig.initConfig({
    clean: ['build/'],
    copy: {
      copyHtml: {
        files: [
          {
            cwd: 'src/',
            src: ['*.html'],
            dest: 'build/',
            expand: true
          }
        ]
      },
      copyJs: {
        files: [
          {
            cwd: 'src/js',
            src: ['**/*.js'],
            dest: 'build/js/',
            expand: true
          }
        ]
      }
    },
    sass: {
      runSass: {
        files: {
          //  destination     : source
          'build/css/style.css' : 'src/sass/main.scss'
        }
      }
    },
    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['src/**/*.js']
        }
      }
    },
    karma: {
      all: {
        options: {
          frameworks: ['mocha', 'chai'],
          browsers: ['Chrome'],
          singleRun: true,
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/js/shop.module.js',    // must load the module first
            'src/**/*.js',
            'test/**/*.spec.js'
          ]
        }
      }
    }
  });

  // automatically load all grunt tasks
  require('load-grunt-tasks')(gruntConfig);

  // task alias for build tasks
  gruntConfig.registerTask('build', [ 'clean', 'jshint', 'karma', 'sass', 'copy' ]);
};
