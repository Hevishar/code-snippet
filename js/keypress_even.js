document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    console.log(e.key);
    console.log(e.code);
    console.log(e.which);
}