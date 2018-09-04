var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();

gulp.task("autoprefixer", () =>
  gulp
    .src("./css/main.css")
    .pipe(
      autoprefixer({
        browsers: ["last 5 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./css"))
);

gulp.task("imagemin", () =>
  gulp
    .src("./img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./img"))
);

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("./sass/*.scss", ["sass"]);
  gulp.watch("./*.html", browserSync.reload);
  // Other watchers
});
