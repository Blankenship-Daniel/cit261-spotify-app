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

        console.log(obj);

        for (var i = 0; i < results.length; i++) {
            var album = results[i].name;
            var artist = results[i].artists[0].name;
            var external_link = results[i].external_urls.spotify;
            var image = results[i].images[0].url;

            var div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = '<a href="' + external_link + '">' +
                                '<div class="result_image">' +
                                    '<img src="' + image + '">' +
                                '</div>' +
                                '<div class="result_desc">' +
                                    '<div>Album: ' + album + '</div>' +
                                    '<div>Artist: ' + artist + '</div>' +
                                '</div>' +
                            '</a>';
            search_results.appendChild(div);
        }
    });
}

/**
 * Get all tracks that match an input string.
 * @param  {String} input the raw search string.
 */
function get_tracks(input) {
    if (input === '') {
        return false;
    }

    ajax_request(API_ENDPOINT + 'search?q=' + encodeURIComponent(input) + '&type=track', 'GET', function(json) {
        var obj = JSON.parse(json);
        var results = obj.tracks.items;
        var search_results = document.getElementById('search_results');
        search_results.innerHTML = '';

        console.log(obj);

        for (var i = 0; i < results.length; i++) {
            var track = results[i].name;
            var popularity = results[i].popularity;
            var external_link = results[i].external_urls.spotify;
            var image = results[i].images[0].url;

            var div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = '<a href="' + external_link + '">' +
                                '<div class="result_image">' +
                                    '<img src="' + image + '">' +
                                '</div>' +
                                '<div class="result_desc">' +
                                    '<div>Track: ' + track + '</div>' +
                                    '<div>Popularity: ' + popularity + '</div>' +
                                '</div>' +
                            '</a>';
            search_results.appendChild(div);
        }
    });
}

/**
 * Get all artists that match an input string.
 * @param  {String} input the raw search string.
 */
function get_artists(input) {
    if (input === '') {
        return false;
    }

    ajax_request(API_ENDPOINT + 'search?q=' + encodeURIComponent(input) + '&type=artist', 'GET', function(json) {
        var obj = JSON.parse(json);
        var results = obj.artists.items;
        var search_results = document.getElementById('search_results');
        search_results.innerHTML = '';

        console.log(obj);

        for (var i = 0; i < results.length; i++) {
            var artist = results[i].name;
            var genre = results[i].genres;
            var external_link = results[i].external_urls.spotify;
            var image = results[i].images[0].url;

            var div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = '<a href="' + external_link + '">' +
                                '<div class="result_image">' +
                                    '<img src="' + image + '">' +
                                '</div>' +
                                '<div class="result_desc">' +
                                    '<div>Artist: ' + artist + '</div>' +
                                    '<div>Genre: ' + genre + '</div>' +
                                '</div>' +
                            '</a>';
            search_results.appendChild(div);
        }
    });
}
