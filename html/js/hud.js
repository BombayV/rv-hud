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
    doc.getElementById('hud-colorpicker-text').textContent = setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha);
})

hudSlider.addEventListener('change', e => {
    let elBlock = doc.getElementsByClassName(hudCurrClass);
    for (let i = 0; i < elBlock.length; i++) {
        if (hudCurrSelector == 'boxShadow') {
            elBlock[i].style[hudCurrSelector] = `0 0.15vh 0.05vh 0.2vh ${doc.getElementById('hud-colorpicker').value}`
        } else {
            elBlock[i].style[hudCurrSelector] = setOpacity(doc.getElementById('hud-colorpicker').value, hudAlpha);
        }
    }
}, false)

hudSelector.addEventListener('change', e => {
    hudCurrSelector = e.target.value, hudCurrClass = `hud-${e.target.value}`;
    doc.getElementById('hud-colorpicker').value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById('hud-colorpicker-visual').value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById('hud-colorpicker-text').textContent = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
})

this.window.addEventListener('load', startColorpicker('hud-colorpicker', 'hud-colorpicker-visual', 'hud-colorpicker-text'), false)

function startColorpicker(colorpicker, visual, text) {
    doc.getElementById(colorpicker).value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById(visual).value = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById(text).textContent = rgba2hex(getComputedStyle(doc.getElementsByClassName(hudCurrClass)[1])[hudCurrSelector]);
    doc.getElementById(colorpicker).addEventListener('change', e => updateType(e, hudCurrClass, hudCurrSelector), false);
    doc.getElementById(colorpicker).addEventListener('input', e => updateColorPicker(e, visual, text), false);
    doc.getElementById(colorpicker).select();
}

function updateType(e, className, styleName) {
    let elBlock = doc.getElementsByClassName(className);
    for (let i = 0; i < elBlock.length; i++) {
        if (styleName == 'boxShadow') {
            elBlock[i].style[styleName] = `0 0.15vh 0.05vh 0.2vh ${e.target.value}`
        } else {
            elBlock[i].style[styleName] = setOpacity(e.target.value, hudAlpha);
        }
    }
}

function updateColorPicker(e, visual, text) {
    let color = e.target.value;
    doc.getElementById(visual).value = color;
    doc.getElementById(text).textContent = setOpacity(color, hudAlpha);
}