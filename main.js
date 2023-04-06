

const apiUrl = "http://api.anidb.net:9001/httpapi?request=anime&aid=1&output=json";



function api() {
    fetch(apiUrl)
        .then(animeData => {
            return animeData.json();
        }).then(animeData => console.log(animeData));
}

// api();
//-------------------------------------------------------------------------------

const animeInput = document.querySelector('.animeInput');
animeInput.addEventListener("keypress", printInput);
quotePerson = document.querySelector('.quotePerson');

function displayResults(animeInputVal) {
    let result = document.querySelector('.result');

    fetchedResult = fetch(`https://animechan.vercel.app/api/random/anime?title=${animeInputVal}`)
        .then(response => { return response.json(); })
        .then(response => {
            result.innerText = `${response.quote}`;
            quotePerson.innerText = `${response.character}`;
            console.log(response);
        });

    // var data = JSON.parse(response);
    // result.innerText = data.quote;
}


quoteOutput = document.querySelector('.quoteOutput');
showQuote = document.querySelector('#quote');

function printInput(evt) {
    if (evt.keyCode === 13) {
        console.log(animeInput.value);
        quoteOutput.innerText = animeInput.value;
        displayResults(animeInput.value);
        animeInput.value = "";
        showQuote.style.visibility = "visible";
    }
}


