const gulp = require('gulp'), //присвоение переменной gulp
    sass = require('gulp-sass'), // присвоение переменной плагина gulp-sass
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    include = require('gulp-file-include'), //Инклюдит файлы html
    imagemin = require('gulp-imagemin'), //пережимает изображения
    recompress = require('imagemin-jpeg-recompress'); //тоже пережимает, но лучше. Плагин для плагина

// Таски (task) задания, которые выполняет gulp

//=============================================================================//


//Таск для scss
gulp.task('scss', function() { // Задание имени ('scss') таска и выполняющая функция
    return gulp.src('app/scss/**/*.scss') // Указывает путь к файлам scss ** - зайти во все папки в scss и найти там файлы с расширением .scss
        .pipe(sass({outputStyle:'compressed'})) // Применение задач из gulp-sass ко всем файлам .scss, что были найдены в src
        .pipe(autoprefixer({
            overRideBrowsers: ['last 8 versions']
        }))
        .pipe(rename({suffix: '.min'})) // Переименовывает файл добавляя к нему суффикс .min
        .pipe(gulp.dest('build/css')) // Указывает путь к папке, куда будут помещены скомпилированные .css файлы
        .pipe(browserSync.reload({stream: true})) // Обновляет старницу при изменении scss
});

gulp.task('scss-modules', function() { 
    return gulp.src('app/modules/**/*.scss') 
        .pipe(browserSync.reload({stream: true})) 
});

//Таск для объединения scss библиотек
gulp.task('css-libs', function() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css',
        // 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'//ситуативно
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss')) 
    .pipe(browserSync.reload({stream: true}))
});


//=============================================================================//
//Таск для html 
gulp.task('html', function() {
    return gulp.src(['app/**/*.html', '!app/modules/**/*.html'])
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({stream: true}))
}); 

gulp.task('html-modules', function() { 
    return gulp.src('app/modules/**/*.html') 
        .pipe(browserSync.reload({stream: true})) 
});


//=============================================================================//
//Таск для js
gulp.task('js', function() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        // 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
        // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
    ])
        .pipe(concat('libs.min.js')) //конкатенация файлов и добавление в файл libs.min.js
        .pipe(uglify()) //сжатие файла
        .pipe(gulp.dest('build/js')) //размещение файла в папке
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('minjs', function () { //минифицируем main.js и перекидываем в директорию build
    return gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(rename({
        suffix: '.min'
        }))
        .pipe(gulp.dest('build/js'))
});

gulp.task('script', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
}); 

//=============================================================================//
//Таск для пережатия картинок
gulp.task('images', function () { //пережимаем изображения и складываем их в директорию build
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
        // .pipe(imagemin([
        //     recompress({ //Настройки сжатия изображений. Сейчас всё настроено так, что сжатие почти незаметно для глаза на обычных экранах. Можете покрутить настройки, но за результат не отвечаю.
        //     loops: 4, //количество прогонок изображения
        //     min: 70, //минимальное качество в процентах
        //     max: 80, //максимальное качество в процентах
        //     quality: 'high' //тут всё говорит само за себя, если хоть капельку понимаешь английский
        //     }),
        //     imagemin.gifsicle(), //тут и ниже всякие плагины для обработки разных типов изображений
        //     imagemin.optipng(),
        //     imagemin.svgo()
        // ]))
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


//=============================================================================//
//Таск для создания дистрибутива (dist)
gulp.task('export', function() {
    const buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
    
    const buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    const buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    const buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));

    const buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

//Таск для удаления папки dist
gulp.task('clean', async function() {
    del.sync('dist');
});

//Объединение export и clean
gulp.task('build', gulp.series('clean', 'export'))

//=============================================================================//
//Таск для создания локального сервера (автоматическое обновление браузера)
gulp.task('browser-sync', function() {
    browserSync.init({ // Создаёт сервер
        server: { 
            baseDir: "build/" // Дирректория для сервера
        }
    });
});

//=============================================================================//
//Таск для слежения за изменениями
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss')) // Если watch замечает изменения(сохранение) в файлах .scss, то вполняется таск scss
    gulp.watch('app/modules/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/modules/**/*.html', gulp.parallel('html'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

//=============================================================================//
//Позволяет запускать несколько тасков одновременно
gulp.task('default', gulp.parallel('css-libs','scss','scss-modules','html-modules','html','js','minjs','images','browser-sync','watch'))