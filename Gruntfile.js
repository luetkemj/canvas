module.exports = function(grunt) {
 
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        compass: {
          dist: {
            options: {
              cssDir: 'library/css',
              sassDir: 'library/scss',
              environment: 'development',
              relativeAssets: true,
              outputStyle: 'expanded',
              raw: 'preferred_syntax = :scss\n',
              require: ['susy','breakpoint']
            }
          }
        },

        watch: {
            scss: {
                files: ['library/scss/**/*.scss'],
                tasks: ['compass']
            },
            css: {
                files: ['library/css/**/*.css']
            },
            js: {
                files: ['library/js/**/*.js','!library/js/main.js'],
                tasks: ['concat']
            },
            livereload: {
                files: ['**/*.html', '**/*.php', '**/*.js', '**/*.css', '!**/node_modules/**'],
                options: { livereload: true }
            }
        },

        browserSync: {
            files: {
                src : 'library/css/style.css'
            },
            options: {
                watchTask: true // < VERY important
            }
            // ,
            // options: {
            //     proxy: "vcuartsbones.dev"
            // }
        },
 
        autoprefixer: {
            dist: {
                files: {
                    'library/css/style.css' : 'library/css/style.css'
                }
            }
        },
 
        cmq: {
            your_target: {
                files: {
                    'library/css' : 'library/css/style.css'
                }
            }
        },
 
        cssmin: {
            combine: {
                files: {
                    'library/css/style.min.css': ['library/css/style.css']
                }
            }
        },
 
        jshint: {
            all: [
                'library/js/*.js',
            ],
            options: {
                jshintrc: 'library/js/.jshintrc'
            }
        },
 
        concat: {  
            footer: {
                src: [
                    'library/js/libs/*.js', // All JS in the libs folder
                    'library/js/scripts.js',  // This specific file
                    '!library/js/libs/modernizr.custom.min.js'
                ],
                dest: 'library/js/main.js',
            }
        },
 
        uglify: {
            footer: {
                src: 'library/js/main.js',
                dest: 'library/js/main.min.js'
            }
        },
 
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'library/images/',
                    src: ['**/*.{png,jpg,gif,svg,ico}'],
                    dest: 'library/images/'
                }]
            }
        },
 
        devcode : {
          options :
          {
            html: true,        // html files parsing?
            js: true,          // javascript files parsing?
            css: true,         // css files parsing?
            clean: true,       // removes devcode comments even if code was not removed
            block: {
              open: 'devcode', // with this string we open a block of code
              close: 'endcode' // with this string we close a block of code
            },
            dest: '/'       // default destination which overwrittes environment variable
          },
          dist : {             // settings for task used with 'devcode:dist'
            options: {
                source: '/',
                dest: '/',
                env: 'production'
            }
          }
        },

        concurrent: {
            watch: {
                tasks: ['watch', 'compass', 'browserSync'],
                options: {
                    logConcurrentOutput: true
                }
            }
        } 
    });
 
    // 3. Where we tell Grunt what plugins to use
 
    // Sass
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
 
    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
 
    // Images
    grunt.loadNpmTasks('grunt-contrib-imagemin');
 
    // Clean
    grunt.loadNpmTasks('grunt-contrib-clean');
 
    // DevCode
    grunt.loadNpmTasks('grunt-devcode');
   
    // Browser Reload + File Watch
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
 
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('init', ['build']);
    grunt.registerTask('dev', ['browserSync','watch']);
    grunt.registerTask('build', ['imagemin', 'compass:dist', 'autoprefixer', 'cmq', 'cssmin', 'concat', 'uglify','devcode:dist']);
};