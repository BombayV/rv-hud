const sidebar = doc.getElementById('sidebar');
const hudIndex = doc.getElementById('hud-index');
const carhudIndex = doc.getElementById('carhud-index');
const jobsIndex = doc.getElementById('jobs-index');

let currentMode = false;
let barStatus = true;

doc.querySelector('.tablet-night-btn').addEventListener('click', () => {
    currentMode ? (currentMode = false, doc.body.classList.remove('dark-mode')) : (currentMode = true, doc.body.classList.add('dark-mode'));
    storeId('currentMode', currentMode);
});

sidebar.addEventListener('click', () => {
    const par = sidebar.parentNode;
    barStatus ? (barStatus = false, par.style.left = "-0.5%", par.style.background = "var(--opaque-dark)", par.style.borderRight = "0.4vh solid var(--border-dark)", par.style.transition = "left 0s", hideClassText('sidebar-title', true, 'var(--sidebar-dark)')) : (barStatus = true, par.style.left = "-20.5%", par.style.background = "transparent", par.style.borderRight = "none", par.style.transition = "left 0.1s", hideClassText('sidebar-title', false));
    storeId('barStatus', barStatus);
})

hudIndex.addEventListener('click', () => openPage('hud-page'));

carhudIndex.addEventListener('click', () => openPage('carhud-page'))

jobsIndex.addEventListener('click', () => openPage('jobs-page'))

const restoreTablet = () => {
    // Darkmode
    getBool('currentMode') != null ? (currentMode = getBool('currentMode'), getBool('currentMode') ? doc.body.classList.add('dark-mode') : doc.body.classList.remove('dark-mode')) : currentMode;

    // Sidebar
    const par = sidebar.parentNode;
    getBool('barStatus') != null ? (barStatus = getBool('barStatus'), getBool('barStatus') ? (par.style.left = "-20.5%", par.style.background = "transparent", par.style.borderRight = "none", par.style.transition = "left 0.1s", hideClassText('sidebar-title', false)) : (par.style.left = "-0.5%", par.style.background = "var(--opaque-dark)", par.style.borderRight = "0.4vh solid var(--border-dark)", par.style.transition = "left 0s", hideClassText('sidebar-title', true, 'var(--sidebar-dark)'))) : (barStatus, hideClassText('sidebar-title', false));
}

function openPage(id) {
    let target = doc.getElementById(id);
    const pageContent = doc.getElementsByClassName('panel-page');
    if (target.style.opacity == '1') {
        target.style.opacity = '0';
    } else {
        for (let i = 0; i < pageContent.length; i++) {
            pageContent[i].style.opacity = '0';
        }
        target.style.opacity = '1';
    }
}