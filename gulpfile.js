const { src, dest, watch, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//
const webp = require('gulp-webp');

function css( done ) {
    src('src/sass/app.scss') // Identificar el archivo principal
        .pipe( sass() ) // Compilar SASS
        .pipe( dest('build/css') ) // Exportarlo o guardarlo en una ubicación
    done();
}

function cssbuild( done ) {
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html']
        }))
        .pipe( dest('build/css'))

    done();
}

function versionWebp() {
    return src("src/img/**/*")
        .pipe(webp())
        .pipe(dest('build/img'))
}


function dev( done ) {
    watch('src/sass/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;
exports.webp = versionWebp;
exports.default = series( css, dev, versionWebp );
exports.build = series( cssbuild );