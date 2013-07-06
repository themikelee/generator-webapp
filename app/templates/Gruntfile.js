// Taken from [Yeoman webapp generator](https://github.com/yeoman/generator-webapp).
// The most recent commit at the time of forking was June 6, 2013:
// Fixed http fonts path by Alex Kühne [3f10765](https://github.com/yeoman/generator-webapp/commit/3f107651818b2603eb234354f96c2d303d94024f)

// This will output a comment in the generated Gruntfile.js that will tell you the date, "generator-webapp",
// and the [npm version](https://npmjs.org/doc/version.html) of generator-webapp at the time it was run.
/* Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %> */
//
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// **[Globbing](http://gruntjs.com/configuring-tasks#globbing-patterns)**
//
//     'test/spec/{,*/}*.js'
// `{}` is a comma separated list of patterns. `*` is any string not including '/'.
// So this matches empty string or a string of any length followed by /
// then a filename ending in ".js". In other words test/spec/someFile.js or test/spec/someFolder/someFile.js
// but not any further down.
//
//     'test/spec/**/*.js'
// `**` matches any number of characters, including /, as long as it's the only thing in a path part.
// That makes this a recursive search that will match all subfolders.
/**
 * *Globbing*
 * for performance reasons we're only matching one level down:
 * 'test/spec/{,* /}*.js'
 * use this if you want to match all subfolders:
 * 'test/spec/** /*.js'
 */
//The first part is the ["wrapper" function](http://gruntjs.com/getting-started#the-wrapper-function), which encapsulates your Grunt configuration.
module.exports = function (grunt) {
    // [matchdep](https://npmjs.org/package/matchdep) - You'll see many packages say to run
    // [grunt.loadNpmTasks](https://github.com/gruntjs/grunt/wiki/grunt.task#grunttaskloadnpmtasks-)('grunt-contrib-whatever'); in their instructions. This obviates the need for that.
    /* load all grunt tasks */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // These point to where your app lives (as opposed to tests and other code) and where you want build tasks to export to.
    /* configurable paths*/
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    // configures your tasks
    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true
            },
            coffee: {
                // <%%= comes out as <%= in the generated Gruntfile
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                /* change this to '0.0.0.0' to access the server from outside */
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (testFramework === 'mocha') { %>
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %>
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/<% if (includeRequireJS) { %>
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    /* `name` and `out` is set by grunt-usemin */
                    baseUrl: yeomanConfig.app + '/scripts',
                    optimize: 'none',
                    /**
                     * TODO: Figure out how to make sourcemaps work with grunt-usemin
                     * https://github.com/yeoman/grunt-usemin/issues/30
                     *generateSourceMaps: true,
                     * required to support SourceMaps
                     * http://requirejs.org/docs/errors.html#sourcemapcomments
                     */
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    /*uglify2: {} // https://github.com/mishoo/UglifyJS2 */
                }
            }
        },<% } else { %>
        /*
         * not enabled since usemin task does concat and uglify
         * check index.html to edit your build targets
         * enable this task if you prefer defining your build targets here
         */
        /*uglify: {
            dist: {}
        },*/<% } %>
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        /* Put files not handled in other tasks here */
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }<% if (includeRequireJS) { %>,
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
            }
        }<% } %>
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',<% if (testFramework === 'mocha') { %>
        'mocha'<% } else if (testFramework === 'jasmine') { %>
        'jasmine'<% } %>
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',<% if (includeRequireJS) { %>
        'requirejs',<% } %>
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
