// ============================================================
// FILTRO DE PROJETOS
// ============================================================

const projectCards =
    document.querySelectorAll(".project-card");

const filterButtons =
    document.querySelectorAll(".filter-button");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove o estado ativo dos outros botões

        filterButtons.forEach((item) => {

            item.classList.remove("active");

        });


        // Ativa o botão selecionado

        button.classList.add("active");


        // Descobre o filtro escolhido

        const selectedFilter =
            button.getAttribute("data-filter");


        // Filtra os projetos

        projectCards.forEach((card) => {

            const category =
                card.getAttribute("data-category");


            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.hidden = false;

            } else {

                card.hidden = true;

            }

        });

    });

});