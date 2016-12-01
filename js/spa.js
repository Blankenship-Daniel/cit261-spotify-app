function reset_pages() {
    var pages = document.getElementsByClassName('reset');
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].classList.contains('active')) {
            pages[i].classList.remove('active');
        }
    }
}

function load_page(path) {
    if (!window.location.hash) {
        document.getElementById('home').classList.add('active');
    } else {
        var id = path.substr(1, path.length - 1);
        document.getElementById(id).classList.add('active');
    }
}

// Handles Single Page Application (SPA) logic
window.addEventListener('load', function() {
    load_page(window.location.hash);
});

window.addEventListener('hashchange', function() {
    reset_pages();
    load_page(window.location.hash);
});
