(function(window, document, undefined) {
    var query = document.querySelectorAll('.c-input-color, .c-btn-show, .c-colors-list');
    var colorsInput = query[0],
        visualizeButton = query[1],
        colorsList = query[2],
        regex = /(rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*(?:\.\d+)?)\))|(hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,?\s*(\d*(?:\.\d+)?)\))|#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;

    /**
    
        TODO:
        - Separate the regex for each color type for different treatment.
        - decide upon what color to use against transparent background
    
     */
    
    // colors in localStorage?
    if(localStorage.colors && localStorage.colors !== "undefined" ){
        colorsInput.value = localStorage.colors
    };
    visualizeButton.addEventListener('click', function(e) {
        //store whatever is it textarea
        (window.localStorage) && (localStorage.colors = colorsInput.value);
        //clean the list
        colorsList.innerHTML = "";
        Array.from( new Set(colorsInput.value.split("\n")) ).sort().map(function(v) {
            regex.test(v) && (function(){
                var color = document.createElement("li"),
                    colorValue = document.createElement("span");
                color.style.color = v;
                colorValue.textContent = v;
                // colorValue.style.color = v;
                color.appendChild(colorValue);
                colorsList.appendChild(color);
            }());
        });
    });
    colorsList.addEventListener("click", function(e){
        if(e.target.nodeName.toLowerCase() === 'li'){
            // select the text when clicked
            var selection = window.getSelection();            
            var range = document.createRange();
            range.selectNodeContents(e.target);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
})(window, document);