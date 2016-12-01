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

function save_to_local_storage(type, obj) {
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
