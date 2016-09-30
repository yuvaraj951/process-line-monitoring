/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({

        clean: ["dist"],

        copy: {
            src_to_dist: {
                cwd: 'src',
                expand: true,
                src: ['**/*', '!**/*.js', '!**/*.scss'],
                dest: 'dist'
            },
            img_to_dist: {
                cwd: 'src',
                expand: true,
                src: ['img/*'],
                dest: 'dist/src/'
            },
            pluginDef: {
                expand: true,
                src: ['plugin.json', 'README.md'],
                dest: 'dist',
            }
        },

        watch: {
            rebuild_all: {
                files: ['src/**/*', 'plugin.json'],
                tasks: ['default'],
                options: { spawn: false }
            },
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ["es2015"],
                plugins: ['transform-es2015-modules-systemjs', "transform-es2015-for-of"],
            },
            dist: {
                files: [{
                    cwd: 'src',
                    expand: true,
                    src: ['*.js'],
                    dest: 'dist',
                    ext: '.js'
                }]
            },
        },

    });

    grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:img_to_dist', 'copy:pluginDef', 'babel']);
};