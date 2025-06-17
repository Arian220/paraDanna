document.addEventListener('DOMContentLoaded', function() {
    const btnSi = document.getElementById('btn-si');
    const btnNo = document.getElementById('btn-no');
    const modal = document.getElementById('celebration-modal');
    const buttonsContainer = document.querySelector('.buttons-container');
    
    let noClickCount = 0;
    const noMessages = [
        'No',
        '¿Estás seguro/a?',
        'Piénsalo bien...',
        '¿En serio?',
        'Dale una oportunidad',
        'No seas así...',
        '¡Vamos!',
        'Solo di que sí',
        '¿Por favor?',
        'Última oportunidad...'
    ];
    
    // Función para mover el botón No a una posición aleatoria
    function moveNoButton() {
        const container = buttonsContainer;
        const containerRect = container.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();
        
        // Calcular posiciones aleatorias dentro del contenedor
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Aplicar la animación de movimiento
        btnNo.classList.add('moving');
        
        // Cambiar posición después de un pequeño delay
        setTimeout(() => {
            btnNo.style.position = 'absolute';
            btnNo.style.left = randomX + 'px';
            btnNo.style.top = randomY + 'px';
            
            // Remover la clase de animación
            setTimeout(() => {
                btnNo.classList.remove('moving');
            }, 500);
        }, 100);
    }
    
    // Función para cambiar el texto del botón No
    function changeNoButtonText() {
        if (noClickCount < noMessages.length) {
            btnNo.textContent = noMessages[noClickCount];
        }
    }
    
    // Función para crear efecto de partículas
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = '💖';
                particle.style.position = 'fixed';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
                particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.animation = 'particleFloat 3s ease-out forwards';
                
                document.body.appendChild(particle);
                
                // Remover la partícula después de la animación
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    // Agregar estilos para las partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Event listener para el botón Sí
    btnSi.addEventListener('click', function() {
        // Crear efecto de partículas
        createParticles();
        
        // Mostrar modal de celebración
        setTimeout(() => {
            modal.classList.remove('hidden');
        }, 500);
        
        // Vibración en dispositivos móviles (si está disponible)
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    });
    
    // Event listener para el botón No
    btnNo.addEventListener('click', function(e) {
        e.preventDefault();
        
        noClickCount++;
        
        // Cambiar texto del botón
        changeNoButtonText();
        
        // Mover el botón a una nueva posición
        moveNoButton();
        
        // Hacer el botón más pequeño gradualmente
        const currentScale = 1 - (noClickCount * 0.05);
        if (currentScale > 0.3) {
            btnNo.style.transform = `scale(${currentScale})`;
        }
        
        // Después de muchos clics, hacer el botón casi invisible
        if (noClickCount >= 8) {
            btnNo.style.opacity = Math.max(0.1, 1 - (noClickCount - 7) * 0.2);
        }
        
        // Vibración corta en dispositivos móviles
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    });
    
    // Event listener para cerrar el modal (click en el fondo)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Prevenir que el botón No sea seleccionado con Tab
    btnNo.addEventListener('focus', function() {
        btnSi.focus();
    });
    
    // Efecto de hover mejorado para el botón Sí
    btnSi.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    btnSi.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Función para ajustar el contenedor de botones en móviles
    function adjustButtonContainer() {
        if (window.innerWidth <= 768) {
            buttonsContainer.style.position = 'relative';
            buttonsContainer.style.height = '200px';
        }
    }
    
    // Ajustar al cargar y al redimensionar
    adjustButtonContainer();
    window.addEventListener('resize', adjustButtonContainer);
    
    // Prevenir zoom en doble tap en iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

