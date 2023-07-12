import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if ((await locals.getSession()) === null) {
		throw redirect(302, '/login');
	}
}
