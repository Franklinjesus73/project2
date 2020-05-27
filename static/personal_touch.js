document.addEventListener('click', event => {
    const element = event.target;
    if (element.className === 'hide') {
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', () =>  {
            element.parentElement.remove();
        });
    }
});

function scrollDown() {
    document.getElementById('scroll').scrollTop =  document.getElementById('scroll').scrollHeight
   }

document.addEventListener('DOMContentLoaded', () => {

        const chosen_channel = localStorage.getItem('chosen_channel');
        document.querySelector('.channel_crt').innerHTML = `${chosen_channel}`;

});