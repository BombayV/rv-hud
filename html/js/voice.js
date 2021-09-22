const VoiceNames = ['Whisper', 'Normal', 'Loud']

let radioStatus = false;
let mutedStatus = false;
let talkingStatus = false;

const radioText = doc.getElementById('voice-radio-mode');
const radio = doc.getElementById('voice-radio-cont');

function updateVoice(status) {
    doc.getElementById('voice-mode').textContent = VoiceNames[status.modeStatus - 1];
    if (hudStatus) {
        if (status.radioStatus) {
            if (!radioStatus) {
                radioStatus = true;
                radio.style.display = 'flex';
                radioText.textContent = `${status.frequencyStatus}mhZ`
            }
        } else if (radioStatus && !status.radioStatus) {
            radioStatus = false;
            radio.style.display = 'none';
        }

        if (status.mutedStatus) {
            if (!mutedStatus) {
                mutedStatus = true;
                doc.getElementById('voice-icon').classList.remove('fa-microphone-alt');
                doc.getElementById('voice-icon').classList.add('fa-microphone-alt-slash');
            }
        } else if (mutedStatus && !status.mutedStatus) {
            mutedStatus = false;
            doc.getElementById('voice-icon').classList.add('fa-microphone-alt');
            doc.getElementById('voice-icon').classList.remove('fa-microphone-alt-slash');
        }

        if (status.isTalking) {
            if (!talkingStatus) {
                talkingStatus = true;
                doc.getElementById('voice-box').style.borderWidth = "0.3vh";
                if (radioStatus) {
                    doc.getElementById('voice-radio-box').style.borderWidth = "0.3vh";
                }
            }
        } else if (talkingStatus && !status.isTalking) {
            talkingStatus = false;
            doc.getElementById('voice-box').style.borderWidth = "0.2vh";
            if (radioStatus) {
                doc.getElementById('voice-radio-box').style.borderWidth = "0.2vh";
            }
        }
    }
}