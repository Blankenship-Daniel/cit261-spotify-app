// put ajax requests here

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
        } else {
            console.error(xmlhttp.statusText);
        }
    }
    xmlhttp.open(request_type, url, true);
    xmlhttp.send();
}
