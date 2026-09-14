// ============================================================
// CONFIGURAÇÕES GERAIS
// ============================================================

const html = document.documentElement;

const themeToggle = document.getElementById("theme-toggle");
const languageToggle = document.getElementById("language-toggle");


// ============================================================
// TEMA CLARO / ESCURO
// ============================================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || savedTheme === "dark") {

    html.setAttribute("data-theme", savedTheme);

} else {

    html.setAttribute("data-theme", "dark");

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            html.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        html.setAttribute("data-theme", newTheme);

        localStorage.setItem("theme", newTheme);

    });

}


// ============================================================
// IDIOMA
// ============================================================

let currentLanguage =
    localStorage.getItem("language") || "pt";


const translations = {

    pt: {

        "nav-inicio": "Início",
        "nav-sobre": "Sobre",
        "nav-habilidades": "Habilidades",
        "nav-experiencia": "Experiência",
        "nav-projetos": "Projetos",
        "nav-contato": "Contato",

        "hero-label": "Desenvolvedor de Sistemas",
        "hero-name": "Olá, eu sou o",
        "hero-subtitle": "Java Back-end & Desenvolvimento Web",

        "hero-button-projects": "Ver projetos",
        "hero-button-contact": "Entrar em contato",

        "status": "Aberto a oportunidades",

        "about-label": "Sobre",
        "about-title": "Construindo software com visão de sistema.",
        "about-description":
            "Minha formação combina desenvolvimento, análise de sistemas, banco de dados e qualidade de software.",

        "skills-label": "Tecnologias",
        "skills-title": "Habilidades",
        "skills-description":
            "Tecnologias e conhecimentos utilizados durante minha formação e projetos.",

        "experience-label": "Experiência",
        "experience-title": "Experiência profissional",

        "projects-label": "Projetos",
        "projects-title": "Projetos em destaque",
        "projects-description":
            "Projetos acadêmicos e pessoais que representam minha experiência prática com desenvolvimento de sistemas.",

        "filter-all": "Todos",
        "filter-frontend": "Front-end",
        "filter-backend": "Back-end",
        "filter-fullstack": "Full Stack",

        "contact-label": "Contato",
        "contact-title": "Vamos conversar?",
        "contact-description":
            "Estou buscando oportunidades de início de carreira em desenvolvimento de sistemas, especialmente em Java, back-end, full stack e áreas relacionadas."

    },


    en: {

        "nav-inicio": "Home",
        "nav-sobre": "About",
        "nav-habilidades": "Skills",
        "nav-experiencia": "Experience",
        "nav-projetos": "Projects",
        "nav-contato": "Contact",

        "hero-label": "Systems Developer",
        "hero-name": "Hello, I'm",
        "hero-subtitle": "Java Back-end & Web Development",

        "hero-button-projects": "View projects",
        "hero-button-contact": "Get in touch",

        "status": "Open to opportunities",

        "about-label": "About",
        "about-title": "Building software with a systems perspective.",
        "about-description":
            "My background combines software development, systems analysis, databases and software quality.",

        "skills-label": "Technologies",
        "skills-title": "Skills",
        "skills-description":
            "Technologies and knowledge used throughout my education and projects.",

        "experience-label": "Experience",
        "experience-title": "Professional experience",

        "projects-label": "Projects",
        "projects-title": "Featured projects",
        "projects-description":
            "Academic and personal projects that represent my practical experience in software development.",

        "filter-all": "All",
        "filter-frontend": "Front-end",
        "filter-backend": "Back-end",
        "filter-fullstack": "Full Stack",

        "contact-label": "Contact",
        "contact-title": "Let's talk?",
        "contact-description":
            "I'm looking for entry-level opportunities in software development, especially Java, back-end, full stack and related areas."

    }

};


// ============================================================
// ATUALIZAR IDIOMA
// ============================================================

function updateLanguage() {

    const language =
        translations[currentLanguage];

    const elements =
        document.querySelectorAll("[data-i18n]");


    elements.forEach((element) => {

        const key =
            element.getAttribute("data-i18n");

        if (language[key]) {

            element.textContent =
                language[key];

        }

    });


    if (languageToggle) {

        languageToggle.textContent =
            currentLanguage === "pt"
                ? "EN"
                : "PT";

    }


    html.setAttribute(
        "lang",
        currentLanguage === "pt"
            ? "pt-BR"
            : "en"
    );


    localStorage.setItem(
        "language",
        currentLanguage
    );

}


// ============================================================
// CLIQUE NO BOTÃO DE IDIOMA
// ============================================================

if (languageToggle) {

    languageToggle.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "pt"
                ? "en"
                : "pt";

        updateLanguage();

    });

}


updateLanguage();


// ============================================================
// NAVEGAÇÃO
// ============================================================

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});


// ============================================================
// NAVEGAÇÃO AUTOMÁTICA CONFORME A SEÇÃO
// ============================================================

const sections =
    document.querySelectorAll("section[id]");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const currentId =
                    entry.target.getAttribute("id");


                navLinks.forEach((link) => {

                    link.classList.remove("active");


                    const target =
                        link.getAttribute("href");


                    if (target === `#${currentId}`) {

                        link.classList.add("active");

                    }

                });

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});