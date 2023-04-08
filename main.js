

// const apiUrl = "http://api.anidb.net:9001/httpapi?request=anime&aid=1&output=json";



// function api() {
//     fetch(apiUrl)
//         .then(animeData => {
//             return animeData.json();
//         }).then(animeData => console.log(animeData));
// }

// api();
//-------------------------------------------------------------------------------
const searchButton = document.querySelector('#searchButton');
const progressBarFill = document.querySelector('#progressBarFill');
const progressBar = document.querySelector('#progressBar');
searchButton.addEventListener("click", printInput);
const animeInput = document.querySelector('#animeInput');
animeInput.addEventListener("keypress", printInput);
quotePerson = document.querySelector('.quotePerson');
quoteOutput = document.querySelector('.quoteOutput');
showQuote = document.querySelector('#quote');

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
    // var data = JSON.parse(response);
    // result.innerText = data.quote;

    // updateProgressBar(100);
    setTimeout("updateProgressBar(100)", 1000);


}

function printInput(evt) {
    if (evt.keyCode === 13 || evt.type === "click") {
        updateProgressBar(30);
        console.log(animeInput.value);
        // quoteOutput.innerText = animeInput.value;
        displayResults(animeInput.value);
        animeInput.value = "";
        showQuote.style.visibility = "visible";
        setTimeout("updateProgressBar(100, 'hidden')", 1000);
        setTimeout("updateProgressBar(0, 'hidden')", 1000);
    }


}


