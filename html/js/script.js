this.window.addEventListener('load', () => {
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
                // Hud
                let hud = e.data.hud
                doc.getElementById('hud-health').style.height = `${hud.health}%`;
                doc.getElementById('hud-armor').style.height = `${hud.armor}%`;
                doc.getElementById('hud-stamina').style.height = `${hud.stamina}%`;
                doc.getElementById('hud-hunger').style.height = `${hud.hunger}%`;
                doc.getElementById('hud-thirst').style.height = `${hud.thirst}%`;
                doc.getElementById('hud-stress').style.height = `${hud.stress}%`;

                // Carhud
                let carhud = e.data.carhud
                console.log(carhud.speed)

                // Voice
                let voice = e.data.voice
                
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