const doc = document;

const hudSlider = doc.getElementById('hud-slider');
const hudPicker = doc.getElementById('hud-colorpicker');
const hudVisual = doc.getElementById('hud-colorpicker-visual')
const hudSelector = doc.getElementById('hud-selector');

hudSlider.addEventListener('input', function() {
    if (this.value == 10) {
        console.log('1.0')
    } else {
        console.log(`0.${this.value}`)
    }
})

const startColorpicker = e => {
    hudPicker.value;
    hudPicker.addEventListener('input', e => {
        updateColorPicker(e, 'hud-colorpicker-visual', 'hud-selector', 'hud-colorpicker-text')
    }, false);
    hudPicker.select();
}

this.window.addEventListener('load', () => {
    startColorpicker();
});

const updateColorPicker = (e, visual, selector, text) => {
    let color = e.target.value;
    doc.getElementById(visual).value = doc.getElementById(text).textContent = color;
    switch (doc.getElementById(selector).value) {

    };
}