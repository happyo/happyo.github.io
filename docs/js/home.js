String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function ran_col() { //function name
    var icons = document.getElementsByClassName('home-post-icon');
    var spans = document.getElementsByClassName('home-post-title');
    var lisLen = icons.length;

    for (var i = 0; i < lisLen; i++) {
        var letters = ["rgba(159, 134, 97, 0.6)", "rgba(93, 85, 150, 46)", "rgba(154, 176, 162, 0.69)", "rgba(169, 198, 127, 0.4)", "rgba(190, 151, 220, 0.42)", "rgba(216, 147, 153, 0.44)", "rgba(191, 121, 149, 0.53)", "rgba(178, 121, 121, 0.47)", "rgba(198, 194, 142, 0.52)", "rgba(138, 195, 190, 0.44)"]; //Set your colors here
        var icon = icons[i];
        var span = spans[i];
        var title = span.innerText;
        var hashCode = title.hashCode();
        var index = Math.abs(hashCode) % letters.length;
        var color = letters[index];
        icons[i].style.backgroundColor = color;
    }
}

document.addEventListener("DOMContentLoaded", ran_col);


// window.onload = function() {
//     ran_col();
// };
