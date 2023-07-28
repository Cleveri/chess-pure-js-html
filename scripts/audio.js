var context;
var allSounds = {};
window.addEventListener('load', init, false);
function init() {
    try {
    context = new AudioContext();
    var soundsToLoad = ['check', 'capture', 'promote', 'checkmate', 'notify',
                        'move', 'move-opponent', 'illegal', 'game-start', 'castle'];
        for(var i = 0; i < soundsToLoad.length; i++){
            loadSound(soundsToLoad[i]);
        }
    }
    catch(e) {
    alert('Web Audio API is not supported in this browser');
    }
}



function loadSound(key) {
    var request = new XMLHttpRequest();
    request.open('GET', "./audio/" + key + ".mp3", true);
    request.responseType = 'arraybuffer';
    // Decode asynchronously
    request.onload = function() {
        context.decodeAudioData(request.response).then((decodedData) => {
            allSounds[key] = decodedData;
        });
    }
    request.send();
}

function playChessAudio(soundName) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = allSounds[soundName];                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start();                          // play the source now
}


function onError(err){
    alert(err);
}