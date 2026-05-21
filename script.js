/**
 * RM Digital - Premium Landing Page Logic
 * Handled by Rafael H. Gomes
 */

// 1. WhatsApp Configuration Center
const WHATSAPP_CONFIG = {
    // INSERT RAFAEL'S REAL NUMBER HERE (Country code + Area code + Phone)
    // Example: "5541999999999" (55 = Brazil, 41 = Curitiba/PR area, 9XXXXXXXX = mobile number)
    phone: "5541996235246", 
    
    // Tailored messages based on the section the user clicked
    messages: {
        header_menu: "Olá! Acessei o site da RM Digital e gostaria de solicitar um orçamento para segurança eletrônica.",
        mobile_drawer: "Olá Rafael! Vi o site da RM Digital e gostaria de tirar dúvidas sobre os sistemas de segurança.",
        hero_main: "Olá Rafael! Quero proteger meu patrimônio. Gostaria de falar com você agora sobre segurança eletrônica de alta performance.",
        about_section: "Olá Rafael! Gostaria de falar diretamente com você para solicitar um orçamento de segurança eletrônica sem compromisso.",
        sticky_float: "Olá Rafael! Gostaria de solicitar um atendimento rápido para orçamento de segurança eletrônica.",
        
        // Services specifics
        service_cftv: "Olá Rafael! Gostaria de solicitar um orçamento para instalação/manutenção de Câmeras de Segurança (CFTV).",
        service_alarmes: "Olá Rafael! Gostaria de solicitar um orçamento para instalação de Central de Alarmes e Sensores.",
        service_cerca: "Olá Rafael! Gostaria de solicitar um orçamento para Cerca Elétrica perimetral.",
        service_interfones: "Olá Rafael! Gostaria de solicitar um orçamento para instalação de Interfone ou Vídeo Porteiro.",
        service_motor: "Olá Rafael! Gostaria de um orçamento para instalação/manutenção de Motor Eletrônico de Portão.",
        service_eletrica: "Olá Rafael! Gostaria de um orçamento para montagem/regularização de Postes de Elétrica Padrão Copel."
    }
};

// Initialize page functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initWhatsAppLinks();
    initScrollReveal();
    initMobileMenu();
    initHeaderScroll();
    initActiveNavLinks();
    initQuoteSimulator();
    initFaqAccordion();
});

/**
 * Dynamically binds customized WhatsApp links to all actions buttons
 */
function initWhatsAppLinks() {
    const waLinks = document.querySelectorAll(".whatsapp-link");
    
    waLinks.forEach(link => {
        const context = link.getAttribute("data-context");
        let rawMessage = WHATSAPP_CONFIG.messages[context] || WHATSAPP_CONFIG.messages.sticky_float;
        
        // Encode message for URL
        const encodedText = encodeURIComponent(rawMessage);
        const waURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phone}&text=${encodedText}`;
        
        // Set href dynamically
        link.setAttribute("href", waURL);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
}

/**
 * Implementation of elegant Scroll Reveal using IntersectionObserver
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-fade-in-up");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for better natural feel
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Logic for responsive Mobile Menu Drawer
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const drawer = document.querySelector(".mobile-drawer");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    
    if (toggleBtn && drawer) {
        toggleBtn.addEventListener("click", () => {
            toggleBtn.classList.toggle("active");
            drawer.classList.toggle("open");
            // Disable scrolling behind drawer when open
            document.body.style.overflow = drawer.classList.contains("open") ? "hidden" : "";
        });
        
        // Close drawer when clicking any nav link
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                toggleBtn.classList.remove("active");
                drawer.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }
}

/**
 * Transitions header styling upon scrolling down
 */
function initHeaderScroll() {
    const header = document.querySelector(".main-header");
    
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
}

/**
 * Dynamic active link highlighting on scroll
 */
function initActiveNavLinks() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");
    
    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlighting slightly before the section fully hits the viewport top
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
}

/**
 * Handle Quote Simulator interactivity and WhatsApp dispatch
 */
function initQuoteSimulator() {
    const form = document.getElementById("quoteSimulatorForm");
    const checkboxCards = document.querySelectorAll(".checkbox-card");
    const radioCards = document.querySelectorAll(".radio-card");

    if (!form) return;

    // Helper to update checkbox card highlight classes
    checkboxCards.forEach(card => {
        const checkbox = card.querySelector("input[type='checkbox']");
        
        // Initial state
        if (checkbox.checked) card.classList.add("selected-active");
        
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                card.classList.add("selected-active");
            } else {
                card.classList.remove("selected-active");
            }
        });
    });

    // Helper to update radio card highlight classes
    radioCards.forEach(card => {
        const radio = card.querySelector("input[type='radio']");
        
        // Initial state
        if (radio.checked) card.classList.add("selected-active");

        radio.addEventListener("change", () => {
            // Remove from all radios in group first
            const groupName = radio.getAttribute("name");
            const groupCards = document.querySelectorAll(`.radio-card input[name='${groupName}']`);
            groupCards.forEach(input => {
                input.closest(".radio-card").classList.remove("selected-active");
            });

            if (radio.checked) {
                card.classList.add("selected-active");
            }
        });
    });

    // Form Submit handling
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Gather property type
        const propertyTypeInput = form.querySelector("input[name='property']:checked");
        const propertyType = propertyTypeInput ? propertyTypeInput.value : "Não especificado";

        // 2. Gather selected services
        const selectedServicesInputs = form.querySelectorAll("input[name='services']:checked");
        const selectedServices = Array.from(selectedServicesInputs).map(input => input.value);

        if (selectedServices.length === 0) {
            alert("Por favor, selecione pelo menos 1 solução que você precisa.");
            return;
        }

        // 3. Gather client name
        const clientNameInput = document.getElementById("simulatorName");
        const clientName = clientNameInput ? clientNameInput.value.trim() : "";

        // 4. Build message
        let msg = `Olá Rafael! Usei o simulador no site da *RM Digital* e gostaria de solicitar um orçamento para meu imóvel (*${propertyType}*).\n\n`;
        msg += `*Soluções que preciso:*\n`;
        selectedServices.forEach(service => {
            msg += `• ${service}\n`;
        });

        if (clientName) {
            msg += `\n*Meu nome:* ${clientName}`;
        }

        msg += `\n\nPode me atender para conversarmos sobre os detalhes?`;

        // 5. Direct to WhatsApp API
        const encodedText = encodeURIComponent(msg);
        const waURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phone}&text=${encodedText}`;
        
        window.open(waURL, "_blank", "noopener,noreferrer");
    });
}

/**
 * Handle FAQ collapsible accordion interactivity
 */
function initFaqAccordion() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.closest(".accordion-item");
            const body = item.querySelector(".accordion-body");
            const isActive = item.classList.contains("active");

            // Close all other accordions first
            const allItems = document.querySelectorAll(".accordion-item");
            allItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    const otherBody = otherItem.querySelector(".accordion-body");
                    otherBody.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            if (isActive) {
                item.classList.remove("active");
                body.style.maxHeight = null;
            } else {
                item.classList.add("active");
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });
}
