import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

const defaultPlugins = [
  nodeResolve(),
  commonjs(),
  typescript(),
  // babel({ babelHelpers: 'bundled' }),
];

export default defineConfig([
  {
    input: 'src/vg-shortcuts.ts',
    output: {
      name: 'vg-shortcuts',
      file: 'build/vg-shortcuts.js',
      format: 'umd',
    },
    plugins: [...defaultPlugins],
  },
]);
