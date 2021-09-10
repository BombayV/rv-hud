this.window.addEventListener('load', e => {
    // Tablet
    restoreTablet();
    doc.getElementById(Config.defaultApp).click();

    // Hud
    startColorpicker('hud-colorpicker', 'hud-colorpicker-visual', 'hud-colorpicker-text')
    restoreHud()
    window.addEventListener('message', e => {
        switch (e.data.action) {
            case 'updateTabletState':
                doc.getElementById('tablet').style.opacity = '1';
            break;

            case 'updateTime':
                doc.getElementById('tablet-time').textContent = e.data.time;
                doc.getElementById('tablet-day').textContent = e.data.day;
                doc.getElementById('tablet-day-text').textContent = e.data.dayText;
                doc.getElementById('tablet-month').textContent = e.data.month;
            break;

            case 'updateHud':
                doc.getElementById('hud-health').style.height = `${e.data.health}%`;
                doc.getElementById('hud-armor').style.height = `${e.data.armor}%`;
                doc.getElementById('hud-stamina').style.height = `${e.data.stamina}%`;
                doc.getElementById('hud-hunger').style.height = `${e.data.hunger}%`;
                doc.getElementById('hud-thirst').style.height = `${e.data.thirst}%`;
                doc.getElementById('hud-stress').style.height = `${e.data.stress}%`;
            break;

            case 'updateHudStamina':
                doc.getElementById('hud-icon').classList.remove(e.data.remove);
                doc.getElementById('hud-icon').classList.add(e.data.icon);
            break;
        }
    })
})

doc.onkeyup = e => {
    if (e.key == 'Escape') {
        fetchNUI('closeTablet')
        doc.getElementById('tablet').style.opacity = '0';
    }
}