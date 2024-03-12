<script>
	// import Chart from '../components/chart.svelte';
	import { onMount } from 'svelte';
	import { Bar } from 'svelte-chartjs';
	// import { bardata as chartstore } from '$lib/stores/data';
	import { bardata } from '$lib/stores/data';
	import { Pencil, EraserFill } from 'svelte-bootstrap-icons';

	import EditModal from '../components/edit.svelte';
	let showModal = false;
	// import Chart from 'chart.js/auto';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	onMount(() => {
		bardata.loadSavedData();
		//chart.update();
		window.addEventListener('keypress', (event) => {
			if (event.key >= 1 && event.key <= 9) {
				bardata.vote(event.key - 1);
			}
		});
	});

	let editIndex;
	let editName;
	function editModal(index, oldname) {
		editIndex = index;
		editName = oldname;
		console.log('editModal', index, oldname);
		showModal = true;
	}
</script>

<svelte:head>
	<title>Pop Poll</title>
</svelte:head>

<div class="album py-5 bg-body-tertiary">
	<div class="container">
		{#if $bardata.loaded}
			<Bar data={$bardata} options={{ responsive: true }} />
			<!-- <Bar bind:chart {data} options={{ responsive: true }} /> -->
		{/if}

		<EditModal bind:showModal bind:editIndex bind:editName>
			<h2 slot="header">
				<em>Update Name</em>
			</h2>
		</EditModal>

		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
			<!-- {#each titles as name, index} -->
			{#each $bardata.labels as name, index}
				<div class="col">
					<div class="card shadow-sm">
						<svg
							class="bd-placeholder-img card-img-top"
							width="100%"
							height="225"
							xmlns="http://www.w3.org/2000/svg"
							role="img"
							aria-label="Placeholder: Thumbnail"
							preserveAspectRatio="xMidYMid slice"
							focusable="false"
							><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text
								id="id-button1"
								x="50%"
								y="50%"
								fill="#eceeef"
								font
								dy=".3em">{$bardata.datasets?.[0]?.data?.[index]}</text
							></svg
						>
						<div class="card-body">
							<p class="card-text">{name}</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button
										type="button"
										class="btn btn-sm btn-primary btn-space"
										on:click={() => bardata.vote(index)}>Vote!</button
									>
									<button
										type="button"
										class="btn btn-sm btn-outline-secondary btn-space"
										on:click={() => bardata.clearVotes(index)}><EraserFill /></button
									>
									<button
										data-id={index}
										type="button"
										class="btn btn-sm btn-outline-secondary btn-space"
										on:click={() => editModal(index, $bardata.labels[index])}
										><Pencil />
									</button>
								</div>
								<!-- <small class="text-body-secondary">9 mins</small> -->
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<button type="button" class="btn btn-primary btn-space m-1" on:click={bardata.create}
			>Add</button
		>
		<button type="button" class="btn btn-secondary btn-space m-1" on:click={bardata.remove}
			>Remove</button
		>
		<button type="button" class="btn btn-secondary m-1" on:click={bardata.loadSampleData}
			>Sample</button
		>
	</div>
</div>
