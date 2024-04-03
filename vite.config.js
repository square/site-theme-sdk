import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			// eslint-disable-next-line no-undef
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'SiteThemeSDK',
			fileName: 'index'
		},
		outDir: 'lib'
	},
	plugins: [
		dts(),
	],
	test: {
		chaiConfig: {
			truncateThreshold: 0
		},
		coverage: {
			provider: 'v8',
			lines: 100,
			functions: 100,
			branches: 100,
			statements: 100
		}
	}
});
