const carhud = doc.getElementById('carhud');

let carhudStatus = false;

function updateCarhud(status) {
    if (status) {
        if (status.class !== 13) {
            if (!carhudStatus) {
                carhudStatus = true;
                carhud.style.display = 'flex';
            }
            doc.getElementById('carhud-rpm').textContent = status.rpm;
            doc.getElementById('carhud-gear').textContent = status.gear;
            doc.getElementById('carhud-fuel').textContent = status.fuel;
            doc.getElementById('carhud-damage').textContent = status.damage;
            let speed = status.speed;
            if (speed === 0) {
                doc.getElementById('carhud-speed').textContent = '000';
            } else if (speed > 0 && speed < 10) {
                doc.getElementById('carhud-speed').textContent = `00${status.speed}`;
            } else if (speed > 10 && speed < 100) {
                doc.getElementById('carhud-speed').textContent = `0${status.speed}`;
            } else {
                doc.getElementById('carhud-speed').textContent = status.speed;
            }
        }
    } else {
        if (carhudStatus) {
            carhudStatus = false;
            carhud.style.display = 'none';
        }
    }
}