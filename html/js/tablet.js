const sidebar = doc.getElementById('sidebar');

let currentMode = false;
let barStatus = false;

doc.querySelector('.tablet-night-btn').addEventListener('click', () => {
    currentMode ? (currentMode = false, doc.body.classList.remove('dark-mode')) : (currentMode = true, doc.body.classList.add('dark-mode'));
    storeId('currentMode', currentMode);
});

sidebar.addEventListener('click', () => {
    const par = sidebar.parentNode;
    barStatus ? (barStatus = false, par.style.left = "-0.5%", par.style.background = "var(--opaque-dark)", par.style.borderRight = "0.4vh solid var(--border-dark)", par.style.transition = "left 0s") : (barStatus = true, par.style.left = "-20.5%", par.style.background = "transparent", par.style.borderRight = "none", par.style.transition = "left 0.2s")
    
})

const restoreTablet = () => {
    // Darkmode Saving
    getBool('currentMode') != null ? (currentMode = getBool('currentMode'), getBool('currentMode') ? doc.body.classList.add('dark-mode') : doc.body.classList.remove('dark-mode')) : currentMode;

    //
}