const fs = require('fs');
const path = require('path');

export default
  fs.readdirSync('src')
    .filter(f => f.endsWith('.bs.js'))
    .map(f => path.basename(f, '.bs.js'))
    .map(name => ({
      input: `src/${name}.bs.js`,
      output: {
        file: `bin/${name}.js`,
        format: 'cjs',
        banner: '#!/usr/bin/env node'
      }
    }));