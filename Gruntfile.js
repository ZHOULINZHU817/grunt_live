module.exports = function(grunt) {
  // 项目配置
  var _conf_all = {
    "main": {
      "my_src": "app",
      "my_dest": "publish_func"
    },
    "p1": {
      "my_src": "app_p1",
      "my_dest": "publish_func"
    },
    "activity": {
      "my_src": "app_activity/mama_0615",
      "my_dest": "publish_activity"
    }
  }
  var _conf = _conf_all["main"];


  grunt.initConfig({
    pkg: _conf,
    watch: {
      html: {
        files: ['<%= pkg.my_src %>/html/**/*.html']
      },
      scripts: {
        files: ['<%= pkg.my_src %>/resource/js/**/*.js']
      },
      styles: {
        files: ['<%= pkg.my_src %>/resource/css/**/*.css']
      },
      images: {
        files: ['<%= pkg.my_src %>/resource/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
      },
      // livereload: {
      //   options: {
      //     livereload: 35730
      //   },
      //   files: [
      //     '<%= pkg.my_src %>/html/**/*.html',
      //     '<%= pkg.my_src %>/resource/js/**/*.js',
      //     '<%= pkg.my_src %>/resource/css/**/*.css',
      //     '<%= pkg.my_src %>/resource/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
      //   ]
      // }
    },
    'string-replace': {
      example1: {
        files: [{
          expand: true,
          cwd: '<%= pkg.my_dest %>/css',
          src: '**/*.css',
          dest: '<%= pkg.my_dest %>/css',
          overwrite: true
        }],
        options: {
          replacements: [{
            pattern: /\/resource\/img\//g,
            replacement: './../../img/',
            overwrite: true
          }]
        }
      },
      example2: {
        files: [{
          expand: true,
          cwd: '<%= pkg.my_dest %>/js',
          src: '**/*.js',
          dest: '<%= pkg.my_dest %>/js',
          overwrite: true
        }],
        options: {
          replacements: [{
            pattern: /\/resource\/img\//g,
            replacement: './../../img/',
            overwrite: true
          }]
        }
      },
    },
    autoprefixer: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.my_src %>/resource/css',
          src: '**/*.css',
          dest: '<%= pkg.my_dest %>/css',
          overwrite: true
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        // livereload: 35729 //声明给 watch 监听的端口
      },
      server: {
        options: {
          open: true, //自动打开网页 http://
          base: ['<%= pkg.my_src %>'] //主目录
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['<%= pkg.my_dest %>']
        }]
      },
      server: '<%= pkg.my_dest %>/js/lib'
    },
    uglify: {
      options: {
        banner: '/*frame by Ella Liu*/'
      },
      my_target: {
        files: [{
          expand: true,
          cwd: '<%= pkg.my_src %>/resource/js',
          src: '**/*.js',
          dest: '<%= pkg.my_dest %>/js'
        }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['<%= pkg.my_dest %>/js/lib/*.js'],
        dest: '<%= pkg.my_dest %>/js/libs/libs.js'
      }
    },
    cssmin: {
      options: {
        banner: '/*frame by Ella Liu*/'
      },
      compress: {
        files: [{
          expand: true,
          cwd: '<%= pkg.my_dest %>/css',
          src: '**/*.css',
          dest: '<%= pkg.my_dest %>/css'
        }]
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 8,
        pngquant: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.my_src %>/resource/img',
          src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
          dest: '<%= pkg.my_dest %>/img'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        node: true
      },
      globals: {
        exports: true
      }
    }
  })

  // 加载任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // 默认任务
  grunt.registerTask('res', ['uglify', 'concat', 'clean', 'cssmin']);
  grunt.registerTask('img', ['imagemin']);
  grunt.registerTask('res.all', ['clean', 'uglify', 'concat', 'cssmin', 'imagemin', 'clean:server']);

  grunt.registerTask('replace', ['string-replace']);

  grunt.registerTask('build', function(target) {
    if (target) {
      grunt.log.writeln(_conf_all[target]);
      _conf.my_src = _conf_all[target].my_src;
      _conf.my_dest = _conf_all[target].my_dest;
      grunt.log.writeln(_conf.my_src);
    }
    grunt.task.run(['clean', 'uglify', 'concat', 'autoprefixer', 'cssmin', 'imagemin', 'clean:server', 'string-replace']);
  });

  grunt.registerTask('live', function(target) {
    if (target) {
      grunt.log.writeln(_conf_all[target]);
      _conf.my_src = _conf_all[target].my_src;
      _conf.my_dest = _conf_all[target].my_dest;
      grunt.log.writeln(_conf.my_src);
    }
    grunt.task.run(['connect', 'watch']);

  });


}