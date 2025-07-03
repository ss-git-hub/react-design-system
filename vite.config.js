import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
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
});
