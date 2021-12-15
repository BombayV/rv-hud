const VoiceNames = ['Whisper', 'Normal', 'Loud']

let radioStatus = false;
let mutedStatus = false;
let talkingStatus = false;

const radioText = doc.getElementById('voice-radio-mode');
const radio = doc.getElementById('voice-radio-cont');

let voiceStatus = true;
let voiceVisual = false;
let voiceCurrSelector = 'color';
let voiceCurrClass = 'voice-color';
let voiceAlphaOne = '1.0';
let dragVoiceStatus = false;

let talkingSize = '0.3vh'

doc.getElementById('voice-slider').addEventListener('input', e => {
    voiceAlphaOne = e.target.value;
    voiceAlphaOne < 10 ? voiceAlphaOne = `0.${voiceAlphaOne}` : voiceAlphaOne = '1.0';
    doc.getElementById('voice-slider-text').textContent = voiceAlphaOne;
    doc.getElementById('voice-colorpicker-text').textContent = setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne);
})

doc.getElementById('talking-slider').addEventListener('input', e => {
    talkingSize = (e.target.value);
    doc.getElementById('voice-slider-text').textContent = voiceAlphaOne;
    doc.getElementById('voice-colorpicker-text').textContent = setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne);
})

doc.getElementById('voice-slider').addEventListener('change', e => {
    let elBlock = doc.getElementsByClassName(voiceCurrClass);
    for (let i = 0; i < elBlock.length; i++) {
        if (voiceCurrSelector === 'boxShadow') {
            elBlock[i].style[voiceCurrSelector] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne)}`
        } else {
            console.log(doc.getElementById('voice-colorpicker').value)
            console.log(setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne))
            elBlock[i].style[voiceCurrSelector] = setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne);
        }
    }
    storeId(`voice-${voiceCurrSelector}`, setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne))
    storeId('voice-one-alpha', voiceAlphaOne)
}, false)

doc.getElementById('voice-selector').addEventListener('change', e => {
    voiceCurrSelector = e.target.value, voiceCurrClass = `voice-${e.target.value}`;
    let currColor = rgba2hex(getComputedStyle(doc.getElementsByClassName(voiceCurrClass)[1])[voiceCurrSelector])
    doc.getElementById('voice-colorpicker').value = currColor;
    doc.getElementById('voice-colorpicker-visual').value = currColor;
    doc.getElementById('voice-colorpicker-text').textContent = setOpacity(currColor, voiceAlphaOne);
})

function startVColorpicker(colorpicker, visual, text) {
    doc.getElementById(visual).value = rgba2hex(getComputedStyle(doc.getElementsByClassName(voiceCurrClass)[1])[voiceCurrSelector]);
    doc.getElementById(colorpicker).addEventListener('change', e => updateVType(e, voiceCurrClass, voiceCurrSelector), false);
    doc.getElementById(colorpicker).addEventListener('input', e => updateVColorPicker(e, visual, text), false);
    doc.getElementById(colorpicker).select();
}

function updateVType(e, className, styleName) {
    let elBlock = doc.getElementsByClassName(className);
    for (let i = 0; i < elBlock.length; i++) {
        if (styleName == 'boxShadow') {
            elBlock[i].style[styleName] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(e.target.value, voiceAlphaOne)}`
        } else {
            elBlock[i].style[styleName] = setOpacity(e.target.value, voiceAlphaOne);
        }
    }
    storeId(`voice-${styleName}`, setOpacity(e.target.value, voiceAlphaOne))
}

function updateVColorPicker(e, visual, text) {
    let color = e.target.value;
    doc.getElementById(visual).value = color;
    doc.getElementById(text).textContent = setOpacity(color, voiceAlphaOne);
}

function updateVoice(status) {
    doc.getElementById('voice-mode').textContent = VoiceNames[status.modeStatus - 1];
    if (voiceStatus) {
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
        doc.getElementById('voice-drag-text').textContent = 'Activo';
        $("#voice-container").draggable({disabled: true})
    } else {
        dragVoiceStatus = false;
        doc.getElementById('voice-drag-text').textContent = 'Inactivo';
        $("#voice-container").draggable({disabled: false})
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
        doc.getElementById('voice-column-text').textContent = 'Maximizar';
        top.style.opacity = '0';
        bottom.style.opacity = '0';
        voiceVisual = true;
    } else {
        doc.getElementById('voice-column-text').textContent = 'Minimizar';
        top.style.opacity = '1';
        bottom.style.opacity = '1';
        voiceVisual = false;
    }
})

doc.getElementById('voice-switch').addEventListener('click', () => {
    if (!voiceStatus) {
        voiceStatus = true;
        doc.getElementById('voice-switch-text').textContent = 'Activo';
        doc.getElementById('voice-container').style.display = 'flex';
    } else {
        voiceStatus = false;
        doc.getElementById('voice-switch-text').textContent = 'Inactivo';
        doc.getElementById('voice-container').style.display = 'none';
    }
})

const restoreVoice = () => {
    // Position
    (getId('top-voice') && getId('left-voice') != null) ? $("#voice-container").animate({ top: getId('top-voice'), left: getId('left-voice')}) : false;
    (getId('voice-color') != null) ? (updateVColors('color', 'voice', getId('voice-color')), doc.getElementById('voice-colorpicker-visual').value = doc.getElementById('voice-colorpicker').value = getId('voice-color').substr(0, '7'), doc.getElementById('voice-colorpicker-text').textContent = getId('voice-color')) : doc.getElementById('voice-colorpicker').value = rgba2hex(getComputedStyle(doc.getElementsByClassName(voiceCurrClass)[1])[voiceCurrSelector]);
}

const updateVColors = (className, type, color) => {
    let elBlock = doc.getElementsByClassName(`${type}-${className}`);
    for (let i = 0; i < elBlock.length; i++) {
        if (`${type}-${className}` == `${type}-boxShadow`) {
            elBlock[i].style[className] = `0 0.15vh 0.05vh 0.2vh ${color}`
        } else {
            elBlock[i].style[className] = color;
        }
    }
}