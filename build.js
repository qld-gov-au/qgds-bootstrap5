// PROJECT ESBUILD CONFIGURATION and BUILD FILE
import * as esbuild from 'esbuild';
import * as path from 'path';

//Required libraries
import {sassPlugin} from 'esbuild-sass-plugin';
import handlebarsPlugin from "esbuild-plugin-handlebars";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { copy } from 'esbuild-plugin-copy';

// Configuration
// https://esbuild.github.io/getting-started/#build-scripts

const buildConfig = {
	outdir: './dist/',
	external: ['fs', 'path', "../img/*"],
	entryPoints: [
		{ out: './assets/js/bootstrap.min', in: './node_modules/bootstrap/dist/js/bootstrap.js' },
		{ out: './assets/js/main', in: './src/main.js' },
		{ out: './assets/css/qld.bootstrap', in: './src/main.scss' },
  	],
  	bundle: true,
  	minify: false,
	loader: {
		'.html' : 'text',
		'.js': 'jsx',
		'.jpg': 'file',
	},
	target: ['es6'],
  	plugins: [
		//Pass the following plugins to ESBuild to help with compiling
		// SASS processing, includes POSTCSS
		sassPlugin({
			type: 'css',
			async transform(source) {
				const { css } = await postcss([autoprefixer]).process(source, { 
					from: 'src/main.scss', 
					to: 'dist/assets/css/qld.bootstrap.css', 
					map: true
				});
				return css;
			},
		}),
		// Handlebars processing
		handlebarsPlugin(),

		// 1. Copy various files from /src to /dist as part of workflow.
		// 2. Copy files from /dist to /docs as part of workflow. 
		copy({
			// this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
			// if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
			resolveFrom: 'cwd',
			assets: [
				{
			  		from: ['./src/templates/*.html'],
			  		to: ['./dist/'],
				},
				{
					from: ['./src/components/**/*.dxp.html'],
					to: ['./dist/components/dxp/'],
			  	},
				{
					from: ['./src/components/**/*.bs5.html'],
					to: ['./dist/components/bs5/'],
			  	},
				{
					from: ['./src/components/**/*.hbs.html'],
					to: ['./dist/components/dxp/'],
			  	},
				{
					from: ['./src/img/*'],
					to: ['./dist/assets/img'],
				},
				{
					from: ['./dist/**/*'],
					to: ['./docs/'],
				}
			],
			watch: true,
		}),
  	]
};

// Call esbuild's build() function with our configuration
// This is the default project build function, it runs when we call "node build.js", or "npm run build" 
(async () => {
	await esbuild.build(buildConfig);
	console.log('⚡ Build successful ⚡');
})();