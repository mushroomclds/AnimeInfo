

const apiUrl = "http://api.anidb.net:9001/httpapi?request=anime&aid=1&output=json";





function api() {
    fetch(apiUrl)
        .then(animeData => {
            return animeData.json();
        }).then(animeData => console.log(animeData));
}

// api();
//-------------------------------------------------------------------------------

const input = document.querySelector('.animeInput');

input.addEventListener("keypress", printInput);



var fetchedResult = "";
fetchedResult = fetch('https://animechan.vercel.app/api/random')
    .then(response => { return response.json(); })
    .then(displayResults)



function printInput(evt) {
    if (evt.keyCode === 13) {
        console.log(input.value);
    }
}

function displayResults(response) {

    console.log(response);

    let result = document.querySelector('.result');
    // var data = JSON.parse(response);
    // result.innerText = data.quote;
    result.innerText = `${response.quote}`;

}