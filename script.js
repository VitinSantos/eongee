window.addEventListener('scroll', () => {
    // 1. Efeito do Header ao rolar
    const header = document.querySelector('#main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 2. Lógica de Encolhimento do Álbum (Shrink Effect)
    const albumSection = document.getElementById('album');
    const albumImg = document.getElementById('albumMainImg');
    const albumDetails = document.querySelector('.album-details');
    const wrapper = document.querySelector('.album-sticky-wrapper');
    
    if (albumSection) {
        let scrollPos = window.scrollY;
        let sectionOffset = albumSection.offsetTop;
        let sectionHeight = albumSection.offsetHeight;

        // Inicia o efeito quando o topo da seção chega no topo da tela
        if (scrollPos >= sectionOffset) {
            let progress = (scrollPos - sectionOffset) / (sectionHeight - window.innerHeight);
            
            // Limita o progresso entre 0 e 1
            progress = Math.min(Math.max(progress, 0), 1);

            // Ajuste da largura: Encolhe de 100vw até 42vw 
            // (Aumentei para 42 para o texto não vazar nas laterais)
            let newWidth = 100 - (progress * 58); 
            if (newWidth < 42) newWidth = 42;

            albumImg.style.width = newWidth + 'vw';
            albumImg.style.height = 'auto'; // Mantém a proporção da imagem
            albumImg.style.borderRadius = (progress * 30) + 'px'; // Arredonda as bordas conforme encolhe
            albumImg.style.boxShadow = `0 30px 100px rgba(0,0,0,${progress})`;

            // 3. Ativa o brilho neon de fundo e mostra os detalhes (Título e Botão)
            if (progress > 0.1) {
                wrapper.classList.add('active');
            } else {
                wrapper.classList.remove('active');
            }

            // Mostra o texto e o botão quando a imagem estiver quase no tamanho final
            if (progress > 0.5) {
                albumDetails.classList.add('visible');
            } else {
                albumDetails.classList.remove('visible');
            }
        }
    }
});

// Nota: O código do Countdown foi removido para dar lugar ao botão fixo "Ouça agora".