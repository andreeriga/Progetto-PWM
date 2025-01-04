document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('id') !== null) {
        document.querySelectorAll('.logged').forEach(e => e.classList.remove('disabled'));
    } else {
        // console.log('not logged');
        console.log(document.querySelectorAll('.logged'));
        document.querySelectorAll('.logged').forEach(e => e.classList.add('disabled'));
    }
});