module.exports = (grunt) ->
  grunt.initConfig {
    pkg: grunt.file.readJSON 'package.json'

    meta:
      dist:
        path: 'dist/'
        jspath: '<%= meta.dist.path %>js/'
        csspath: '<%= meta.dist.path %>css/'
      dev: 
        jspath: 'js/'
        csspath: 'css/'
        imgpath: 'img/'
        fontpath: 'font/'
        staticpath: 'static/'
      banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'

    watch:
      less:
        files: ['<%= meta.dev.csspath %>*.less']
        tasks: ['less']
      coffee:
        files: ['<%= meta.dev.jspath %>*.coffee']
        tasks: ['coffee']

    coffee:
      files:
        src: '<%= meta.dev.jspath %><%= pkg.name %>.coffee'
        dest: '<%= meta.dev.jspath %><%= pkg.name %>.js'

    uglify: 
      dist: 
        options:
          banner: '<%= meta.banner %>'
          report: 'min'
        files:
          '<%= meta.dist.jspath %><%= pkg.name %>.js': ['<%= coffee.files.dest %>']

    less:
      options:
        paths: '<%= meta.dev.csspath %>'
      files: 
        src: '<%= meta.dev.csspath %><%= pkg.name %>.less'
        dest: '<%= meta.dev.csspath %><%= pkg.name %>.css'

    cssmin:
      dist:
        options:
          banner: '<%= meta.banner %>'
          report: 'min'
        files:
          '<%= meta.dist.csspath %><%= pkg.name %>.min.css': [ '<%= meta.dev.csspath %>/*.css', 
                                                            '!<%= meta.dev.csspath %><%= pkg.name %>.css', 
                                                            '<%= meta.dev.csspath %><%= pkg.name %>.css']

    targethtml:
      dist:
        files:
          '<%= meta.dist.path %>index.html': ['index.html']

    copy:
      img:
        files: [
          expand: true
          cwd: '<%= meta.dev.imgpath %>'
          src: ['*']
          dest: '<%= meta.dist.path %><%= meta.dev.imgpath %>'
          filter: 'isFile'
        ]
      staticFolder:
        files: [
          expand: true
          cwd: '<%= meta.dev.staticpath %>'
          src: ['*']
          dest: '<%= meta.dist.path %><%= meta.dev.staticpath %>'
          filter: 'isFile'
        ]
      fonts:
        files: [
          expand: true
          cwd: '<%= meta.dev.fontpath %>'
          src: ['*']
          dest: '<%= meta.dist.path %><%= meta.dev.fontpath %>'
          filter: 'isFile'
        ]
      static: 
        files: [
          expand: true
          src: ['404.html', 'MENTIONS-LEGALES']
          dest: '<%= meta.dist.path %>'
        ]
      vendorJs:
        files: [
          expand: true
          cwd: '<%= meta.dev.jspath %>'
          src: ['*.min.js', 'cycle.js']
          dest: '<%= meta.dist.jspath %>'
        ]

    clean:
      dist: ['<%= meta.dist.path %>']
  }

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-targethtml'

  grunt.registerTask 'dist', 'Compile and compress less and coffee files.', 
    ['clean:dist', 'less', 'cssmin', 'coffee', 'uglify', 'targethtml', 'copy']
  grunt.registerTask 'dev', 'Compile less and coffee files.', 
    ['less', 'coffee']
  grunt.registerTask 'default', 'dev'