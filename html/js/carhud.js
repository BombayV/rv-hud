const carhud = doc.getElementById('carhud');

let carhudStatus = false;

function updateCarhud(status) {
    if (status) {
        if (!carhudStatus) {
            carhudStatus = true;
            carhud.style.display = 'flex';
        }
        doc.getElementById('carhud-rpm').textContent = status.rpm;
        doc.getElementById('carhud-gear').textContent = status.gear;
        doc.getElementById('carhud-fuel').textContent = status.fuel;
        doc.getElementById('carhud-damage').textContent = status.damage;
    } else {
        if (carhudStatus) {
            carhudStatus = false;
            carhud.style.display = 'none';
        }
    }
}