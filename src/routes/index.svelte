<script context="module">
	export const prerender = true;
</script>

<script>
	import { toggleService } from '/src/machines/toggleMachine.js';
	$: toggleState = $toggleService.matches('inactive') ? 'Off' : 'On';

	const toggle = () => {
		toggleService.send('TOGGLE');
	};
</script>

<section>
	<h1>Sean's Portfolio</h1>
	<h3>Comming soon</h3>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
