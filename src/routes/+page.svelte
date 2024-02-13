<script>

    var bardata = [22, 1, 3, 5, 2, 33];

    import Chart from '../components/chart.svelte';

</script>

<svelte:head>
	<title>Pop Poll</title>
</svelte:head>


<div class="album py-5 bg-body-tertiary">
    <div class="container">

  

       <Chart />


      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text id="id-button1" x="50%" y="50%" fill="#eceeef" font dy=".3em">4</text></svg>
            <div class="card-body">
              <p class="card-text">Mr Smith</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" data-buttonnumber="1" class="btn btn-sm btn-primary btn-space votebutton">Vote!</button>
                    <button type="button" data-buttonnumber="1" class="btn btn-sm btn-outline-secondary clearbutton">Clear</button>
                </div>
                <!-- <small class="text-body-secondary">9 mins</small> -->
              </div>
            </div>
          </div>
        </div>



        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text id="id-button2" x="50%" y="50%" fill="#eceeef" dy=".3em">0</text></svg>
            <div class="card-body">
              <p class="card-text">Mrs. Krabapple</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" data-buttonnumber="2" class="btn btn-sm btn-primary btn-space votebutton">Vote!</button>
                    <button type="button" data-buttonnumber="2" class="btn btn-sm btn-outline-secondary clearbutton">Clear</button>
                </div>
                <!-- <small class="text-body-secondary">9 mins</small> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text id="id-button3" x="50%" y="50%" fill="#eceeef" dy=".3em">0</text></svg>
            <div class="card-body">
              <p class="card-text">Miss Hoover</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" data-buttonnumber="3" class="btn btn-sm btn-primary btn-space votebutton">Vote!</button>
                    <button type="button" data-buttonnumber="3" class="btn btn-sm btn-outline-secondary clearbutton">Clear</button>
                </div>
                <!-- <small class="text-body-secondary">9 mins</small> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text  id="id-button4" x="50%" y="50%" fill="#eceeef" dy=".3em">0</text></svg>
            <div class="card-body">
              <p class="card-text">Principle Skinner</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" data-buttonnumber="4" class="btn btn-sm btn-primary btn-space votebutton">Vote!</button>
                    <button type="button" data-buttonnumber="4" class="btn btn-sm btn-outline-secondary clearbutton">Clear</button>
                </div>
                <!-- <small class="text-body-secondary">9 mins</small> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text id="id-button5" x="50%" y="50%" fill="#eceeef" dy=".3em">0</text></svg>
            <div class="card-body">
              <p class="card-text">Maya</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" data-buttonnumber="5" class="btn btn-sm btn-primary btn-space votebutton">Vote!</button>
                    <button type="button" data-buttonnumber="5" class="btn btn-sm btn-outline-secondary clearbutton">Clear</button>
                </div>
                <!-- <small class="text-body-secondary">9 mins</small> -->
              </div>
            </div>
          </div>
        </div>


    </div>
  </div>

</div>


  
