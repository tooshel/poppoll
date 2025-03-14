import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/poppoll' : ''
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Don't fail the build when a path doesn't match the base path
				if (message.includes('does not begin with `base`')) {
					console.warn(`Warning: ${message}`);
					return;
				}
				// Otherwise fail the build
				throw new Error(message);
			}
		}
	},

	preprocess: [vitePreprocess({})]
};

export default config;
