import { writable } from 'svelte/store';

export const samplebardata = [22, 1, 3, 5, 2];
export const sampletitles = ['Ms. Olsen', 'Mr. W.', 'Mr. Kinder', 'Ms. Chapman', 'Ms. Hale'];

const { set, subscribe, update } = writable({
	loaded: false,
	labels: [],
	datasets: [
		{
			label: '% of Votes',
			data: [],
			backgroundColor: [
				'rgba(255, 134,159,0.4)',
				'rgba(98,  182, 239,0.4)',
				'rgba(255, 218, 128,0.4)',
				'rgba(113, 205, 205,0.4)',
				'rgba(170, 128, 252,0.4)',
				'rgba(255, 177, 101,0.4)'
			],
			borderWidth: 2,
			borderColor: [
				'rgba(255, 134, 159, 1)',
				'rgba(98,  182, 239, 1)',
				'rgba(255, 218, 128, 1)',
				'rgba(113, 205, 205, 1)',
				'rgba(170, 128, 252, 1)',
				'rgba(255, 177, 101, 1)'
			]
		}
	]
});

export const bardata = {
	set,
	subscribe,
	update,

	vote(index) {
		update(($data) => {
			if ($data.datasets[0].data[index] !== undefined) {
				console.log('bardata - voting for index:', index);
				$data.datasets[0].data[index] += 1;
			} else {
				console.error('bardata - vote index not found:', index);
			}
			bardata.persist();
			return $data;
		});
	},

	clearVotes(index) {
		update(($data) => {
			if (index && $data.datasets[0].data[index] !== undefined) {
				console.log('bardata - clearing votes for index:', index);
				$data.datasets[0].data[index] = 0;
			} else if (!index) {
				console.log('bardata - clearing all votes');
				$data.datasets[0].data = $data.datasets[0].data.map(() => 0);
			} else {
				console.error('bardata - clearVotes index not found:', index);
			}
			bardata.persist();
			return $data;
		});
	},

	create() {
		update(($data) => {
			console.log('bardata - creating new data');
			$data.labels.push('NEW');
			$data.datasets[0].data.push(0);
			bardata.persist();
			return $data;
		});
	},

	remove(index = -1) {
		update(($data) => {
			if (index > -1) {
				console.log(`bardata - removing index: ${index}`);
				$data.labels.splice(index, 1);
				$data.datasets[0].data.splice(index, 1);
			} else {
				console.error('bardata - removing most recent index');
				$data.labels.pop();
				$data.datasets[0].data.pop();
			}
			bardata.persist();
			return $data;
		});
	},

	loadSampleData() {
		update(($data) => {
			console.log('bardata - loading sample data');
			$data.labels = sampletitles;
			$data.datasets[0].data = samplebardata;
			return $data;
		});
	},

	persist() {
		update(($data) => {
			if (typeof window !== 'undefined') {
				console.info('bardata - persisting data', $data);
				window?.localStorage.setItem('bardata', JSON.stringify($data));
			}
			return $data;
		});
	},

	loadSavedData() {
		update(($data) => {
			if (!window?.localStorage) {
				console.error('bardata - no local storage available');
				return $data;
			}

			const savedData = window.localStorage.getItem('bardata');
			if (savedData) {
				console.log('bardata - loaded saved data', savedData);
				const parsedData = JSON.parse(savedData);
				$data = parsedData;
			} else {
				bardata.loadSampleData();
				console.error('bardata - no saved data found');
			}
			$data.loaded = true;
			return $data;
		});
	}
};

export default bardata;
