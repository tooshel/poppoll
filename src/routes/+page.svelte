<script>
    // import Chart from '../components/chart.svelte';
    import { onMount } from 'svelte';
    
    const samplebardata = [22, 1, 3, 5, 2];
    const sampletitles = ['Mr Smith', 'Mrs. Krabapple', 'Miss Hoover', 'Principle Skinner', 'Maya'];

    export let bardata = [22, 1, 3, 5, 2];
    export var titles = ['Mr Smith', 'Mrs. Krabapple', 'Miss Hoover', 'Principle Skinner', 'Maya'];

    import { Bar } from 'svelte-chartjs';
    import { data } from '../components/data.js';
  
    data.datasets[0].data = bardata;
    data.labels = titles;

    import {
      Chart,
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale,
    } from 'chart.js';
  
    Chart.register(
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale
    );


    function newvote(index) {
        console.log('newvote', index);
        bardata[index] = bardata[index] + 1;
        data.datasets[0].data = bardata;
        bardata = bardata;
    }

    function clearvotes(index) {
        console.log('clearvotes', index);
        data.datasets[0].data = bardata;
        bardata[index] = 0;
        bardata = bardata;
    }

    var count = 0;

    function addnew() {
        console.log('addnew');
        titles.push('NEW');
        bardata.push(0);
        data.datasets[0].data = bardata;
        data.labels = titles;
        titles = titles;
        bardata = bardata;
    }

    function remove() {
        console.log('remove');
        titles.pop();
        bardata.pop();
        titles = titles;
        bardata = bardata;
    }

    function loadsample() {
        console.log('load sample data');
        bardata = structuredClone(samplebardata);
        titles = structuredClone(sampletitles);
        data.datasets[0].data = bardata;
        data.labels = titles;
        console.log('load sample data', samplebardata, sampletitles, bardata, titles);
    }

    onMount(() => {
        window.addEventListener("keypress", (event) => {
            if (event.key >= 1 && event.key <= 9) {
                newvote(event.key);
            }
        });
    });

</script>

<svelte:head>
	<title>Pop Poll</title>
</svelte:head>


<div class="album py-5 bg-body-tertiary">
    <div class="container">

        <Bar {data} options={{ responsive: true }} />

        <!-- {@debug(titles)} -->

       <button on:click={() => (count += 1)}>
            count: {count}
        </button>

       <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
            {#each titles as name, index}
                    <div class="col">
                        <div class="card shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text id="id-button1" x="50%" y="50%" fill="#eceeef" font dy=".3em">{bardata[index]}</text></svg>
                            <div class="card-body">
                            <p class="card-text">{name}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-primary btn-space votebutton" on:click={() => newvote(index)}>Vote!</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary clearbutton" on:click={() => clearvotes(index)}>Clear</button>
                                    </div>
                                    <!-- <small class="text-body-secondary">9 mins</small> -->
                                </div>
                            </div>
                        </div>
                    </div>
            {/each}
        </div>

        <button type="button" class="btn btn-primary btn-space m-1" on:click={addnew}>Add</button>
        <button type="button" class="btn btn-primary btn-space m-1" on:click={remove}>Remove</button>
        <button type="button" class="btn btn-primary btn-space m-1" on:click={loadsample}>Sample</button>



  </div>

</div>


  
