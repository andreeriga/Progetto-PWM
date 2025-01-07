document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('id') !== null) {
        document.querySelectorAll('.logged').forEach(e => e.classList.remove('disabled'));
    } else {
        // console.log('not logged');
        console.log(document.querySelectorAll('.logged'));
        document.querySelectorAll('.logged').forEach(e => e.classList.add('disabled'));
    }

    if (localStorage.getItem('id') !== null) {
        document.getElementById('credit-button').innerText = localStorage.getItem('crediti')
        document.getElementById('credit-button').classList.remove('d-none');
        document.getElementById('login-button').classList.add('d-none');
        document.getElementById('logout-button').classList.remove('d-none');
    } else {
        document.getElementById('login-button').classList.remove('d-none');
        document.getElementById('logout-button').classList.add('d-none');
        document.getElementById('credit-button').classList.add('d-none');
    }
});