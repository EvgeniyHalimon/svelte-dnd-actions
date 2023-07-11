import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string,
			options: {
				data: {
					username: body.username as string
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
	if (await locals.getSession() !== null) {
		throw redirect(302, "/dashboard")
	}
}
