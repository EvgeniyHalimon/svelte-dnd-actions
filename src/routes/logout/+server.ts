import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const { error: err } = await locals.supabase.auth.signOut();
	console.log('🚀 ~ file: +server.ts:6 ~ constPOST:RequestHandler= ~ err:', err);

	if (err) {
		throw error(500, 'Something went wrong logging you out.');
	}

	throw redirect(303, '/');
};
