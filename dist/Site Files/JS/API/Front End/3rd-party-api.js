fetch('https://dog.ceo/api/breeds/image/random')
.then(response => response.json())
.then(data => randomdog.src = data.message);

fetch('https://random-word-api.herokuapp.com/word')
.then(response => response.json())
.then(data => {
    let stringified = String(data);
    randomword.innerText = stringified.replace(stringified[0], stringified[0].toUpperCase());
});

fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?type=twopart')
.then(response => response.json())
.then(data => {
    jokesetup.innerText = "\"" + data.setup + "\"";
    jokedelivery.innerText = data.delivery;
});