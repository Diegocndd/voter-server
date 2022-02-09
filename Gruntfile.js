module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: ['src/database/*js', 'src/middlewares/*js', 'src/utils/*js', 'src/services/*js', 'src/utils/*js'],
                dest: 'build/script.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
}