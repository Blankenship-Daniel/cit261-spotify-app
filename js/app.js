function toggle_class(elem, class_name) {
    if (elem.classList.contains(class_name)) {
        elem.classList.remove(class_name);
    } else {
        elem.classList.add(class_name);
    }
}

function toggle_display(elem) {
    var style = window.getComputedStyle(elem);
    if (style.display === 'none') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}

function toggle_menu(menu_id) {
    var menu = document.getElementById(menu_id);
    toggle_class(menu, 'active');
}

function save_to_local_storage(el, type, obj) {
    el.children[0].classList.add('turn-green');

    var save_obj = {
        type: type,
        data: obj
    };

    var items;
    if (localStorage.getItem('favoritedItems') === null) {
        items = [];
    } else {
        var local_storage_obj = localStorage.getItem('favoritedItems');
        items = JSON.parse(local_storage_obj);
    }

    items.push(save_obj);
    localStorage.setItem('favoritedItems', JSON.stringify(items));
}

function delete_from_local_storage(el, id) {
    el.parentElement.classList.add('fadeable');
    var local_storage_obj = localStorage.getItem('favoritedItems');
    var favorited_items = JSON.parse(local_storage_obj);

    var i;
    for (i = 0; i < favorited_items.length; i++) {
        var obj = favorited_items[i];
        var ext_link = decodeURIComponent(obj.data.external_link);

        if (id === ext_link) {
            break;
        }
    }

    favorited_items.splice(i, 1);
    localStorage.setItem('favoritedItems', JSON.stringify(favorited_items));
}

function print_favorites() {
    var favorites = localStorage.getItem('favoritedItems');
    if (favorites === null) {
        return false;
    }

    favorites = JSON.parse(favorites);

    for (var i = 0; i < favorites.length; i++) {
        var obj = favorites[i];
        var type = obj['type'];
        var func = 'print_' + type;
        var parent_elem = document.getElementById('favorite_' + type + '_container');
        window[func](obj['data'], parent_elem);
    }
}

function print_track(obj, parent_elem) {
    var div = document.createElement('div');
    div.classList.add('result');
    div.innerHTML = '<a href="' + decodeURIComponent(obj['external_link']) + '">' +
                        '<div class="result_image">' +
                            '<img src="' + decodeURIComponent(obj['image']) + '">' +
                        '</div>' +
                        '<div class="result_desc">' +
                            '<div>' + decodeURIComponent(obj['song']) + '</div>' +
                        '</div>' +
                    '</a>' +
                    '<div class="favorited_wrapper" onclick="delete_from_local_storage(this, \'' + decodeURIComponent(obj['external_link']) + '\')">' +
                          '<i class="fa fa-trash-o"></i>' +
                     '</div>';
    parent_elem.appendChild(div);}

function print_artist(obj, parent_elem) {
    var div = document.createElement('div');
    div.classList.add('result');
    div.innerHTML = '<a href="' + decodeURIComponent(obj['external_link']) + '">' +
                        '<div class="result_image">' +
                            '<img src="' + decodeURIComponent(obj['image']) + '">' +
                        '</div>' +
                        '<div class="result_desc">' +
                            '<div>' + decodeURIComponent(obj['artist']) + '</div>' +
                        '</div>' +
                    '</a>' +
                    '<div class="favorited_wrapper" onclick="delete_from_local_storage(this, \'' + decodeURIComponent(obj['external_link']) + '\')">' +
                          '<i class="fa fa-trash-o"></i>' +
                     '</div>';
    parent_elem.appendChild(div);
}

function print_album(obj, parent_elem) {
    var div = document.createElement('div');
    div.classList.add('result');
    div.innerHTML = '<a href="' + decodeURIComponent(obj['external_link']) + '">' +
                        '<div class="result_image">' +
                            '<img src="' + decodeURIComponent(obj['image']) + '">' +
                        '</div>' +
                        '<div class="result_desc">' +
                            '<div>Album: ' + decodeURIComponent(obj['album']) + '</div>' +
                            '<div>Artist: ' + decodeURIComponent(obj['artist']) + '</div>' +
                        '</div>' +
                    '</a>' +
                    '<div class="favorited_wrapper" onclick="delete_from_local_storage(this, \'' + decodeURIComponent(obj['external_link']) + '\')">' +
                          '<i class="fa fa-trash-o"></i>' +
                     '</div>';
    parent_elem.appendChild(div);
}
