function handleExpandCollapse(event) {
    // Verifica si el clic fue en un enlace
    if (event.target.tagName === "A") {
        return; // Si se hizo clic en un enlace, no hacer nada más
    }
    
    const DETAILS = this.querySelector(".details");
    const EYE_ICON = this.querySelector(".fa-eye");

    if (DETAILS.style.height === "0px" || DETAILS.style.height === "") {
        DETAILS.style.height = DETAILS.scrollHeight + "px";
        if (EYE_ICON) {
            EYE_ICON.style.display = "none"; // Ocultar el ícono con clase fa-eye
        }
    } else {
        DETAILS.style.height = "0px";
        if (EYE_ICON) {
            EYE_ICON.style.display = "inline"; // Mostrar el ícono con clase fa-eye cuando el div se contrae
        }
    }
}
document.querySelectorAll(".project").forEach(div => {
    div.addEventListener("click", function(event) {
        handleExpandCollapse.call(this, event); // Llama a la función con el contexto del div
    });
});