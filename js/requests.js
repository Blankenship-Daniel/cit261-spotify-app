var API_ENDPOINT = 'https://api.spotify.com/v1/';

/**
 * Makes an asynchronous request.
 * @param  {string}   url          the url of the requested resource.
 * @param  {string}   request_type GET, POST, DELETE, UPDATE, etc.
 * @param  {Function} callback     handles the responseText.
 */
function ajax_request(url, request_type, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open(request_type, url, true);
    xmlhttp.send();
}

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
        var search_results = document.getElementById('albums_results');
        search_results.innerHTML = '';

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
                            '</a>' +
                            '<div class="favorited_wrapper" onclick="save_to_local_storage(this, \'album\', { ' +
                                  'album: \'' + encodeURIComponent(album) + '\', ' +
                                  'artist: \'' + encodeURIComponent(artist) + '\', ' +
                                  'external_link: \'' + encodeURIComponent(external_link) + '\', ' +
                                  'image: \'' + encodeURIComponent(image) + '\' })">' +
                                  '<i class="fa fa-floppy-o"></i>' +
                             '</div>';
            search_results.appendChild(div);
        }
    });
}

/**
 * Retrieves all artists that match an input string.
 * @param  {String} input the raw search string.
 */
function get_artists(input) {
    if (input === '') {
        return false;
    }

    ajax_request(API_ENDPOINT + 'search?q=' + encodeURIComponent(input) + '&type=artist', 'GET', function(json) {
        var obj = JSON.parse(json);
        var results = obj.artists.items;
        var search_results = document.getElementById('artists_results');
        search_results.innerHTML = '';

        for (var i = 0; i < results.length; i++) {
            var artist = results[i].name;
            var external_link = results[i].external_urls.spotify;
            var image;

            if (results[i].images.length > 0) {
                image = results[i].images[0].url;
            } else {
                continue;
            }

            var div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = '<a href="' + external_link + '">' +
                                '<div class="result_image">' +
                                    '<img src="' + image + '">' +
                                '</div>' +
                                '<div class="result_desc">' +
                                    '<div>' + artist + '</div>' +
                                '</div>' +
                            '</a>' +
                            '<div class="favorited_wrapper" onclick="save_to_local_storage(this, \'artist\', { ' +
                                  'artist: \'' + encodeURIComponent(artist) + '\', ' +
                                  'external_link: \'' + encodeURIComponent(external_link) + '\', ' +
                                  'image: \'' + encodeURIComponent(image) + '\' })">' +
                                  '<i class="fa fa-floppy-o"></i>' +
                             '</div>';
            search_results.appendChild(div);
        }
    });
}

/**
 * Retrieves all songs that match an input string.
 * @param  {String} input the raw search string.
 */
function get_songs(input) {
    if (input === '') {
        return false;
    }

    ajax_request(API_ENDPOINT + 'search?q=' + encodeURIComponent(input) + '&type=track', 'GET', function(json) {
        var obj = JSON.parse(json);
        var results = obj.tracks.items;
        var search_results = document.getElementById('songs_results');
        search_results.innerHTML = '';

        for (var i = 0; i < results.length; i++) {
            var song = results[i].name;
            var external_link = results[i].external_urls.spotify;
            var image = results[i].album.images[0].url;

            var div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = '<a href="' + external_link + '">' +
                                '<div class="result_image">' +
                                    '<img src="' + image + '">' +
                                '</div>' +
                                '<div class="result_desc">' +
                                    '<div>' + song + '</div>' +
                                '</div>' +
                            '</a>' +
                            '<div class="favorited_wrapper" onclick="save_to_local_storage(this, \'track\', { ' +
                                  'song: \'' + encodeURIComponent(song) + '\', ' +
                                  'external_link: \'' + encodeURIComponent(external_link) + '\', ' +
                                  'image: \'' + encodeURIComponent(image) + '\' })">' +
                                  '<i class="fa fa-floppy-o"></i>' +
                             '</div>';
            search_results.appendChild(div);
        }
    });
}
