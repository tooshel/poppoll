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
	let hideButtons = false;
	
	function editModal(index, oldname) {
		editIndex = index;
		editName = oldname;
		console.log('editModal', index, oldname);
		showModal = true;
	}

	function editPollNameModal() {
		editIndex = -1;
		editName = $bardata.pollname;
		console.log('editPollNameModal', editName);
		showModal = true;
	}
	
	function toggleButtons() {
		hideButtons = !hideButtons;
		console.log('Buttons hidden:', hideButtons);
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

<div class="navbar navbar-dark bg-dark shadow-sm">
	<div class="container">
		<a href="/" class="navbar-brand d-flex align-items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				aria-hidden="true"
				class="me-2"
				viewBox="0 0 24 24"
				><path
					d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
				/><circle cx="12" cy="13" r="4" /></svg
			>
			<strong on:dblclick={toggleButtons} style="cursor: pointer;" title="Double-click to toggle buttons">{$bardata.pollname || 'Pop Poll'}</strong>
			<button type="button" class="btn btn-sm btn-outline-light ms-2" class:hidden={hideButtons} on:click={editPollNameModal}
				><Pencil />
			</button>
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarHeader"
			aria-controls="navbarHeader"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
	</div>
</div>

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
								dy=".3em">{$bardata.datasets?.[0]?.data?.[index] || ''}</text
							></svg
						>
						<div class="card-body">
							<!-- <p class="card-text"><strong>{name}</strong></p> -->
							<h5><strong>{name}</strong></h5>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<button
										type="button"
										class="btn btn-sm btn-outline-primary btn-space"
										class:hidden={hideButtons}
										on:click={() => bardata.vote(index)}>Vote!</button
									>
									<button
										type="button"
										class="btn btn-sm btn-outline-secondary btn-space"
										class:hidden={hideButtons}
										on:click={() => bardata.clearVotes(index)}><EraserFill /></button
									>
									<button
										data-id={index}
										type="button"
										class="btn btn-sm btn-outline-secondary btn-space"
										class:hidden={hideButtons}
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
					class:hidden={hideButtons}
					on:click={bardata.create}>Add</button
				>
				<button
					type="button"
					class="btn btn-outline-secondary btn-space m-1"
					class:hidden={hideButtons}
					on:click={bardata.remove}>Remove</button
				>
			</div>
			<div class="col-4">
				<button
					type="button"
					class="btn btn-outline-secondary m-1"
					class:hidden={hideButtons}
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
