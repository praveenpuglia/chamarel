(function(window, document, undefined) {
    var query = document.querySelectorAll('.c-input-color, .c-btn-show, .c-colors-list');
    var colorsInput = query[0],
        showButton = query[1],
        colorsList = query[2],
        regex = {
            "rgb" : /(rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*(?:\.\d+)?)\))/g,
            "hex" : /(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))/g,
            "hsl" : /(hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,?\s*(\d*(?:\.\d+)?)\))/g
        };

    // showMeMyColors in localStorage?
    if (localStorage.showMeMyColors && localStorage.showMeMyColors !== "undefined") {
        colorsInput.value = localStorage.showMeMyColors
    };
    showButton.addEventListener('click', function(e) {
        //store whatever is it textarea
        (window.localStorage) && (localStorage.showMeMyColors = colorsInput.value);
        //clean the list
        colorsList.innerHTML = "";

        // generate the list items
        parseCss(colorsInput.value).map(function(v){
            var item = document.createElement("li"),
                colorValue = document.createElement("span");
                colorTile = document.createElement("div");

            // set classes for children.
            colorTile.classList.add("color-tile");
            colorValue.classList.add("color-code");

            // set the values 
            colorTile.style.backgroundColor = colorValue.textContent = v;
            item.appendChild(colorTile);
            item.appendChild(colorValue);
            colorsList.appendChild(item);
        });

    });
    colorsList.addEventListener("click", function(e) {
        if (e.target.className === 'color-code') {
            // select the text when clicked
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(e.target);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    /*===============================
    =            Methods            =
    ===============================*/
    
    function parseCss(css){
        var rgbColors = getColors(css,"rgb");
        var hexColors = getColors(css,"hex");
        var hslColors = getColors(css,"hsl");
        return rgbColors.concat(hexColors,hslColors);
    }
    function getColors(css,type){
        var m;
        var ca = [];
        var re = regex[type];
        do {
            m = re.exec(css);
            if (m) {
                ca.push(m[1]);
            }
        } while (m);
        return Array.from( new Set( ca ) );
    }  
    /*=====  End of Methods  ======*/
    
})(window, document);