const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "9463137132564df6aa968b212dda194b",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
  console.log(joke);
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky";
  try {
    const response = await fetch(apiUrl);
    data = await response.json();
    if (data.setup) {
      joke = `${data.setup} .. ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speecg
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // Catch errors here
    console.log("Whoops", error);
  }
}

// Event Listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
