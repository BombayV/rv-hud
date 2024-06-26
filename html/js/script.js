this.window.addEventListener('load', () => {
    //this.window.localStorage.clear();

    // Tablet
    restoreTablet();
    doc.getElementById(Config.defaultApp).click();

    // Hud
    startColorpicker('hud-colorpicker', 'hud-colorpicker-visual', 'hud-colorpicker-text');
    restoreHud();

    // Carhud
    startDColorpicker('cd-colorpicker', 'cd-colorpicker-visual', 'cd-colorpicker-text');
    restoreCarhud();
    // Voice
    startVColorpicker('voice-colorpicker', 'voice-colorpicker-visual', 'voice-colorpicker-text')
    restoreVoice();

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

            case 'updateStatus':
                let hud = e.data.hud;
                let voice = e.data.voice;
                updateHud(hud);
                updateVoice(voice);
            break;

            case 'updateHudStamina':
                doc.getElementById('hud-icon').classList.remove(e.data.remove);
                doc.getElementById('hud-icon').classList.add(e.data.icon);
            break;

            case 'updateCarhud':
                let carhud = e.data.carhud;
                updateCarhud(carhud);
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