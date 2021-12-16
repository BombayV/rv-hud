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
let talkingColor = doc.getElementById('voice-box').style.backgroundColor
let talkingAlpha = '1.0'

doc.getElementById('voice-slider').addEventListener('input', e => {
    voiceAlphaOne = e.target.value;
    voiceAlphaOne < 10 ? voiceAlphaOne = `0.${voiceAlphaOne}` : voiceAlphaOne = '1.0';
    doc.getElementById('voice-slider-text').textContent = voiceAlphaOne;
    doc.getElementById('voice-colorpicker-text').textContent = setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne);
})

doc.getElementById('talking-slider').addEventListener('input', e => {
    talkingSize = `0.${(e.target.value)}vh`;
    doc.getElementById('talking-slider-text').textContent = talkingSize;
    storeId('talking-size', talkingSize)
})

doc.getElementById('talking-slider-alpha').addEventListener('input', e => {
    talkingAlpha = e.target.value;
    talkingAlpha < 10 ? talkingAlpha = `0.${talkingAlpha}` : talkingAlpha = '1.0';
    doc.getElementById('talking-slider-text-alpha').textContent = talkingAlpha;
    doc.getElementById('talking-colorpicker-text').textContent = setOpacity(doc.getElementById('talking-colorpicker').value, talkingAlpha);
    storeId('talking-alpha', talkingAlpha)
})

