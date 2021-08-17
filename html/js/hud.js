const doc = document;

const hudSlider = doc.getElementById('hud-slider');
const hudPicker = doc.getElementById('hud-colorpicker');

hudSlider.addEventListener('input', function() {
    if (this.value == 10) {
        console.log('1.0')
    } else {
        console.log(`0.${this.value}`)
    }
})