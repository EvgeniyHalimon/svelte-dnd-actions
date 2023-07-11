<script lang="ts">
	export let form;
	let password = '';
	let email = '';
</script>

<main>
	<form
		action="?/login"
		method="POST"
		class="flex flex-col gap-3 m-auto w-72 p-3 border-sky-200 border-2 rounded-sm"
	>
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
		<button type="submit" class="btn btn-primary">Login</button>
	</form>
</main>
