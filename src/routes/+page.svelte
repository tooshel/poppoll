<script>
	// import Chart from '../components/chart.svelte';
	import { onMount } from 'svelte';
	import { Bar } from 'svelte-chartjs';
	import { Pie } from 'svelte-chartjs';
	import { bardata } from '$lib/stores/data';
	import { Pencil, EraserFill } from 'svelte-bootstrap-icons';

	import EditModal from '../components/edit.svelte';
	let showModal = false;

	import Chart from 'chart.js/auto';
	// import {
	// 	Chart as ChartJS,
	// 	Title,
	// 	Tooltip,
	// 	Legend,
	// 	BarElement,
	// 	CategoryScale,
	// 	LinearScale
	// } from 'chart.js';
	// Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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

	function getColors(index) {
		if (index > 5) {
			return {
				background: '#55595c',
				foreground: '#eceeef'
			};
		}

		return {
			background: $bardata.datasets[0].backgroundColor[index],
			foreground: $bardata.datasets[0].borderColor[index]
		};
	}

	export let chartStyle;

	function setChart(chartSelection) {
		console.log('setChart', chartSelection);
		chartStyle = chartSelection;
	}

	function getChart() {
		if (chartStyle == 'baronly') {
			return {
				width: '12',
				showPie: false
			};
		}
		return {
			width: '8',
			showPie: true
		};
	}
</script>

<svelte:head>
	<title>Pop Poll</title>
</svelte:head>

<EditModal bind:showModal bind:editIndex bind:editName>
	<h2 slot="header">
		<em>Update Name</em>
	</h2>
</EditModal>
<div class="album py-5 bg-body-tertiary">
	<div class="container">
		<div class="row row-cols-4 mb-5 g-3">
			<div class="col-{getChart().width}" id="barChart">
				{#if $bardata.loaded}
					<Bar data={$bardata} options={{ responsive: true }} />
				{/if}
			</div>
			{#if getChart().showPie}
				<div class="col-4" id="pieChart">
					{#if $bardata.loaded}
						<Pie data={$bardata} options={{ responsive: true }} />
					{/if}
				</div>
			{/if}
		</div>

		<div
			class="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-{$bardata.labels
				.length} row-cols-xl-{$bardata.labels.length} g-3"
		>
			<!-- {#each titles as name, index} -->
			{#each $bardata.labels as name, index}
				<div class="col">
					<div class="card shadow-sm">
						<svg
							class="bd-placeholder-img card-img-top"
							width="100%"
							height="200"
							xmlns="http://www.w3.org/2000/svg"
							role="img"
							aria-label="Placeholder: Thumbnail"
							preserveAspectRatio="xMidYMid slice"
							focusable="false"
							><title>Placeholder</title><rect
								width="100%"
								height="100%"
								fill={getColors(index).background}
							/><text
								id="id-button1"
								x="50%"
								y="50%"
								fill={getColors(index).foreground}
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
										class="btn btn-sm btn-outline-primary btn-space"
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

		<div class="row mt-4">
			<div class="col-4">
				<button
					type="button"
					class="btn btn-outline-secondary btn-space m-1"
					on:click={bardata.create}>Add</button
				>
				<button
					type="button"
					class="btn btn-outline-secondary btn-space m-1"
					on:click={bardata.remove}>Remove</button
				>
			</div>
			<div class="col-4">
				<button
					type="button"
					class="btn btn-outline-secondary m-1"
					on:click={bardata.loadSampleData}>Sample</button
				>
			</div>
			<!-- <div class="col-4">
				<button
					type="button"
					class="btn btn-outline-secondary m-1"
					on:click={() => setChart('baronly')}>Bar Only</button
				>
				<button
					type="button"
					class="btn btn-outline-secondary m-1"
					on:click={() => setChart('both')}>Both</button
				>
			</div> -->
		</div>
	</div>
</div>
