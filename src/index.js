const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';


document.addEventListener('DOMContentLoaded', () => {
    // Challenge 1
    getImagesFromApi(imgUrl);
    // Challenge 2
    getDogBreedsFromApi(breedUrl);
    // Challenge 3
    changeLiElementFontColor();
    // Challenge 4
    orderLiElementsByFirstLetter();
});


/*
---------------
=> CHALLENGE 1
---------------
*/
function getImagesFromApi(url) {
    fetch(url)
    .then( resp => resp.json())
    // Processing JSON to img Tag to DOM
    .then( json => addImgElementToDom(json))
    .catch( error => console.error(error.message));
}

function addImgElementToDom(json) {
    const pictures_src = json.message;
    const imageContainer = document.getElementById('dog-image-container');

    // Processing every img
    pictures_src.forEach( (picture_url) => {
        const imgElement = createImgElement(picture_url);
        imageContainer.appendChild(imgElement);
    });

    // It will create an IMAGE element
    function createImgElement(src){
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', src);
        return imgElement;
    }
}

/*
---------------
=> CHALLENGE 2
---------------
*/
function getDogBreedsFromApi(url) {
    fetch(url)
    .then( resp => resp.json() )
    .then( json => addDogBreedsToUl(json) )
    .catch( error => console.error(error.message));
}

function addDogBreedsToUl(json) {
    let breedsObj = json.message;
    const dogBreedsUl = document.getElementById('dog-breeds');
    let breedLi = document.createElement('li');

    for (let breed in breedsObj) {
        if (breedsObj.hasOwnProperty(breed)) {
            let subBreeds = breedsObj[breed];

            breedLi = createLiElement(breed);

            // If the breed has sub-breeds
            // Create a child UL and populate it with LI with sub-breeds
            if (subBreeds.length !== 0) {
                let subBreedUl = document.createElement('ul');
                subBreeds.forEach( (subBreed) => {
                    let subBreedLi = createLiElement(subBreed);
                    subBreedUl.appendChild(subBreedLi);
                });
                breedLi.appendChild(subBreedUl);
            }

            dogBreedsUl.appendChild(breedLi);
        }
    }

    function createLiElement(text) {
        const liElement = document.createElement('li');
        liElement.innerText = text;
        return liElement;
    }
}


/*
---------------
=> CHALLENGE 3
---------------
*/

function changeLiElementFontColor() {
    const dogBreedsUl = document.getElementById('dog-breeds');
    const colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

    dogBreedsUl.addEventListener('click', (event) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        event.target.style.color = randomColor;
    });
}

/*
---------------
=> CHALLENGE 4
---------------
*/
function orderLiElementsByFirstLetter() {
    const breedDropdown = document.getElementById('breed-dropdown');
    const dogBreedsUl = document.getElementById('dog-breeds');


    breedDropdown.addEventListener('change', (event) => {
        const optionLetter = event.target.value;
        const resultDiv = document.getElementById('results');
        
        setupResultDiv(optionLetter);

        // group li by letter
        const lis = groupLiByLetter(optionLetter);

        // append the filtered lis
        resultDiv.appendChild(lis);

    });

    function setupResultDiv(letter) {
        const resultDiv = document.getElementById('results');
        const resultUl = document.createElement('ul');
        const resultHeading = document.createElement('h2');

        resultDiv.innerHTML = "";
        resultDiv.style.border = '1px solid red;'

        resultHeading.textContent = `Filtered results by ${letter}`;
        resultUl.className = 'results';

        resultDiv.appendChild(resultUl);
        resultDiv.appendChild(resultHeading);
    }

    function groupLiByLetter(letter) {
       const allLis = dogBreedsUl.getElementsByTagName('li');
       const filteredUl = document.createElement('ul');

       // if the breed starts with the letter, filter it
       for (let i = 0; i < allLis.length; i++) {
           if (allLis[i].textContent.startsWith(letter)) {
               filteredUl.appendChild(allLis[i]);
           }
       }
       return filteredUl;
    }

}







/*
******************************************************
=> HELPER FUNCTIONS
******************************************************
*/

