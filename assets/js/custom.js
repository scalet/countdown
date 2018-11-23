HOUR = 18;
MINUTE = "00";
SECOND = "00";

var end = new Date();
end.setHours(23,59,59,999);


if (getCookie('title') == null) {
    var title = prompt("Enter the title:");
} else {
    var title = getCookie('title');
}
if (getCookie('time') == null) {
    var countdownTime = prompt("Enter the countdown time(H:i:s) :");
} else {
    var countdownTime = getCookie('time');
}

if (!(countdownTime == null || countdownTime == "")) {
    arrCountdown = countdownTime.split(':');

    HOUR = isNaN(arrCountdown[0]) === false ? arrCountdown[0] : HOUR;
    MINUTE = isNaN(arrCountdown[1]) === false ? arrCountdown[1] : MINUTE;
    SECOND = isNaN(arrCountdown[2]) === false ? arrCountdown[2] :  SECOND;
}

if (title == null || title == "") {
    title = "FALOW!!";
}

//Title of the page
document.title = title + " (" + HOUR + ":" + MINUTE + ":" + SECOND + ")";

if (getCookie('title') == null) {
    //Cookie Title
    document.cookie = "title=" + title + "; expires=" + end.toUTCString();
}
if (getCookie('time') == null) {
    //Cookie Time
    document.cookie = "time=" + HOUR + ":" + MINUTE + ":" + SECOND + "; expires=" + end.toUTCString();
}

HOUR = parseInt(HOUR);
MINUTE = parseInt(MINUTE);
SECOND = parseInt(SECOND);

//Images parametres
MIN = 0;
MAX = 0;
ARR_IMAGES = ['https://i.giphy.com/media/JIX9t2j0ZTN9S/200w_d.gif'];
getJSON('https://gist.githubusercontent.com/scalet/49716b71b9b70040dce76843e4e5c0c8/raw/bcd3d6f2643a497b6425c86f3b75dd4963061739/countdown-images.json',
    function(err, data) {
        if (err !== null) {
            console.error('Something went wrong: ' + err);
        } else {
            MAX = (data.images.length -1);
            ARR_IMAGES = data.images;
        }
    });

var gifNumber = getRandomInt(MIN, MAX);
if (window.location.hash != '') {
    gifNumber = window.location.hash;
    gifNumber = gifNumber.replace('#', '');
}
var meta = document.createElement('meta');
meta.setAttribute('property', 'og:image');
meta.content = (ARR_IMAGES[gifNumber]);
//document.getElementsByTagName('head')[0].appendChild(meta);

document.getElementById('foot').innerHTML = '<a href="#' + gifNumber + '">#' + gifNumber + '</a>';
document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + ARR_IMAGES[gifNumber] + ')';
var tempo = document.getElementById('tempo');
var text = document.getElementById('text');

text.innerHTML = title;

calcTime();
window.setInterval(calcTime, 1000);

resizeCenter();
window.addEventListener("resize", resizeCenter);
window.setInterval(function(){
    var gifNumber = getRandomInt(MIN, MAX -1);
    document.getElementById('foot').innerHTML = '<a href="#' + gifNumber + '">#' + gifNumber + '</a>';
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + ARR_IMAGES[gifNumber] + ')';
    console.log(gifNumber);
    console.log(ARR_IMAGES[gifNumber]);
},500 * 60);