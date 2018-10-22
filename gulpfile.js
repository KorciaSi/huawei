// gulp 的插件;

// 1. http插件; (服务器插件);
// gulp connect;

const gulp = require("gulp");
// gulp 服务器插件;
const connect = require("gulp-connect");
// gulp 合并插件;
var concat = require('gulp-concat');
// gulp 压缩插件;
var uglify = require("gulp-uglify");
// babel 插件;
var babel = require("gulp-babel");
// css 插件;
var cleanCss = require("gulp-clean-css");
// sass 编译插件;
var sass = require("gulp-sass-china");


gulp.task('connect', function() {
    connect.server({
        port:8888,
        root:"dist/",
        livereload:true,
        // 中间件;
        middleware:function(connect , opt){
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
});
// 如何发起一个代理请求 : 
// localhost:8888/proxy/目标;

gulp.task("html", ()=>{
    return gulp.src("*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());;
})

gulp.task("watch", ()=>{
    gulp.watch("index.html",["html","sass"]);
    gulp.watch("sass/*.scss",["html","sass"]);
})

gulp.task("default",["watch","connect"]);

// script 转存指令;

gulp.task("script", ()=>{
    return gulp.src(["js/*.js"])
    .pipe(gulp.dest("dist/js"));
})

gulp.task("css", ()=>{
    return gulp.src(["css/*.css"])
           .pipe(cleanCss())
           .pipe(gulp.dest("dist/css"))
})

gulp.task("sass", () =>{
    return gulp.src(["sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("dist/css"))
})

// 编译 ? es6 => es5;

gulp.task("es6",()=>{
    return gulp.src("script/es2015/es6.js")
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest("dist/script"));
})