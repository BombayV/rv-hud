window.addEventListener('load', () => {
    restoreTablet();
});

const getBool = item => JSON.parse(localStorage.getItem(item));

const getId = item => localStorage.getItem(item);

const storeId = (id, item) => localStorage.setItem(id, item);