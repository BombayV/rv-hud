window.addEventListener('load', () => {
    window.addEventListener('message', e => {
        switch (e.data.action) {
            case 'updateTime':
                doc.getElementById('tablet-time').textContent = e.data.time;
                doc.getElementById('tablet-day').textContent = e.data.day;
                doc.getElementById('tablet-day-text').textContent = e.data.dayText;
                doc.getElementById('tablet-month').textContent = e.data.month;
            break;
        }
    })
})