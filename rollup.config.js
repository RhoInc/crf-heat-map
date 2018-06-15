import babel from 'rollup-plugin-babel';

export default {
  input: './src/wrapper.js',
  output: {
    name: 'raveXplorer',
    file: './build/raveXplorer.js',
    format: 'umd',
    globals: {
      d3: 'd3',
      webcharts: 'webCharts',
      xlsx: 'xlsx'
    }
  },
  external: (function() {
    var dependencies = require('./package.json').dependencies;

    return Object.keys(dependencies);
  }()),
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['env',
          {
            'modules': false
          }
        ]
      ],
      plugins: [
        'external-helpers'
      ],
      babelrc: false
    })
  ]
}
