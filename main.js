

// const apiUrl = "http://api.anidb.net:9001/httpapi?request=anime&aid=1&output=json";



// function api() {
//     fetch(apiUrl)
//         .then(animeData => {
//             return animeData.json();
//         }).then(animeData => console.log(animeData));
// }

// api();

const synopsis = document.querySelector('#synopsis');
const synopsisText = document.querySelector('#synopsisText');
const resultBox = document.querySelector('.resultBox');


const searchButton = document.querySelector('#searchButton');
const progressBarFill = document.querySelector('#progressBarFill');
const progressBar = document.querySelector('#progressBar');
const animeInput = document.querySelector('#animeInput');
quotePerson = document.querySelector('.quotePerson');
quoteOutput = document.querySelector('.quoteOutput');
showQuote = document.querySelector('#quote');
animeImage = document.querySelector('#animeImage');

animeInput.addEventListener("keypress", printInput);
searchButton.addEventListener("click", displayAnimeInfo);
var searchSuggestionsTitles = [];
var dataJSON;
//-------------------------------------------------------------------------------

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
};

function displayAnimeInfoArray(anime) {
    i = 0;
    updateProgressBar(70);
    while (i < searchSuggestionsTitles.length) {
        console.log("displayAnimeInfoArray NOT: " + dataJSON[i].title);
        if (dataJSON[i].title === anime) {
            synopsisText.innerText = dataJSON[i].synopsis;
            animeImage.src = dataJSON[i].image;
            synopsis.style.visibility = "visible";
            animeImage.style.visibility = "visible";
            showQuote.style.visibility = "visible";
            return;
        }
        i++;
    }

}

function displayAnimeInfo(animeInputVal = "") {
    animeInputVal = animeInput.value;
    console.log("searching for " + animeInputVal);
    fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${animeInputVal}`, options)
        .then(response => response.json()) //returns json file into next "then"
        .then(response => {
            dataJSON = response.data;
            console.log(response);
            console.log(typeof response.data);
            var searchSuggestions = response.data;
            searchSuggestionsTitles = [];
            i = 0;
            while (i < searchSuggestions.length) {
                console.log(searchSuggestions[i]);
                console.log(searchSuggestions[i].title);
                searchSuggestionsTitles.push(searchSuggestions[i].title);
                i++;
            }
            i = 0;
            while (i < searchSuggestionsTitles.length) {
                console.log(searchSuggestionsTitles[i]);
                i++;
            }
            $('#animeInput').autocomplete({
                source: searchSuggestionsTitles
            });
            console.log("type of searchSuggestions: " + typeof searchSuggestions);
            console.log("type of searchSuggestionsTitles: " + typeof searchSuggestionsTitles);
            // synopsis.innerText = response.data[5].synopsis;
        })
        .catch(err => console.error(err));
}


function updateProgressBar(progress, toggle = "visible") {
    progressBar.style.visibility = toggle;
    progressBarFill.style.width = progress + "%";
    progressBarFill.style.innerText = progress + "%";
    console.log(progressBarFill.style.width + " " + progressBar.style.visibility);
}

async function displayResults(animeInputVal) {
    let result = document.querySelector('.result');
    setTimeout("updateProgressBar(70)", 500);

    fetchedResult = fetch(`https://animechan.vercel.app/api/random/anime?title=${animeInputVal}`)
        .then(response => { return response.json(); })
        .then(response => {
            if (`${response.quote}` === "undefined") {
                console.log("error");
                alert("Enter Valid Anime(:");
                return -1;
            }
            result.innerText = `${response.quote}`;
            quotePerson.innerText = `${response.character}`;
            quoteOutput.innerText = `${response.anime}`;
            console.log(response);
        });
    setTimeout("updateProgressBar(100)", 1000);
}

function printInput(evt) {
    // if (evt.keyCode === 13 || evt.type === "click") {
    if (evt.keyCode === 13) {
        updateProgressBar(30);
        console.log(animeInput.value);
        // displayResults(animeInput.value); //dont call quote api for now 
        // displayAnimeInfo(animeInput.value);
        displayAnimeInfoArray(animeInput.value);
        animeInput.value = "";
        showQuote.style.visibility = "visible";
        setTimeout("updateProgressBar(100, 'hidden')", 1000);
        setTimeout("updateProgressBar(0, 'hidden')", 1000);
    }


}


