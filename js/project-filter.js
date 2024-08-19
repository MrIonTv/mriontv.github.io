document.addEventListener('DOMContentLoaded', function() {
    const FILTER_BUTTONS = document.querySelectorAll('.filter-btn');
    const ITEMS = document.querySelectorAll('.project');
    const SEARCH_INPUT = document.getElementById('search-input');

    // Función para aplicar el filtro basado en los botones activos
    function applyFilter() {
        // Obtener los iconos activos
        const ACTIVE_ICONS = Array.from(document.querySelectorAll('.filter-btn.active'))
                                  .map(btn => btn.getAttribute('data-icon'));

        // Obtener el texto de búsqueda
        const SEARCH_QUERY = SEARCH_INPUT.value.toLowerCase();

        // Filtrar los items
        ITEMS.forEach(item => {
            const ITEM_ICONS = item.getAttribute('data-icons').split(' ');
            const PROJECT_NAME = item.querySelector('.project-name').textContent.toLowerCase();
            
            const ICONS_MATCH = ACTIVE_ICONS.length === 0 || ITEM_ICONS.some(icon => ACTIVE_ICONS.includes(icon));
            const NAME_MATCH = PROJECT_NAME.includes(SEARCH_QUERY);

            if (ICONS_MATCH && NAME_MATCH) {
                item.style.display = 'grid'; // Mostrar el item
            } else {
                item.style.display = 'none'; // Ocultar el item
            }
        });
    }

    FILTER_BUTTONS.forEach(button => {
        button.addEventListener('click', function() {
            // Alternar el estado del botón (activo/inactivo)
            this.classList.toggle('active');

            // Aplicar el filtro
            applyFilter();
        });
    });

    // Aplicar el filtro al escribir en el buscador
    SEARCH_INPUT.addEventListener('input', applyFilter);

    // Aplicar el filtro al cargar la página en caso de que algunos botones ya estén activos
    applyFilter();
});
