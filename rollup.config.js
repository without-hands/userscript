import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import metablock from 'rollup-plugin-userscript-metablock';
import pkg from './package.json';

const defaultPlugins = [
  nodeResolve({
    browser: true,
    preferBuiltins: true,
  }),
  commonjs(),
  typescript(),
];

/**
 * @type {import('rollup-plugin-userscript-metablock').Options}
 */
const commonMetablock = {
  file: null,
  override: {
    version: pkg.version,
    homepage: pkg.homepage,
    author: pkg.author,
    license: pkg.license,
  },
  manager: 'compatible',
  validator: 'error',
};

export default defineConfig([
  {
    input: 'src/vg-shortcuts.ts',
    output: {
      name: 'vg-shortcuts',
      file: 'build/vg-shortcuts.user.js',
      format: 'umd',
    },
    plugins: [
      ...defaultPlugins,
      metablock({
        ...commonMetablock,
        override: {
          ...commonMetablock.override,
          name: 'ViperGirls Shortcuts',
          description: 'Useful keyboard shortcuts to navigate threads',

          'run-at': 'document-idle',
          include: 'https://vipergirls.to/threads/*',
          grant: ['GM_setValue', 'GM_getValue', 'GM_deleteValue', 'GM_log', 'GM.xmlHttpRequest'],
        },
      }),
    ],
  },
]);
