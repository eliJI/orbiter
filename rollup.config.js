import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
    input: './src/index.ts',
    output: {
        file: './build/bundle.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [nodePolyfills(), commonjs(), typescript(), nodeResolve()]
}