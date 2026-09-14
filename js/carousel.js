// ============================================================
// CARROSSEL DE IMAGENS
// ============================================================


// ------------------------------------------------------------
// ELEMENTOS DO MODAL
// ------------------------------------------------------------

const modal =
    document.getElementById("project-modal");


const modalImage =
    document.getElementById("modal-img");


const modalClose =
    document.getElementById("modal-close");


const previousButton =
    document.getElementById("carousel-prev");


const nextButton =
    document.getElementById("carousel-next");


const currentImage =
    document.getElementById("img-atual");


const totalImages =
    document.getElementById("img-total");


const thumbnailsContainer =
    document.getElementById("thumbnails-container");



// ------------------------------------------------------------
// PROJETOS
// ------------------------------------------------------------

const projectImages = {

    smartech: [
        "assets/projects/smartech1.png",
        "assets/projects/smartech2.png",
        "assets/projects/smartech3.png",
        "assets/projects/smartech4.png",
        "assets/projects/smartech5.png",
        "assets/projects/smartech6.png",
        "assets/projects/smartech7.png"  
    ],


    duat: [
        "assets/projects/duatcassinos1.png",
        "assets/projects/duatcassinos2.png",
        "assets/projects/duatcassinos3.png",
        "assets/projects/duatcassinos4.png",
        "assets/projects/duatcassinos5.png",
        "assets/projects/duatcassinos6.png"
    ]

};



// ------------------------------------------------------------
// ESTADO DO CARROSSEL
// ------------------------------------------------------------

let currentProject = null;

let currentIndex = 0;



// ------------------------------------------------------------
// BOTÕES "VER IMAGENS"
// ------------------------------------------------------------

const imageButtons =
    document.querySelectorAll(".btn-images");


imageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const project =
            button.getAttribute("data-project");


        openCarousel(project);

    });

});



// ------------------------------------------------------------
// ABRIR CARROSSEL
// ------------------------------------------------------------

function openCarousel(project) {

    const images =
        projectImages[project];


    if (!images || images.length === 0) {

        alert(
            "As imagens deste projeto ainda serão adicionadas ao portfólio."
        );

        return;
    }


    currentProject = project;

    currentIndex = 0;

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    updateCarousel();

}



// ------------------------------------------------------------
// ATUALIZAR CARROSSEL
// ------------------------------------------------------------

function updateCarousel() {

    const images =
        projectImages[currentProject];


    if (!images || images.length === 0) {
        return;
    }


    // Atualiza imagem principal
    modalImage.src =
        images[currentIndex];


    // Atualiza texto alternativo
    modalImage.alt =
        `Imagem ${currentIndex + 1} do projeto ${currentProject}`;


    // Atualiza contador
    currentImage.textContent =
        currentIndex + 1;


    totalImages.textContent =
        images.length;


    // Recria as miniaturas
    createThumbnails(images);

}



// ------------------------------------------------------------
// MINIATURAS
// ------------------------------------------------------------

function createThumbnails(images) {

    thumbnailsContainer.innerHTML = "";


    images.forEach((image, index) => {

        const thumbnail =
            document.createElement("button");


        thumbnail.type = "button";


        thumbnail.classList.add(
            "carousel-thumbnail"
        );


        if (index === currentIndex) {

            thumbnail.classList.add("active");

        }


        const thumbnailImage =
            document.createElement("img");


        thumbnailImage.src =
            image;


        thumbnailImage.alt =
            `Miniatura ${index + 1}`;


        thumbnail.appendChild(
            thumbnailImage
        );


        thumbnail.addEventListener(
            "click",
            () => {

                currentIndex = index;

                updateCarousel();

            }
        );


        thumbnailsContainer.appendChild(
            thumbnail
        );

    });

}



// ------------------------------------------------------------
// IMAGEM ANTERIOR
// ------------------------------------------------------------

if (previousButton) {

    previousButton.addEventListener(
        "click",
        () => {

            const images =
                projectImages[currentProject];


            if (!images || images.length === 0) {
                return;
            }


            currentIndex--;


            if (currentIndex < 0) {

                currentIndex =
                    images.length - 1;

            }


            updateCarousel();

        }
    );

}



// ------------------------------------------------------------
// PRÓXIMA IMAGEM
// ------------------------------------------------------------

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            const images =
                projectImages[currentProject];


            if (!images || images.length === 0) {
                return;
            }


            currentIndex++;


            if (
                currentIndex >=
                images.length
            ) {

                currentIndex = 0;

            }


            updateCarousel();

        }
    );

}



// ------------------------------------------------------------
// FECHAR MODAL
// ------------------------------------------------------------

function closeCarousel() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    modalImage.src = "";

    currentProject = null;

}



// Botão X
if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeCarousel
    );

}



// Clique fora da janela
if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeCarousel();

            }

        }
    );

}



// ------------------------------------------------------------
// TECLA ESC
// ------------------------------------------------------------

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            if (
                modal &&
                modal.classList.contains("active")
            ) {

                closeCarousel();

            }

        }

    }
);



// ------------------------------------------------------------
// SETAS DO TECLADO
// ------------------------------------------------------------

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !modal ||
            !modal.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "ArrowLeft") {

            previousButton.click();

        }


        if (event.key === "ArrowRight") {

            nextButton.click();

        }

    }
);