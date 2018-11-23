function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);

    if (begin == -1) {

        begin = cookies.indexOf(prefix);

        if (begin != 0) {
            return null;
        }

    } else {
        begin += 2;
    }

    var end = cookies.indexOf(";", begin);

    if (end == -1) {
        end = cookies.length;
    }

    return unescape(cookies.substring(begin + prefix.length, end));
}

function deleteCookie(name) {
    if (getCookie(name)) {
        document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function calcTime() {
    var agora = new Date();
    var hora = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), HOUR, MINUTE, SECOND);
    if (agora > hora)
        hora.setDate(agora.getDate() + 1);
    var diff = new Date(hora.getTime() - agora.getTime());
    var h = diff.getUTCHours();
    var m = diff.getUTCMinutes();
    var s = diff.getUTCSeconds();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    tempo.innerHTML = h + ':' + m + ':' + s;
    document.title = title + " (" + HOUR + ":" + MINUTE + ":" + SECOND + ")" + ' - ' + tempo.innerHTML;
}
function resizeCenter() {
    tempo.style.marginTop = ((window.innerHeight / 3) - (tempo.clientHeight / 2)) + 'px';
}

function reload () {
    deleteCookie('title');
    deleteCookie('time');
    window.location.href='';
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};