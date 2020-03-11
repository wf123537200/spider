/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const pkg = require('../package.json');

module.exports = () => ({
  // The list of plugins for PostCSS https://github.com/postcss/postcss
  plugins: [
    // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width:
    // 30em); https://github.com/postcss/postcss-custom-media
    require('postcss-custom-media')(),
    // W3C color() function, e.g. div { background: color(red alpha(90%)); }
    // https://github.com/postcss/postcss-color-function
    require('postcss-color-function')(),
    // Add vendor prefixes to CSS rules using values from caniuse.com
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({flexbox: 'no-2009'})
  ]
});
