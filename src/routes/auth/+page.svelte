<script lang="ts">
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;
	let username: string;
</script>

<h1>Register</h1>
<form
	action="?/register"
	method="POST"
	class="flex flex-col gap-3 m-auto w-72 p-3 border-sky-200 border-2 rounded-sm"
>
	<label for="email">Username</label>
	<input
		name="username"
		id="username"
		bind:value={username}
		class="text-black caret-black rounded-md h-8 pl-1"
	/>
	<label for="email">Email</label>
	<input
		name="email"
		id="email"
		bind:value={email}
		class="text-black caret-black rounded-md h-8 pl-1"
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={password}
		class="text-black caret-black rounded-md h-8 pl-1"
	/>
	<button type="submit" class="p-2 rounded-md self-end bg-blue-600">Sign up</button>
</form>
