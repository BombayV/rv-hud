let currentMode = false

doc.querySelector('.tablet-night-btn').addEventListener('click', () => {
    currentMode ? (currentMode = false, doc.body.classList.remove('dark-mode')) : (currentMode = true, doc.body.classList.add('dark-mode'));
    storeId('currentMode', currentMode);
});

const restoreTablet = () => {
    // Darkmode Saving
    getBool('currentMode') != null ? (currentMode = getBool('currentMode'), getBool('currentMode') ? doc.body.classList.add('dark-mode') : doc.body.classList.remove('dark-mode')) : currentMode;

    //
}