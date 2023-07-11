<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;
	let username: string;


	const signInWithProvider = async (provider: Provider) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider
		});
	};

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				await signInWithProvider('google');
				break;
			case 'discord':
				await signInWithProvider('discord');
				break;
			case 'github':
				await signInWithProvider('github');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<div class="flex flex-col gap-3 m-auto w-[500px] p-3 border-sky-200 border-2 rounded-sm">


<form
	action="?/register"
	method="POST"
	class="flex flex-col gap-3"
>
	<label for="email">Username</label>
	<input
		name="username"
		id="username"
		bind:value={username}
		class="text-black caret-black rounded-md h-8 pl-1 bg-gray-400 formInput"
	/>
	<label for="email">Email</label>
	<input
		name="email"
		id="email"
		bind:value={email}
		class="text-black caret-black rounded-md h-8 pl-1 bg-gray-400 formInput"
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={password}
		class="text-black caret-black rounded-md h-8 pl-1 bg-gray-400 formInput"
	/>
	<button type="submit" class="p-2 rounded-md self-center bg-blue-600">Sign up</button>
	
</form>
<form method="POST" use:enhance={submitSocialLogin} class="flex justify-evenly">
	<button formaction="?/login&provider=github" class="p-2 rounded-md border-blue-600 border-2 bg-transparent hover:bg-blue-900 trasition-all duration-300">Github</button>
	<button formaction="?/login&provider=google" class="p-2 rounded-md border-blue-600 border-2 bg-transparent hover:bg-blue-900 trasition-all duration-300">Google</button>
</form>
</div>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>