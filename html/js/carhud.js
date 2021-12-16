const carhud = doc.getElementById('carhud');

let carhudStatus = false;

function updateCarhud(status) {
    if (status) {
        if (status.class !== 13) {
            if (!carhudStatus) {
                carhudStatus = true;
                carhud.style.display = 'flex';
            }
            doc.getElementById('carhud-rpm').textContent = status.rpm;
            doc.getElementById('carhud-gear').textContent = status.gear;
            doc.getElementById('carhud-fuel').textContent = status.fuel;
            doc.getElementById('carhud-damage').textContent = status.damage;
            let speed = status.speed;
            if (speed === 0) {
                doc.getElementById('carhud-speed').textContent = '000';
            } else if (speed > 0 && speed < 10) {
                doc.getElementById('carhud-speed').textContent = `00${status.speed}`;
            } else if (speed > 10 && speed < 100) {
                doc.getElementById('carhud-speed').textContent = `0${status.speed}`;
            } else {
                doc.getElementById('carhud-speed').textContent = status.speed;
            }
        }
    } else {
        if (carhudStatus) {
            carhudStatus = false;
            carhud.style.display = 'none';
        }
    }
}

let cdVisual = true;
let cdMin = true;
let cdAlpha = '1.0';
let cdCurrSelector = 'color';
let cdCurrClass = 'cd-color';
let dragCdStatus = false;

