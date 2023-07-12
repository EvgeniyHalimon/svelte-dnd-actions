import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const OAUTH_PROVIDERS = ['google', 'github'];

export const actions: Actions = {
	register: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: 'Provider not supported.'
				});
			}
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
				provider: provider
			});

			if (err) {
				console.log(err);
				return fail(400, {
					message: 'Something went wrong.'
				});
			}

			throw redirect(303, data.url);
		}

		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string,
			options: {
				data: {
					name: body.username as string
				}
			}
		});

		if (data?.user?.identities?.length === 0) {
			throw redirect(303, '/exist');
		}
		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(err.status, {
					error: err.message
				});
			}
			return fail(500, {
				error: err.message
			});
		} else {
			throw redirect(303, '/confirm');
		}
	}
};

export async function load({ locals }) {
	if ((await locals.getSession()) !== null) {
		throw redirect(302, '/dashboard');
	}
}
