import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js', // 엔트리 파일
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS 출력
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.esm.js', // ESM 출력
      format: 'esm',
    },
  ],
  external: ['prettier', 'prettier-plugin-tailwindcss'], // peerDependencies는 외부로 설정
  plugins: [
    nodeResolve(), // Node.js 모듈 해석
    commonjs(), // CommonJS 모듈 변환
    terser(), // 코드 압축
  ],
};
