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
                    '<%= config.app %>/styles/{,*/}*.css'
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
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>'
                    ]
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
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });

};