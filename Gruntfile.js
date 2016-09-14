module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            sass: {
                files: "./src/scss/*.scss",
                tasks: ["sass"]
            }
        },
        sass: {
            dev: {
                files: {
                    "./src/css/styles.css": "./src/scss/styles.scss"
                }
            }
        },
        browserSync: {
            default: {
                bsFiles: {
                    src: [
                        "./src/css/*.css",
                        "./src/*.html",
                        "./src/js/*.js"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./src"
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");

    grunt.registerTask("dev", ["browserSync", "watch"]);

};
