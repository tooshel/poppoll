/*
Many thanks to Drew (@aewing) for the original code and inspiration for this file. He submitted the first PR to this project https://github.com/tooshel/poppoll/pull/1/files and I only closed it after copying this file and then rewriting every other file to take advantage of this new store so that I would be forced to understand every line of code in the project and specifically how this file worked. 

It was also a Typescript file and as I was reading though it, the places I was most confused turned out to be because it was Typescript. It's really cool that with Svelte, you can mix and match TS and JS but I wanted to stick with just JS for this project.
*/
import { writable } from 'svelte/store';

export const samplebardata = [22, 1, 3, 5, 2, 2];
export const sampletitles = [
	'Ms. Williams',
	'Ms. Olsen\n(Principal)',
	'Ms. Bergeson\n(VP)',
	'Ms. Moffett',
	'Ms. Mulhearn',
	'Mr. W \n(counselor)'
];

const { set, subscribe, update } = writable({
	loaded: false,
	labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	datasets: [
		{
			label: 'Count of Votes',
			data: [],
			backgroundColor: [
				'rgba(255, 134,159,0.4)',
				'rgba(98,  182, 239,0.4)',
				'rgba(255, 218, 128,0.4)',
				'rgba(113, 205, 205,0.4)',
				'rgba(170, 128, 252,0.4)',
				'rgba(255, 177, 101,0.4)'
			],
			borderWidth: 4,
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

	setName(index, namevalue) {
		update(($data) => {
			if ($data.datasets[0].data[index] !== undefined) {
				console.log('bardata - changing the name for index:', index);
				$data.labels[index] = namevalue;
			} else {
				console.error('bardata - name index not found:', index);
			}
			bardata.persist();
			return $data;
		});
	},

	clearVotes(index) {
		update(($data) => {
			if ($data.datasets[0].data[index] !== undefined) {
				console.log('bardata - clearing votes for index:', index);
				$data.datasets[0].data[index] = 0;
			} else if (index === -1) {
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

			if (window?.localStorage.titles) {
				window?.localStorage.clear();
				bardata.loadSampleData();
				console.error('old bardata - loading sample data');
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
