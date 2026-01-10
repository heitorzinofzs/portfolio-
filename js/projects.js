
// Espera a página carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', function() {
    
    // Pega todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Para cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
        });
    });
    
    const sections = document.querySelectorAll('.section');
    
    function highlightNavOnScroll() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    const backToTopButton = document.getElementById('backToTop');
    
    // Mostra/esconde o botão baseado na posição da página
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Quando clicar no botão, volta ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rola suavemente
        });
    });
    
    
});


