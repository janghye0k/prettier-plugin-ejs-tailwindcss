import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  ],
  external: ['prettier', 'prettier-plugin-tailwindcss'], // peerDependencies는 외부로 설정
  plugins: [nodeResolve(), commonjs(), terser()],
};
