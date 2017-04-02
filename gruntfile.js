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
          ],
          preprocessors: {
            'src/js/**/*/js': ['coverage']
          },
          reporters: ['dots', 'coverage'],
          coverageReporter: {
            type: 'text-summary'  // format the code coverage page
          }
        }
      }
    },
    concat: {
      alljs: {
        options: {
          sourceMap: true
        },
        src: ['src/js/shop.module.js', 'src/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },
    babel: {
      all: {
        options: {
          presets: ['es2015'],
          sourceMap: true
        },
        files: {
          // destination      Source
          'build/js/app.js':  'build/js/app.js'
        }
      }
    }
  });

  // automatically load all grunt tasks
  require('load-grunt-tasks')(gruntConfig);

  // task aliases for build tasks
  gruntConfig.registerTask('build',
    [ 'jshint', 'clean', 'concat',
     'babel', 'karma', 'sass', 'copy' ]);
};
