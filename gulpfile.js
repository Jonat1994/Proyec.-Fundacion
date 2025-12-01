const { src, dest, watch, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//
const webp = require('gulp-webp');

function css() {
    return src('src/sass/app.scss') // Identificar el archivo principal
        .pipe( sass() ) // Compilar SASS
        .pipe( dest('build/css') ) // Exportarlo o guardarlo en una ubicación
        .pipe( dest('dist/css') ) // Copiar a dist para Netlify
}

function cssbuild() {
    return src('build/css/app.css', { allowEmpty: true })
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html', 'en/**/*.html']
        }))
        .pipe( dest('build/css'))
        .pipe( dest('dist/css'))
}

function versionWebp() {
    return src("src/img/**/*")
        .pipe(webp())
        .pipe(dest('build/img'))
        .pipe(dest('dist/img'))
}


function copyHtml() {
    return src(['*.html', 'en/**/*.html', 'json/**/*.json', 'build/**/*'], { base: '.' })
        .pipe(dest('dist'))
}


function dev( done ) {
    watch('src/sass/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;
exports.webp = versionWebp;
exports.default = series( css, dev, versionWebp );
exports.build = series( css, cssbuild, versionWebp, copyHtml );