document.addEventListener('DOMContentLoaded', () => {


    if (!localStorage.getItem('user')){
        let name = prompt("Please enter your name:");
        localStorage.setItem('user', name);
        document.querySelector('#welcome').innerHTML = `Welcome ${name}!`;
    }
    else{
        name = localStorage.getItem('user');
        document.querySelector('#welcome').innerHTML = `Welcome back ${name}!`;
    }

});

//FUNCIONANDO