doc.getElementById('voice-slider').addEventListener('change', e => {
    let elBlock = doc.getElementsByClassName(voiceCurrClass);
    for (let i = 0; i < elBlock.length; i++) {
        if (voiceCurrSelector === 'boxShadow') {
            elBlock[i].style[voiceCurrSelector] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(doc.getElementById('voice-colorpicker').value, voiceAlphaOne)}`
        } else {
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

doc.getElementById('talking-colorpicker').addEventListener('input', e => {
    doc.getElementById('talking-colorpicker-visual').value = e.target.value
    doc.getElementById('talking-colorpicker-text').textContent = setOpacity(e.target.value, talkingAlpha);
    talkingColor = setOpacity(e.target.value, talkingAlpha)
    storeId('talking-color', talkingColor)
}, false);

doc.getElementById('talking-colorpicker-visual').value = '#ffffff';
doc.getElementById('talking-colorpicker-text').textContent = '#ffffff';

doc.getElementById('talking-colorpicker').select();

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
                doc.getElementById('voice-box').style.borderWidth = talkingSize;
                doc.getElementById('voice-box').style.borderColor = talkingColor;
                if (radioStatus) {
                    doc.getElementById('voice-radio-box').style.borderWidth = talkingSize;
                    doc.getElementById('voice-box').style.borderColor = talkingColor;
                }
            }
        } else if (talkingStatus && !status.isTalking) {
            talkingStatus = false;
            doc.getElementById('voice-box').style.borderWidth = "0.2vh";
            doc.getElementById('voice-box').style.borderColor = getId('voice-borderColor');
            if (radioStatus) {
                doc.getElementById('voice-radio-box').style.borderWidth = "0.2vh" || '#ffffff';
                doc.getElementById('voice-box').style.borderColor = getId('voice-borderColor') || '#ffffff';
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
    storeId('voice-drag-status', dragVoiceStatus)
})

doc.getElementById('voice-btn-drag').addEventListener('click', () => {
    $("#voice-container").animate({top: '100%', left: '93%'});
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
    storeId('voice-min', voiceVisual)
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
    storeId('voice-switch', voiceStatus)
})

doc.getElementById('reset-voice').addEventListener('click', e => {
    $("#voice-container").animate({top: '100%', left: '93%'});
    doc.getElementById('voice-selector').value = doc.getElementById('voice-selector')[0].value;

    doc.getElementById('voice-switch').checked = true;
    doc.getElementById('voice-switch-text').textContent = 'Activo';
    doc.getElementById('voice-container').style.display = 'flex';

    doc.getElementById('voice-drag').checked = false;
    doc.getElementById('voice-drag-text').textContent = 'Inactivo';
    $("#voice-container").draggable({disabled: false})

    doc.getElementById('voice-column').checked = false;
    doc.getElementById('voice-column-text').textContent = 'Minimizar';
    const top = doc.getElementById('voice-radio-mode');
    const bottom = doc.getElementById('voice-mode');
    top.style.opacity = '1';
    bottom.style.opacity = '1';

    doc.getElementById('talking-slider-text-alpha').textContent = '1.0';
    doc.getElementById('talking-slider-alpha').value = 10;
    doc.getElementById('talking-slider-text').textContent = '0.3vh';
    doc.getElementById('talking-slider').value = 30;
    doc.getElementById('talking-colorpicker-text').textContent = '#ffffff';
    doc.getElementById('talking-colorpicker-visual').value = '#ffffff';
    doc.getElementById('talking-colorpicker').value = '#ffffff';
    doc.getElementById('voice-drag').checked = false;
    doc.getElementById('voice-drag-text').textContent = 'Inactivo';
    doc.getElementById('voice-slider').value = 10;
    doc.getElementById('voice-slider-text').textContent = '1.0';
    doc.getElementById('voice-colorpicker-text').textContent = '#ffffffff';
    doc.getElementById('voice-colorpicker').value = '#ffffff';
    doc.getElementById('voice-colorpicker-visual').value = '#ffffff';
    updateVColors('background-color', 'voice', '#000000');
    updateVColors('color', 'voice', '#ffffff');
    updateVColors('borderColor', 'voice', '#ffffff');
    updateVColors('boxShadow', 'voice', '#000000');

    // Set all vars to default
    voiceStatus = true;
    voiceVisual = false;
    voiceCurrSelector = 'color';
    voiceCurrClass = 'voice-color';
    voiceAlphaOne = '1.0';
    dragVoiceStatus = false;
    talkingSize = '0.3vh'
    talkingColor = doc.getElementById('voice-box').style.backgroundColor
    talkingAlpha = '1.0'

    // Reset all items to default
    clearId('voice-one-alpha');
    clearId('voice-color');
    clearId('voice-background-color');
    clearId('voice-borderColor');
    clearId('voice-boxShadow');
    clearId('voice-switch');
    clearId('voice-min')
    clearId('top-voice');
    clearId('left-voice');
    clearId('talking-size');
    clearId('talking-alpha');
    clearId('talking-color');
    clearId('voice-drag-status');
})

const restoreVoice = () => {
    (getId('voice-one-alpha') != null) ? (voiceAlphaOne = getId('voice-one-alpha'), doc.getElementById('voice-slider-text').textContent = getId('voice-one-alpha'), (getId('voice-one-alpha') > 0.9) ? doc.getElementById('voice-slider').value = 10 : doc.getElementById('voice-slider').value = getId('voice-one-alpha').substring(2)) : false;

    // Position
    (getId('top-voice') && getId('left-voice') != null) ? $("#voice-container").animate({ top: getId('top-voice'), left: getId('left-voice')}) : false;
    (getId('voice-color') != null) ? (updateVColors('color', 'voice', getId('voice-color')), doc.getElementById('voice-colorpicker-visual').value = doc.getElementById('voice-colorpicker').value = getId('voice-color').substr(0, '7'), doc.getElementById('voice-colorpicker-text').textContent = getId('voice-color')) : doc.getElementById('voice-colorpicker').value = rgba2hex(getComputedStyle(doc.getElementsByClassName(voiceCurrClass)[1])[voiceCurrSelector]);
    (getId('voice-background-color') != null) ? (updateColors('background-color', 'voice', getId('voice-background-color'))) : false;
    (getId('voice-borderColor') != null) ? (updateColors('borderColor', 'voice', getId('voice-borderColor'))) : false;
    (getId('voice-boxShadow') != null) ? (updateColors('boxShadow', 'voice', getId('voice-boxShadow'))) : false;

    (getBool('voice-switch') != null) ? voiceStatus = getBool('voice-switch') : voiceStatus;
    doc.getElementById('voice-switch').checked = voiceStatus;
    if (!voiceStatus) {
        doc.getElementById('voice-switch-text').textContent = 'Inactivo';
        doc.getElementById('voice-container').style.display = 'none';
    }

    (getBool('voice-drag-status') != null) ? (dragVoiceStatus = getBool('voice-drag-status'), $("#voice-container").draggable({ disabled: getBool('voice-drag-status')})) : dragVoiceStatus;
    doc.getElementById('voice-drag').checked = dragVoiceStatus;
    if (dragVoiceStatus) {
        doc.getElementById('voice-drag-text').textContent = 'Activo';
    }

    (getBool('voice-min') != null) ? (voiceVisual = getBool('voice-min')) : voiceVisual;
    doc.getElementById('voice-column').checked = voiceVisual
    const top = doc.getElementById('voice-radio-mode');
    const bottom = doc.getElementById('voice-mode');
    if (voiceVisual) {
        doc.getElementById('voice-column-text').textContent = 'Maximizar';
        top.style.opacity = '0';
        bottom.style.opacity = '0';
    }

    (getId('talking-size') != null) ? (talkingSize = getId('talking-size'), doc.getElementById('talking-slider-text').textContent = talkingSize, doc.getElementById('talking-slider').value = talkingSize.slice(2, 3) + talkingSize.slice(3, 4)): talkingSize;
    (getId('talking-alpha') != null) ? (talkingAlpha = getId('talking-alpha'), doc.getElementById('talking-slider-text-alpha').textContent = talkingAlpha, (getId('talking-alpha') > 0.9) ? doc.getElementById('talking-slider-alpha').value = 10 : doc.getElementById('talking-slider-alpha').value = getId('talking-alpha').substring(2)): talkingAlpha;

    (getId('talking-color') != null) ? (talkingColor = getId('talking-color'), doc.getElementById('talking-colorpicker-text').textContent = talkingColor, doc.getElementById('talking-colorpicker-visual').value = getId('talking-color').substr(0, '7')): talkingColor;
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