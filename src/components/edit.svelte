<script>
	export let showModal; // boolean
	export let editIndex;
	export let editName;
	import { bardata } from '$lib/stores/data';
	import { _123 } from 'svelte-bootstrap-icons';

	let dialog; // HTMLDialogElement

	let closeModal = () => (showModal = false);

	let saveName = () => {
		if (isEditingPollName) {
			bardata.setPollName(dialog.querySelector('input').value);
			console.log('setPollName');
		} else {
			bardata.setName(editIndex, dialog.querySelector('input').value);
			console.log('setName');
		}
		closeModal();
	};

	$: if (dialog && showModal) dialog.showModal();
	$: isEditingPollName = editIndex === -1;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

<dialog bind:this={dialog} on:close={closeModal} on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header">
			<h2><em>{isEditingPollName ? 'Update Poll Name' : 'Update Name'}</em></h2>
		</slot>
		<hr />
		<slot />
		<form method="dialog">
			<label for="personname">Name</label>
			<input type="text" name="personname" id="personname" value={editName} />
			<button type="submit" on:click={saveName}>Save</button>
		</form>
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>cancel</button>
	</div>
</dialog>

<style>
	dialog {
		min-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	/* button {
		display: block;
	} */
</style>