doc.getElementById('cd-slider').addEventListener('change', e => {
    let elBlock = doc.getElementsByClassName(cdCurrClass);
    for (let i = 0; i < elBlock.length; i++) {
        if (cdCurrSelector === 'boxShadow') {
            elBlock[i].style[cdCurrSelector] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(doc.getElementById('cd-colorpicker').value, cdAlpha)}`
        } else {
            elBlock[i].style[cdCurrSelector] = setOpacity(doc.getElementById('cd-colorpicker').value, cdAlpha);
        }
    }
    storeId(`cd-${cdCurrSelector}`, setOpacity(doc.getElementById('cd-colorpicker').value, cdAlpha))
    storeId('cd-alpha', cdAlpha)
}, false)

doc.getElementById('cd-selector').addEventListener('change', e => {
    cdCurrSelector = e.target.value, cdCurrClass = `cd-${e.target.value}`;
    let currColor = rgba2hex(getComputedStyle(doc.getElementsByClassName(cdCurrClass)[1])[cdCurrSelector])
    doc.getElementById('cd-colorpicker').value = currColor;
    doc.getElementById('cd-colorpicker-visual').value = currColor;
    doc.getElementById('cd-colorpicker-text').textContent = setOpacity(currColor, cdAlpha);
})

doc.getElementById('cd-slider').addEventListener('input', e => {
    cdAlpha = e.target.value;
    cdAlpha < 10 ? cdAlpha = `0.${cdAlpha}` : cdAlpha = '1.0';
    doc.getElementById('cd-slider-text').textContent = cdAlpha;
    doc.getElementById('cd-colorpicker-text').textContent = setOpacity(doc.getElementById('cd-colorpicker').value, cdAlpha);
})

doc.getElementById('cd-switch').addEventListener('click', () => {
    if (!cdVisual) {
        cdVisual = true;
        doc.getElementById('cd-switch-text').textContent = 'Activo';
        doc.getElementById('carhud').style.display = 'flex';
    } else {
        cdVisual = false;
        doc.getElementById('cd-switch-text').textContent = 'Inactivo';
        doc.getElementById('carhud').style.display = 'none';
    }
    storeId('cd-visual', cdVisual);
})

$('#carhud').draggable({containment: "#ui-wrapper", scroll: false})

$("#carhud").on("dragstop", function(_, ui) {
    storeId('top-cd', ui.position.top);
    storeId('left-cd', ui.position.left);
});

doc.getElementById('cd-btn-drag').addEventListener('click', () => {
    $("#carhud").animate({top: '0', left: '0'});
    clearId('top-cd');
    clearId('left-cd');
})

doc.getElementById('cd-drag').addEventListener('click', () => {
    if (!dragCdStatus) {
        dragCdStatus = true;
        doc.getElementById('cd-drag-text').textContent = 'Activo';
        $("#carhud").draggable({disabled: true})
    } else {
        dragCdStatus = false;
        doc.getElementById('cd-drag-text').textContent = 'Inactivo';
        $("#carhud").draggable({disabled: false})
    }
    storeId('cd-drag-status', cdMin);
})

doc.getElementById('cd-column').addEventListener('click', () => {
    const top = doc.getElementById('cd-top');
    const bottom = doc.getElementById('cd-bottom');
    if (cdMin) {
        doc.getElementById('cd-column-text').textContent = 'Maximizar';
        top.style.opacity = '0';
        bottom.style.opacity = '0';
        cdMin = false;
    } else {
        doc.getElementById('cd-column-text').textContent = 'Minimizar';
        top.style.opacity = '1';
        bottom.style.opacity = '1';
        cdMin = true;
    }
    storeId('cd-min', cdMin);
})

function startDColorpicker(colorpicker, visual, text) {
    doc.getElementById(visual).value = rgba2hex(getComputedStyle(doc.getElementsByClassName(cdCurrClass)[1])[cdCurrSelector]);
    doc.getElementById(colorpicker).addEventListener('change', e => updateDType(e, cdCurrClass, cdCurrSelector), false);
    doc.getElementById(colorpicker).addEventListener('input', e => updateDColorPicker(e, visual, text), false);
    doc.getElementById(colorpicker).select();
}

function updateDType(e, className, styleName) {
    let elBlock = doc.getElementsByClassName(className);
    for (let i = 0; i < elBlock.length; i++) {
        if (styleName == 'boxShadow') {
            elBlock[i].style[styleName] = `0 0.15vh 0.05vh 0.2vh ${setOpacity(e.target.value, cdAlpha)}`
        } else {
            elBlock[i].style[styleName] = setOpacity(e.target.value, cdAlpha);
        }
    }
    storeId(`cd-${styleName}`, setOpacity(e.target.value, cdAlpha))
}

function updateDColorPicker(e, visual, text) {
    let color = e.target.value;
    doc.getElementById(visual).value = color;
    doc.getElementById(text).textContent = setOpacity(color, cdAlpha);
}

const restoreCarhud = _ => {
    (getId('cd-alpha') != null) ? (cdAlpha = getId('cd-alpha'), doc.getElementById('cd-slider-text').textContent = getId('cd-alpha'), (getId('cd-alpha') > 0.9) ? doc.getElementById('cd-slider').value = 10 : doc.getElementById('cd-slider').value = getId('cd-alpha').substring(2)) : false;

    (getId('top-cd') && getId('left-cd') != null) ? $("#carhud").animate({ top: getId('top-cd'), left: getId('left-cd')}) : false;
    (getId('cd-color') != null) ? (updateVColors('color', 'cd', getId('cd-color')), doc.getElementById('cd-colorpicker-visual').value = doc.getElementById('cd-colorpicker').value = getId('cd-color').substr(0, '7'), doc.getElementById('cd-colorpicker-text').textContent = getId('cd-color')) : doc.getElementById('cd-colorpicker').value = rgba2hex(getComputedStyle(doc.getElementsByClassName(cdCurrClass)[1])[cdCurrSelector]);
    (getId('cd-background-color') != null) ? (updateColors('background-color', 'cd', getId('cd-background-color'))) : false;
    (getId('cd-borderColor') != null) ? (updateColors('borderColor', 'cd', getId('cd-borderColor'))) : false;
    (getId('cd-boxShadow') != null) ? (updateColors('boxShadow', 'cd', getId('cd-boxShadow'))) : false;

    (getBool('cd-visual') != null) ? cdVisual = getBool('cd-visual') : cdVisual;
    doc.getElementById('cd-switch').checked = cdVisual;
    if (!cdVisual) {
        doc.getElementById('cd-switch-text').textContent = 'Inactivo';
        doc.getElementById('carhud').style.display = 'none';
    }

    (getBool('cd-drag-status') != null) ? (dragCdStatus = getBool('cd-drag-status'), $("#carhud").draggable({ disabled: getBool('cd-drag-status')})) : dragCdStatus;
    doc.getElementById('cd-drag').checked = dragCdStatus;
    if (dragCdStatus) {
        doc.getElementById('cd-drag-text').textContent = 'Activo';
    }

    (getBool('cd-min') != null) ? (cdMin = getBool('cd-min')) : cdMin;
    doc.getElementById('cd-column').checked = cdMin
    const top = doc.getElementById('cd-top');
    const bottom = doc.getElementById('cd-bottom');
    if (!cdMin) {
        doc.getElementById('cd-column-text').textContent = 'Maximizar';
        top.style.opacity = '0';
        bottom.style.opacity = '0';
    }
}