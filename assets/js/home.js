function ran_col() { //function name
    var icons = document.getElementsByClassName('home-post-icon');
    var spans = document.getElementsByClassName('home-post-title');
    var lisLen = icons.length;

    for (var i = 0; i < lisLen; i++) {
        var letters = ["rgba(159, 134, 97, 0.6)", "rgba(93, 85, 150, 46)", "rgba(154, 176, 162, 0.69)", "rgba(169, 198, 127, 0.4)", "rgba(190, 151, 220, 0.42)", "rgba(216, 147, 153, 0.44)", "rgba(191, 121, 149, 0.53)", "rgba(178, 121, 121, 0.47)", "rgba(198, 194, 142, 0.52)", "rgba(138, 195, 190, 0.44)"]; //Set your colors here
        var icon = icons[i];
        var color = letters[Math.floor(Math.random() * letters.length)];
        icons[i].style.backgroundColor = color;
    }
}

window.onload = function() {
    ran_col();
}
