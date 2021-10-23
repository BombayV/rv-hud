const doc = document;

// Hud Main
const hudSlider = doc.getElementById('hud-slider');
const hudSelector = doc.getElementById('hud-selector');
const hudSwitch = doc.getElementById('hud-switch');
const hudContainer = doc.getElementById('hud-container');

// Bars
const hudCinema = doc.getElementById('hud-bars');
const hudCinemaSliderText = doc.getElementById('bars-slider-text');
const hudCinemaSlider = doc.getElementById('bars-slider');
const hudCinemaPicker = doc.getElementById('bars-colorpicker');

// Position
const hudDirection = doc.getElementById('hud-column');

let hudStatus = true;
let hudCinemaStatus = false;
let hudCurrSelector = 'color';
let hudCurrClass = 'hud-color';
let hudAlpha = '1.0';
let hudColumnStatus = false;
let hudDragStatus = false;

// Main hud
hudSlider.addEventListener('input', e => {
    hudAlpha = e.target.value;
    hudAlpha < 10 ? hudAlpha = `0.${hudAlpha}` : hudAlpha = '1.0';
    doc.getElementById('hud-slider-text').textContent = hudAlpha;
    doc.getElementById('hud-colorpicker-text').textContent = setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha);
})

hudSlider.addEventListener('change', e => {
    let elBlock = doc.getElementsByClassName(hudCurrClass);
    for (let i = 0; i < elBlock.length; i++) {
        if (hudCurrSelector === 'boxShadow') {
            elBlock[i].style[hudCurrSelector] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha)}`
        } else {
            elBlock[i].style[hudCurrSelector] = setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha);
        }
    }
    storeId(`hud-${hudCurrSelector}`, setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha))
    storeId('hud-alpha', hudAlpha)
}, false)

hudSelector.addEventListener('change', e => {
    hudCurrSelector = e.target.value, hudCurrClass = `hud-${e.target.value}`;
    let currColor = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector])
    doc.getElementById('hud-colorpicker').value = currColor;
    doc.getElementById('hud-colorpicker-visual').value = currColor;
    doc.getElementById('hud-colorpicker-text').textContent = setOpacity(currColor, hudAlpha);
})

hudSwitch.addEventListener('click', e => {
	hudStatus = e.target.checked;
	if (hudStatus) {
        setTimeout(function() {
            hudContainer.style.animation = 'none';
        }, 600)
        hudContainer.style.animation = 'spin 0.5s';
        hudContainer.style.opacity = '1';
        doc.getElementById('hud-switch-text').textContent = 'Activo';
	} else {
        setTimeout(function() {
            hudContainer.style.animation = 'none';
        }, 600)
        hudContainer.style.animation = 'spin 0.5s';
        hudContainer.style.opacity = '0';
        doc.getElementById('hud-switch-text').textContent = 'Inactivo';
	}
    storeId('hud-switch', hudStatus)
})

// Cinema hud
hudCinemaSlider.addEventListener('input', e => {
    doc.getElementById('top').style.height = `${e.target.value}%`;
    doc.getElementById('bottom').style.height = `${e.target.value}%`;
    hudCinemaSliderText.textContent = `${parseInt(e.target.value)}%`
})

hudCinemaSlider.addEventListener('change', e => {
    storeId('hudBarsHeight', e.target.value);
})

hudCinema.addEventListener('click', () => {
    hudCinemaStatus = hudCinema.checked
    if (hudCinemaStatus) {
        doc.getElementById('top').style.animation = 'slideDown 0.3s forwards';
        doc.getElementById('bottom').style.animation = 'slideUp 0.3s forwards';
        doc.getElementById('hud-bars-text').textContent = 'Activo';
        setTimeout(function() {
            doc.getElementById('cinematic').style.animation = 'none';
        }, 310)
        doc.getElementById('cinematic').style.display = 'block';
        //Hide everything
    } else {
        doc.getElementById('top').style.animation = 'slideBackUp 0.3s forwards';
        doc.getElementById('bottom').style.animation = 'slideBackDown 0.3s forwards';
        doc.getElementById('hud-bars-text').textContent = 'Inactivo';
        setTimeout(function() {
            doc.getElementById('cinematic').style.animation = 'none';
            doc.getElementById('cinematic').style.display = 'none';
        }, 310)
        //Show everything
    }
    storeId('hudBarsStatus', hudCinemaStatus)
})

hudCinemaPicker.addEventListener('input', e => {
    doc.getElementById('bars-colorpicker-text').textContent = e.target.value;
    doc.getElementById('bars-colorpicker-visual').value = e.target.value;
})

hudCinemaPicker.addEventListener('change', e => {
    doc.getElementById('top').style.backgroundColor = e.target.value;
    doc.getElementById('bottom').style.backgroundColor = e.target.value;
    storeId('hudBarsColor', e.target.value);
})

// Position Hud
hudDirection.addEventListener('click', e => {
    hudColumnStatus = e.target.checked;
    if (hudColumnStatus) {
        doc.getElementById('hud-column-text').textContent = 'Fila';
        hudContainer.style.flexDirection = 'row';
    } else {
        doc.getElementById('hud-column-text').textContent = 'Columna';
        hudContainer.style.flexDirection = 'column';
    }
    storeId('hudColumn', hudColumnStatus);
})

doc.getElementById('hud-btn-drag').addEventListener('click', () => {
    $("#hud-container").animate({ top: "0%", left: "0%" });
    clearId('top-hud');
    clearId('left-hud');
})

doc.getElementById('hud-drag').addEventListener('click', e => {
    hudDragStatus = e.target.checked;
    if (hudDragStatus) {
        doc.getElementById('hud-drag-text').textContent = 'Activo';
        $("#hud-container").draggable({ disabled: true});
    } else {
        doc.getElementById('hud-drag-text').textContent = 'Inactivo';
        $("#hud-container").draggable({ disabled: false});
    }
    storeId('hud-drag-status', hudDragStatus)
})

$('#hud-container').draggable({containment: "#ui-wrapper", scroll: false})

$("#hud-container").on("dragstop", function(_, ui) {
    storeId('top-hud', ui.position.top);
    storeId('left-hud', ui.position.left);
});

doc.getElementById('reset-hud').addEventListener('click', e => {
    $("#hud-container").animate({ top: "0%", left: "0%" });
    hudSelector.value = hudSelector[0].value;
    setTimeout(function() {
        hudContainer.style.animation = 'none';
    }, 600)
    hudContainer.style.opacity = '1';
    hudSwitch.checked = true;
    doc.getElementById('hud-switch-text').textContent = 'Activo';
    doc.getElementById('hud-column-text').textContent = 'Columna';
    doc.getElementById('hud-column').checked = false;
    hudContainer.style.flexDirection = 'column';
    doc.getElementById('top').style.animation = 'slideBackUp 0.3s forwards';
    doc.getElementById('bottom').style.animation = 'slideBackDown 0.3s forwards';
    doc.getElementById('hud-bars-text').textContent = 'Inactivo';
    hudCinemaSlider.value = 10;
    hudCinemaSliderText.textContent = '10%';
    hudCinemaPicker.value = '#000000'
    hudCinema.checked = false
    setTimeout(function() {
        doc.getElementById('cinematic').style.animation = 'none';
        doc.getElementById('cinematic').style.display = 'none';
    }, 310)
    doc.getElementById('bars-colorpicker-text').textContent = '#000000';
    doc.getElementById('bars-colorpicker-visual').value = '#000000';
    doc.getElementById('hud-drag').checked = false;
    doc.getElementById('hud-drag-text').textContent = 'Inactivo';
    hudSlider.value = 10;
    doc.getElementById('hud-slider-text').textContent = '1.0';
    doc.getElementById('hud-colorpicker-text').textContent = '#ffffffff';
    doc.getElementById('hud-colorpicker').value = '#ffffff';
    doc.getElementById('hud-colorpicker-visual').value = '#ffffff';
    updateColors('background-color', 'hud', '#000000');
    updateColors('color', 'hud', '#ffffff');
    updateColors('borderColor', 'hud', '#ffffff');
    updateColors('boxShadow', 'hud', '#000000');

    // Set all vars to default
    hudStatus = true;
    hudCinemaStatus = false;
    hudCurrSelector = 'color';
    hudCurrClass = 'hud-color';
    hudAlpha = '1.0';
    hudColumnStatus = false;
    hudDragStatus = false;

    // Reset all items to default
    clearId('hud-alpha');
    clearId('hud-color');
    clearId('hud-background-color');
    clearId('hud-borderColor');
    clearId('hud-boxShadow');
    clearId('hud-switch');
    clearId('top-hud');
    clearId('left-hud');
    clearId('hudBarsHeight');
    clearId('hudBarsColor');
    clearId('hudBarsStatus');
    clearId('hudColumn');
    clearId('hud-drag-status');
})

// Functions
function startColorpicker(colorpicker, visual, text) {
    doc.getElementById(visual).value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById(colorpicker).addEventListener('change', e => updateType(e, hudCurrClass, hudCurrSelector), false);
    doc.getElementById(colorpicker).addEventListener('input', e => updateColorPicker(e, visual, text), false);
    doc.getElementById(colorpicker).select();
}

function updateType(e, className, styleName) {
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

function updateColorPicker(e, visual, text) {
    let color = e.target.value;
    doc.getElementById(visual).value = color;
    doc.getElementById(text).textContent = setOpacity(color, hudAlpha);
}

const restoreHud = e => {
    (getId('hud-alpha') != null) ? (hudAlpha = getId('hud-alpha'), doc.getElementById('hud-slider-text').textContent = getId('hud-alpha'), (getId('hud-alpha') > 0.9) ? hudSlider.value = 10 : hudSlider.value = getId('hud-alpha').substring(2)) : false;
    (getId('hud-color') != null) ? (updateColors('color', 'hud', getId('hud-color')), doc.getElementById('hud-colorpicker-visual').value = doc.getElementById('hud-colorpicker').value  = getId('hud-color').substr(0, '7'), doc.getElementById('hud-colorpicker-text').textContent = getId('hud-color')) : doc.getElementById('hud-colorpicker').value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    (getId('hud-background-color') != null) ? (updateColors('background-color', 'hud', getId('hud-background-color'))) : false;
    (getId('hud-borderColor') != null) ? (updateColors('borderColor', 'hud', getId('hud-borderColor'))) : false;
    (getId('hud-boxShadow') != null) ? (updateColors('boxShadow', 'hud', getId('hud-boxShadow'))) : false;
    (getBool('hud-switch') != null) ? hudStatus = getBool('hud-switch') : hudStatus;
    hudSwitch.checked = hudStatus;
    if (!hudStatus) {
        setTimeout(function() {
            hudContainer.style.animation = 'none';
        }, 600)
        hudContainer.style.animation = 'spin 0.5s';
        hudContainer.style.opacity = '0';
        doc.getElementById('hud-switch-text').textContent = 'Inactivo';
    }

    // Bars
    (getId('hudBarsHeight')) != null ? (doc.getElementById('top').style.height = doc.getElementById('bottom').style.height = hudCinemaSliderText.textContent = `${getId('hudBarsHeight')}%`, hudCinemaSlider.value = getId('hudBarsHeight')) : false;
    (getId('hudBarsColor')) != null ? (doc.getElementById('bars-colorpicker-text').textContent = doc.getElementById('bars-colorpicker-visual').value = hudCinemaPicker.value = doc.getElementById('top').style.backgroundColor = doc.getElementById('bottom').style.backgroundColor = getId('hudBarsColor')) : false;
    (getBool('hudBarsStatus')) != null ? hudCinemaStatus = getBool('hudBarsStatus') : hudCinemaStatus;
    hudCinema.checked = hudCinemaStatus;
    if (hudCinemaStatus) {
        doc.getElementById('top').style.animation = 'slideDown 0.3s forwards';
        doc.getElementById('bottom').style.animation = 'slideUp 0.3s forwards';
        setTimeout(function() {
            doc.getElementById('cinematic').style.animation = 'none';
        }, 310)
        doc.getElementById('cinematic').style.display = 'block';
        doc.getElementById('hud-bars-text').textContent = 'Activo';
    }

    // Position
    (getBool('hudColumn') != null) ? hudColumnStatus = getBool('hudColumn') : hudColumnStatus;
    hudDirection.checked = hudColumnStatus;
    if (hudColumnStatus) {
        doc.getElementById('hud-column-text').textContent = 'Fila';
        hudContainer.style.flexDirection = 'row';
    }

    (getId('top-hud') && getId('left-hud') != null) ? $("#hud-container").animate({ top: getId('top-hud'), left: getId('left-hud')}) : false;

    (getBool('hud-drag-status') != null) ? (hudDragStatus = getBool('hud-drag-status'), $("#hud-container").draggable({ disabled: getBool('hud-drag-status')})) : hudDragStatus;
    doc.getElementById('hud-drag').checked = hudDragStatus;
    if (hudDragStatus) {
        doc.getElementById('hud-drag-text').textContent = 'Activo';
    }
}

function updateHud(status) {
    doc.getElementById('hud-health').style.height = `${status.health}%`;
    doc.getElementById('hud-armor').style.height = `${status.armor}%`;
    doc.getElementById('hud-stamina').style.height = `${status.stamina}%`;
    doc.getElementById('hud-hunger').style.height = `${status.hunger}%`;
    doc.getElementById('hud-thirst').style.height = `${status.thirst}%`;
    doc.getElementById('hud-stress').style.height = `${status.stress}%`;  
}

const updateColors = (className, type, color) => {
    let elBlock = doc.getElementsByClassName(`${type}-${className}`);
    for (let i = 0; i < elBlock.length; i++) {
        if (`${type}-${className}` == `${type}-boxShadow`) {
            elBlock[i].style[className] = `0 0.15vh 0.05vh 0.2vh ${color}`
        } else {
            elBlock[i].style[className] = color;
        }
    }
}