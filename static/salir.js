document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll("#salir").forEach(funct => {
        funct.onclick = () => {
            localStorage.clear()

        }
    });

});