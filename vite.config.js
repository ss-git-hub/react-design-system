import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgLoader()],
	css: {
		preprocessorOptions: {
			sass: {
				additionalData: `@import "src/styles/variables.scss";`,
			},
		},
		includePaths: ['src'],
	},
	test: {
		environment: 'jsdom',
		setupFiles: './setupTests.ts',
	},
	esbuild: {
		formatOptions: {
			prettier: true,
		},
	},
});
