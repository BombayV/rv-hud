const doc = document;

const hudSlider = doc.getElementById('hud-slider');
const hudSelector = doc.getElementById('hud-selector');
const hudElem = doc.getElementById('hud-element');

let hudCurrSelector = 'color';
let hudCurrClass = 'hud-color';
let hudAlpha = '1.0';

hudSlider.addEventListener('input', e => {
    hudAlpha = e.target.value;
    hudAlpha < 10 ? hudAlpha = `0.${hudAlpha}` : hudAlpha = '1.0';
    doc.getElementById('hud-slider-text').textContent = hudAlpha;
    doc.getElementById('hud-colorpicker-text').textContent = setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha);
})

hudSlider.addEventListener('change', e => {
    let elBlock = doc.getElementsByClassName(hudCurrClass);
    for (let i = 0; i < elBlock.length; i++) {
        if (hudCurrSelector == 'boxShadow') {
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

this.window.addEventListener('load', startColorpicker('hud-colorpicker', 'hud-colorpicker-visual', 'hud-colorpicker-text'), false)

this.window.addEventListener('load', function() {
    restoreHud()
})

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