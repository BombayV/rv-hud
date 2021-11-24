const VoiceNames = ['Whisper', 'Normal', 'Loud']

let radioStatus = false;
let mutedStatus = false;
let talkingStatus = false;

const radioText = doc.getElementById('voice-radio-mode');
const radio = doc.getElementById('voice-radio-cont');

let voiceStatus = true;
let voiceVisual = false;
let voiceCinemaStatus = false;
let voiceCurrSelector = 'color';
let voiceCurrClass = 'hud-color';
let voiceAlpha = '1.0';
let voiceColumnStatus = false;
let dragVoiceStatus = false;

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

$('#voice-container').draggable({containment: "#ui-wrapper", scroll: false})

$("#voice-container").on("dragstop", function(_, ui) {
    storeId('top-voice', ui.position.top);
    storeId('left-voice', ui.position.left);
});

doc.getElementById('voice-drag').addEventListener('click', () => {
    if (!dragVoiceStatus) {
        dragVoiceStatus = true;
        $("#voice-container").draggable({})
    } else {
        dragVoiceStatus = false;
    }
})

doc.getElementById('voice-btn-drag').addEventListener('click', () => {
    $("#voice-container").animate({top: '91%', left: '93%'});
    clearId('top-voice');
    clearId('left-voice');
})

doc.getElementById('voice-column').addEventListener('click', () => {
    const top = doc.getElementById('voice-radio-mode');
    const bottom = doc.getElementById('voice-mode');
    if (!voiceVisual) {
        top.style.opacity = '0';
        bottom.style.opacity = '0';
        voiceVisual = true;
    } else {
        top.style.opacity = '1';
        bottom.style.opacity = '1';
        voiceVisual = false;
    }
})

const restoreVoice = () => {
    // Position
    (getId('top-voice') && getId('left-voice') != null) ? $("#voice-container").animate({ top: getId('top-voice'), left: getId('left-voice')}) : false;

}

function startColorpickerV(colorpicker, visual, text) {
    doc.getElementById(visual).value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById(colorpicker).addEventListener('change', e => updateType(e, hudCurrClass, hudCurrSelector), false);
    doc.getElementById(colorpicker).addEventListener('input', e => updateColorPicker(e, visual, text), false);
    doc.getElementById(colorpicker).select();
}

function updateTypeV(e, className, styleName) {
    let elBlock = doc.getElementsByClassName(className);
    for (let i = 0; i < elBlock.length; i++) {
        if (styleName == 'boxShadow') {
            elBlock[i].style[styleName] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(e.target.value, hudAlpha)}`
        } else {
            elBlock[i].style[styleName] = setOpacity(e.target.value, hudAlpha);
        }
    }
    storeId(`hud-${styleName}`, setOpacity(e.target.value, hudAlpha))
}

function updateColorPickerV(e, visual, text) {
    let color = e.target.value;
    doc.getElementById(visual).value = color;
    doc.getElementById(text).textContent = setOpacity(color, hudAlpha);
}

const updateColorsV = (className, type, color) => {
    let elBlock = doc.getElementsByClassName(`${type}-${className}`);
    for (let i = 0; i < elBlock.length; i++) {
        if (`${type}-${className}` == `${type}-boxShadow`) {
            elBlock[i].style[className] = `0 0.15vh 0.05vh 0.2vh ${color}`
        } else {
            elBlock[i].style[className] = color;
        }
    }
}