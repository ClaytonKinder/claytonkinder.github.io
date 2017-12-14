'use strict';

if (module.hot) {
  module.hot.accept();
}

require('smoothscroll-polyfill').polyfill();
import 'babel-polyfill';
import '../styles/index.scss';
window.imagesLoaded = require('imagesloaded');
import anime from 'animejs';
window.anime = anime;
require('./main.js');
require('./app.js');
