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

const setOpacity = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`;

const rgba2hex = rgba => {
    rgba = rgba.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return rgba && rgba.length === 4
      ? "#" +
          ("0" + parseInt(rgba[1], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgba[2], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgba[3], 10).toString(16)).slice(-2)
      : "";
}