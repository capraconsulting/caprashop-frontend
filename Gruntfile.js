module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            app: 'app'
        },
        watch: {
            styles: {
                files: [
                    '<%= config.app %>/styles/{,*/}*.css'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/styles/{,*/}*.css',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            proxies: [{
                context: '/rest', // the context of the data service
                host: 'localhost', // wherever the data service is running
                port: 8080 // the port that the data service is running on
            }],
            livereload: {
                options: {
                    open: true
                },
                middleware: function (connect, options) {
                    var middlewares = [];

                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }

                    // Setup the proxy
                    middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

                    // Serve static files
                    options.base.forEach(function(base) {
                        middlewares.push(connect.static(base));
                    });

                    return middlewares;
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.'
                    ]
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        protractor: {
            options: {
                keepAlive: true,
                configFile: "protractor.conf.js"
            },
            run: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');



    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
    grunt.registerTask('unit', ['karma']);
    grunt.registerTask('e2e', [
        'connect:test',
        'protractor:run'
    ]);
};