//Init
const synth = window.speechSynthesis;
const speechU = new SpeechSynthesisUtterance();
speechU.lang = "fr";
speechU.volume = 1;
speechU.pitch = 1;
speechU.rate = 1;
const voices = synth.getVoices();
speechU.voice = voices[0];

function speakTTS(textOfSpeech) {
    if (synth.speaking) {
        console.error('Currently speaking !');
        return;
    }
    if (textOfSpeech !== '') {
        speechU.text = textOfSpeech;
        synth.speak(speechU);
    }
}