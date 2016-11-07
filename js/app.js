// general app javascripts here
var API_ENDPOINT = 'https://api.spotify.com/v1/';

/**
 * Get all albums that match an input string.
 * @param  {String} input the raw search string.
 */
function get_albums(input) {
    if (input === '') {
        return false;
    }

    ajax_request(API_ENDPOINT + 'search?q=' + encodeURIComponent(input) + '&type=album', 'GET', function(json) {
        var obj = JSON.parse(json);
        var results = obj.albums.items;
        var search_results = document.getElementById('search_results');
        search_results.innerHTML = '';

        for (var i = 0; i < results.length; i++) {
            var album = results[i].name;
            var artist = results[i].artists[0].name;
            var external_link = results[i].external_urls.spotify;

            var p_elem = document.createElement('p');
            p_elem.innerHTML = '<a href="' + external_link + '">"' + album + '" By ' + artist + '</a>';
            search_results.appendChild(p_elem);
        }
    });
}
