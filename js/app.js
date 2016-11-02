// general app javascripts here

var API_ENDPOINT = 'https://api.spotify.com/v1/';
ajax_request(API_ENDPOINT + 'albums/0sNOF9WDwhWunNAHPD3Baj', 'GET', function(json) {
    console.log(json);
});
