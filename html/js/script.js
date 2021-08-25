this.window.addEventListener('load', e => {
    // Tablet
    restoreTablet();
    doc.getElementById(Config.defaultApp).click();

    // Hud
    startColorpicker('hud-colorpicker', 'hud-colorpicker-visual', 'hud-colorpicker-text')
    restoreHud()

    window.addEventListener('load', () => {
        window.addEventListener('message', e => {
            let data = e.data;
            switch (data.action) {
                case 'updateTime':
                    doc.getElementById('tablet-time').textContent = data.time;
                    doc.getElementById('tablet-day').textContent = data.day;
                    doc.getElementById('tablet-day-text').textContent = data.dayText;
                    doc.getElementById('tablet-month').textContent = data.month;
                break;

                case 'updateHud':
                    doc.getElementById('hud-health').style.height = `${data.health}%`;
                    doc.getElementById('hud-armor').style.height = `${data.armor}%`;
                    doc.getElementById('hud-stamina').style.height = `${data.stamina}%`;
                    doc.getElementById('hud-hunger').style.height = `${data.hunger}%`;
                    doc.getElementById('hud-thirst').style.height = `${data.thirst}%`;
                    doc.getElementById('hud-stress').style.height = `${data.stress}%`;
                break;
            }
        })
    })
})