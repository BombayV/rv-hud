let radioStatus = false;
let 

const radioText = doc.getElementById('voice-radio-mode');
const radio = doc.getElementById('voice-radio-cont');

function updateVoice(status) {
    if (hudStatus) {
        if (status.radioStatus) {
            if (!radioStatus) {
                radioStatus = true;
                setTimeout(function() {
                    radio.style.animation = 'none';
                }, 600)
                radio.style.animation = 'spin 0.5s';
                radio.style.opacity = '1';
            }
            radioText.textContent = status.frequencyStatus
        } else if (radioStatus && !status.radioStatus) {
            radioStatus = false;
            setTimeout(function() {
                radio.style.animation = 'none';
            }, 600)
            radio.style.animation = 'spin 0.5s';
            radio.style.opacity = '0';
        }
    }
    console.log(status)
}