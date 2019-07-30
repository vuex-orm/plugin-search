const path = require('path')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  umdDev: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-search.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-search.min.js'),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-search.common.js'),
    format: 'cjs'
  },
  esm: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-search.esm.js'),
    format: 'es'
  }
}

function genConfig (opts) {
  return {
    input: {
      input: opts.input,

      plugins: [
        nodeResolve(),
        commonjs()
      ],

      onwarn (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') {
          return
        }

        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        }

        console.error(warning.message)
      }
    },

    output: {
      name: 'VuexORMSearch',
      file: opts.file,
      format: opts.format
    }
  }
}

function mapValues (obj, fn) {
  const res = {}

  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })

  return res
}

module.exports = mapValues(configs, genConfig)
