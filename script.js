// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica do Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav'); // A própria tag <nav>
    const navLinksContainer = document.querySelector('.nav-links'); // A div que contém os links <a>

    if (hamburger && mainNav && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Adiciona/remove a classe 'active' na <nav>
            hamburger.classList.toggle('active'); // Adiciona/remove a classe 'active' no botão hambúrguer para animação
        });

        // Fechar o menu ao clicar em um link (útil em mobile)
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Verifica se a classe 'active' está presente (ou seja, se o menu está aberto em mobile)
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                // Continuar com a rolagem suave após fechar o menu
                // A lógica de rolagem suave já está abaixo e será ativada pelo clique.
            });
        });
    }

    // --- 1. Rolagem Suave para Links de Âncora ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão de salto

            const targetId = this.getAttribute('href'); // Obtém o ID do alvo (ex: "#sobre")
            const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo

            if (targetElement) {
                // Calcula a posição de rolagem, ajustando para um possível cabeçalho fixo
                const headerOffset = document.querySelector('header')?.offsetHeight || 0; // Obtém a altura do header
                const navOffset = document.querySelector('nav')?.offsetHeight || 0; // Obtém a altura da nav
                const offset = headerOffset + navOffset + 20; // Adiciona um pequeno offset extra para não ficar colado

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Faz a rolagem suavemente
                });
            }
        });
    });

    // --- 2. Destaque do Link Ativo na Navegação ao Rolar ---
    const sections = document.querySelectorAll('section[id]'); // Seleciona todas as seções com ID
    // Note que 'navLinks' aqui já está sendo usado para o menu hamburguer
    // Renomeando para evitar conflito e garantir clareza
    const allNavLinks = document.querySelectorAll('.nav-links a'); // Seleciona todos os links DENTRO da div nav-links

    const highlightNavLink = () => {
        let currentActive = null;

        sections.forEach(section => {
            // Ajusta o offset para considerar o cabeçalho e a navegação (se estiverem fixos)
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const navHeight = document.querySelector('nav')?.offsetHeight || 0;
            const offsetCorrection = headerHeight + navHeight + 50; // Adicione um valor extra para que o highlight ocorra antes

            const sectionTop = section.offsetTop - offsetCorrection;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentActive = `#${section.id}`; // Define o ID da seção atual
            }
        });

        allNavLinks.forEach(link => { // Usar allNavLinks aqui
            link.classList.remove('active'); // Remove a classe 'active' de todos os links
            if (link.getAttribute('href') === currentActive) {
                link.classList.add('active'); // Adiciona a classe 'active' ao link correspondente
            }
        });
    };

    // Adiciona o listener de rolagem e chama a função na carga da página e no scroll
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Chama a função uma vez ao carregar a página para definir o estado inicial
});