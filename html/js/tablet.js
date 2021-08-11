let currentMode = false

doc.querySelector('.tablet-night-btn').addEventListener('click', () => {
    if (!currentMode) {
        doc.body.classList.add('dark-mode');
        currentMode = true;
    } else {
        doc.body.classList.remove('dark-mode');
        currentMode = false;
    }
    storeId('currentMode', currentMode)
});

const restoreTablet = () => {
    // Darkmode Saving
    if (null != getBool('currentMode')) {currentMode = getBool('currentMode')}
    if (getBool('currentMode')) {
        doc.body.classList.add('dark-mode');
    } else {
        doc.body.classList.remove('dark-mode');
    }

    //
}