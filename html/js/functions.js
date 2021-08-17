window.addEventListener('load', () => {
    restoreTablet();
    doc.getElementById(Config.defaultApp).click();
    this.window.localStorage.clear();
});

const getBool = item => JSON.parse(localStorage.getItem(item));

const getId = item => localStorage.getItem(item);

const storeId = (id, item) => localStorage.setItem(id, item);

const hideClassText = (className, show, color) => {
    let curClass = doc.getElementsByClassName(className);
    if (show) {
        for (let i = 0; i < curClass.length; i++) {
            curClass[i].style.color = color;
        }
    } else {
        for (let i = 0; i < curClass.length; i++) {
            curClass[i].style.color = 'transparent';
        }
    }
}

const getHex = rgb => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`