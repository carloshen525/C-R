/**
 * R&C MARKETING - JAVASCRIPT DE ALTA PERFORMANCE
 * Ultraleve, sem dependências, otimizado para carregamento instantâneo.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  function toggleMenu(forceClose = false) {
    if (!mobileToggle || !mobileDrawer) return;
    const isOpen = forceClose ? false : !mobileDrawer.classList.contains('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileDrawer.classList.toggle('open', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMenu());
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // 1.1 Texto Dinâmico na Hero Section (Typewriter Effect Sincronizado com Imagens)
  const typewriterText = document.getElementById('heroTypewriterText');
  const heroSlides = document.querySelectorAll('.hero-slide');

  if (typewriterText && heroSlides.length > 0) {
    const phrases = [
      'Sites Personalizados',
      'Campanhas no Meta Ads',
      'Cardápios Digitais',
      'Landing Pages',
      'Estratégias para vender mais'
    ];

    let phraseIdx = 0;
    let charIdx = phrases[0].length;
    let isDeleting = false;
    let typewriterTimer = null;

    function setSlide(index) {
      heroSlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }

    // Acessibilidade: respeita preferência por redução de movimento (prefers-reduced-motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      typewriterText.textContent = phrases[0];
      setSlide(0);
      const cursor = document.querySelector('.typewriter-cursor');
      if (cursor) cursor.style.display = 'none';
    } else {
      function runTypewriter() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
          charIdx--;
          typewriterText.textContent = current.substring(0, charIdx);
        } else {
          charIdx++;
          typewriterText.textContent = current.substring(0, charIdx);
        }

        let speed = isDeleting ? 40 : 80;

        // Quando a frase foi totalmente digitada
        if (!isDeleting && charIdx === current.length) {
          // Pausa por aproximadamente 2 segundos
          speed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          // Quando a frase foi totalmente apagada letra por letra
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          // Troca a ilustração com transição suave sincronizada com o novo serviço
          setSlide(phraseIdx);
          speed = 350; // Pausa sutil antes de começar a próxima frase
        }

        typewriterTimer = setTimeout(runTypewriter, speed);
      }

      // Pausa inicial de 2 segundos antes de apagar a primeira frase já carregada no HTML
      typewriterTimer = setTimeout(() => {
        isDeleting = true;
        runTypewriter();
      }, 2000);

      // Otimização de performance: pausa quando a aba estiver em segundo plano
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearTimeout(typewriterTimer);
        } else {
          clearTimeout(typewriterTimer);
          typewriterTimer = setTimeout(runTypewriter, 400);
        }
      });
    }
  }

  // 2. Acordeão de FAQ (Perguntas Frequentes)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens para manter o layout limpo e focado
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Alterna o item atual
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2.1 Acordeão de Projetos e Serviços por Categoria (Abre e Fecha)
  const projectAccordionItems = document.querySelectorAll('.project-accordion-item');

  projectAccordionItems.forEach((item) => {
    const headerBtn = item.querySelector('.project-accordion-header');
    const toggleLabel = item.querySelector('.accordion-toggle-label');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Fecha os outros itens para manter o layout focado e organizado
      projectAccordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.project-accordion-header');
          const otherLabel = otherItem.querySelector('.accordion-toggle-label');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherLabel) otherLabel.textContent = 'Ver detalhes';
        }
      });

      // Alterna o item clicado (abre e fecha)
      if (isAlreadyActive) {
        item.classList.remove('active');
        headerBtn.setAttribute('aria-expanded', 'false');
        if (toggleLabel) toggleLabel.textContent = 'Ver detalhes';
      } else {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
        if (toggleLabel) toggleLabel.textContent = 'Fechar';
      }
    });
  });

  // 3. Efeito no Header ao Rolar a Página
  const siteHeader = document.querySelector('.site-header');
  function handleScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
      siteHeader.style.background = 'rgba(11, 11, 11, 0.95)';
    } else {
      siteHeader.style.boxShadow = 'none';
      siteHeader.style.background = 'rgba(11, 11, 11, 0.85)';
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 4. Animação Suave com Intersection Observer (Reveals)
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const revealElements = document.querySelectorAll('.service-card, .about-image, .about-content, .project-accordion-item, .diff-card, .process-card, .faq-item');
    
    // Configura estilos iniciais para fade-in sutil
    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 5. Suporte para Rolagem Suave Elegante em Âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 6. Assistente Robô Espiando na Borda da Tela (Edge-Clinging Peeking Assistant)
  const robotAssistant = document.getElementById('robotAssistant');
  const robotTrigger = document.getElementById('robotTrigger');
  const robotBubble = document.getElementById('robotBubble');
  const robotBubbleClose = document.getElementById('robotBubbleClose');
  const robotDismissBtn = document.getElementById('robotDismissBtn');
  const robotDropZone = document.getElementById('robotDropZone');
  const robotHead = document.getElementById('robot-head-group');
  const robotPupils = document.getElementById('robot-pupils-wrapper');

  if (robotAssistant && robotTrigger && robotBubble) {
    // 6.1 Alternância do balão de fala
    function toggleBubble(open) {
      const willOpen = typeof open === 'boolean' ? open : !robotBubble.classList.contains('active');
      robotBubble.classList.toggle('active', willOpen);
      robotTrigger.setAttribute('aria-expanded', willOpen);
    }

    if (robotBubbleClose) {
      robotBubbleClose.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBubble(false);
      });
    }

    // Fechar ao clicar fora do robô
    document.addEventListener('click', (e) => {
      if (!robotAssistant.contains(e.target) && robotBubble.classList.contains('active')) {
        toggleBubble(false);
      }
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && robotBubble.classList.contains('active')) {
        toggleBubble(false);
      }
    });

    // Fechar balão ao clicar em um dos botões de ação do WhatsApp
    const actionLinks = robotBubble.querySelectorAll('.robot-btn');
    actionLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleBubble(false);
      });
    });

    // Minimizar / dispensar assistente
    if (robotDismissBtn) {
      robotDismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBubble(false);
        robotAssistant.classList.add('minimized');
      });
    }

    // Garante que ao recarregar a página o robô sempre reaparece
    try {
      sessionStorage.removeItem('rc_robot_dismissed');
    } catch (err) {}

    // 6.2 Sistema de Arrasto Livre e Fixação Magnética na Borda (Drag & Snap-to-Edge)
    let isDragging = false;
    let hasDragged = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let robotStartLeft = 0;
    let robotStartTop = 0;
    let userPinnedY = null;

    robotTrigger.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      hasDragged = false;
      isDragging = false;

      const rect = robotAssistant.getBoundingClientRect();
      robotStartLeft = rect.left;
      robotStartTop = rect.top;

      try {
        robotTrigger.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    robotTrigger.addEventListener('pointermove', (e) => {
      if (!robotTrigger.hasPointerCapture(e.pointerId)) return;

      const deltaX = e.clientX - pointerStartX;
      const deltaY = e.clientY - pointerStartY;

      // Distância de 6px para distinguir clique de arrasto
      if (!hasDragged && Math.hypot(deltaX, deltaY) > 6) {
        hasDragged = true;
        isDragging = true;
        robotAssistant.classList.add('is-dragging');
        if (robotDropZone) robotDropZone.classList.add('visible');
        toggleBubble(false);
      }

      if (isDragging) {
        const newLeft = robotStartLeft + deltaX;
        const newTop = robotStartTop + deltaY;

        robotAssistant.style.transition = 'none';
        robotAssistant.style.left = `${newLeft}px`;
        robotAssistant.style.top = `${newTop}px`;
        robotAssistant.style.right = 'auto';
        robotAssistant.style.transform = 'none';

        // Detecta se o ponteiro/robô está sobre a zona de fechamento inferior
        if (robotDropZone) {
          const isNearBottom = e.clientY > window.innerHeight - 130;
          const isCentered = Math.abs(e.clientX - window.innerWidth / 2) < 160;
          robotDropZone.classList.toggle('is-over', isNearBottom && isCentered);
        }
      }
    });

    function finishDrag(e) {
      if (!robotTrigger.hasPointerCapture(e.pointerId)) return;

      try {
        robotTrigger.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (isDragging) {
        isDragging = false;
        robotAssistant.classList.remove('is-dragging');

        const wasOverDropZone = robotDropZone && robotDropZone.classList.contains('is-over');
        if (robotDropZone) {
          robotDropZone.classList.remove('visible', 'is-over');
        }

        // Se soltou na zona de fechar: minimiza o robô com animação
        if (wasOverDropZone) {
          robotAssistant.classList.add('is-dismissing');
          setTimeout(() => {
            robotAssistant.classList.remove('is-dismissing');
            robotAssistant.classList.add('minimized');
          }, 320);
          if (robotPupils) robotPupils.style.transform = 'translate(0px, 0px)';
          if (robotHead) robotHead.style.transform = 'rotateY(0deg) rotateX(0deg)';
          return;
        }

        // Define a lateral mais próxima
        const screenMidX = window.innerWidth / 2;
        const snapToLeft = e.clientX < screenMidX;

        // Mantém a altura exata onde o usuário soltou o robô (com margens seguras)
        const minTop = 60;
        const maxTop = window.innerHeight - 80;
        userPinnedY = Math.max(minTop, Math.min(maxTop, e.clientY));

        // Transição magnética suave para a borda lateral
        robotAssistant.style.transition = 'left 0.45s cubic-bezier(0.16, 1, 0.3, 1), right 0.45s cubic-bezier(0.16, 1, 0.3, 1), top 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        robotAssistant.style.top = `${userPinnedY}px`;

        if (snapToLeft) {
          currentSide = 'left';
          robotAssistant.classList.remove('peeking-right');
          robotAssistant.classList.add('peeking-left');
          robotAssistant.style.left = '0px';
          robotAssistant.style.right = 'auto';
        } else {
          currentSide = 'right';
          robotAssistant.classList.remove('peeking-left');
          robotAssistant.classList.add('peeking-right');
          robotAssistant.style.right = '0px';
          robotAssistant.style.left = 'auto';
        }
        robotAssistant.style.transform = '';

        if (robotPupils) robotPupils.style.transform = 'translate(0px, 0px)';
        if (robotHead) robotHead.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    }

    robotTrigger.addEventListener('pointerup', finishDrag);
    robotTrigger.addEventListener('pointercancel', finishDrag);

    // Clique abre o diálogo somente se o robô NÃO foi arrastado
    robotTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hasDragged) {
        hasDragged = false;
        return;
      }
      toggleBubble();
    });

    // 6.3 Alternância suave a cada duas seções (Desktop & Mobile)
    const sectionSideConfig = [
      { id: 'inicio', side: 'right' },
      { id: 'sobre', side: 'right' },
      { id: 'servicos', side: 'left' },
      { id: 'projetos', side: 'left' },
      { id: 'diferenciais', side: 'right' },
      { id: 'como-trabalhamos', side: 'right' },
      { id: 'contato-cta', side: 'left' },
      { id: 'faq', side: 'left' }
    ];

    let currentSide = 'right';
    let isSideTransitioning = false;

    function setRobotSide(newSide) {
      if (currentSide === newSide || isSideTransitioning || isDragging) return;
      isSideTransitioning = true;
      currentSide = newSide;

      toggleBubble(false);

      robotAssistant.classList.add('is-hiding');

      setTimeout(() => {
        if (newSide === 'left') {
          robotAssistant.classList.remove('peeking-right');
          robotAssistant.classList.add('peeking-left');
          robotAssistant.style.left = '0px';
          robotAssistant.style.right = 'auto';
        } else {
          robotAssistant.classList.remove('peeking-left');
          robotAssistant.classList.add('peeking-right');
          robotAssistant.style.right = '0px';
          robotAssistant.style.left = 'auto';
        }

        robotAssistant.style.transform = '';

        if (userPinnedY !== null) {
          robotAssistant.style.top = `${userPinnedY}px`;
        }

        if (robotPupils) robotPupils.style.transform = 'translate(0px, 0px)';
        if (robotHead) robotHead.style.transform = 'rotateY(0deg) rotateX(0deg)';

        setTimeout(() => {
          robotAssistant.classList.remove('is-hiding');
          setTimeout(() => {
            isSideTransitioning = false;
          }, 350);
        }, 50);
      }, 300);
    }

    // Verificação contínua e infalível no scroll (funciona 100% no touch mobile e desktop)
    function checkSectionSideOnScroll() {
      if (isDragging || isSideTransitioning) return;
      const triggerY = window.innerHeight * 0.45;

      for (let i = 0; i < sectionSideConfig.length; i++) {
        const item = sectionSideConfig[i];
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          if (currentSide !== item.side) {
            setRobotSide(item.side);
          }
          return;
        }
      }

      // Topo absoluto da página
      if (window.scrollY < 120 && currentSide !== 'right') {
        setRobotSide('right');
      }
    }

    let scrollSideRaf = null;
    function triggerScrollSideCheck() {
      if (!scrollSideRaf) {
        scrollSideRaf = requestAnimationFrame(() => {
          scrollSideRaf = null;
          checkSectionSideOnScroll();
        });
      }
    }

    window.addEventListener('scroll', triggerScrollSideCheck, { passive: true });
    window.addEventListener('touchmove', triggerScrollSideCheck, { passive: true });

    // IntersectionObserver complementar com threshold 0
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isDragging && !isSideTransitioning) {
            const match = sectionSideConfig.find(item => item.id === entry.target.id);
            if (match && currentSide !== match.side) {
              setRobotSide(match.side);
            }
          }
        });
      }, {
        root: null,
        rootMargin: '-15% 0px -25% 0px',
        threshold: 0
      });

      sectionSideConfig.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    }

    // 6.3 Sistema de Rastreamento Visual dos Olhos e Cabeça (Desktop & Mobile)
    let lookRafId = null;
    let targetX = 0;
    let targetY = 0;

    function updateRobotGaze(screenX, screenY) {
      if (!robotPupils || !robotHead || isSideTransitioning) return;

      const rect = robotAssistant.getBoundingClientRect();
      const isLeft = currentSide === 'left';
      const visorCenterX = isLeft ? rect.left + rect.width * 0.396 : rect.right - rect.width * 0.396;
      const visorCenterY = rect.top + rect.height * 0.35;

      const deltaX = screenX - visorCenterX;
      const deltaY = screenY - visorCenterY;

      // Inverte o vetor horizontal caso o SVG esteja espelhado via scaleX(-1) no lado esquerdo
      const orientedDeltaX = isLeft ? -deltaX : deltaX;

      const angle = Math.atan2(deltaY, orientedDeltaX);
      const distance = Math.min(Math.hypot(orientedDeltaX, deltaY), 500) / 500;

      // Limites de deslocamento das pupilas no visor (em pixels)
      const maxPupilX = 4.8;
      const maxPupilY = 3.6;
      const pupilX = Math.cos(angle) * distance * maxPupilX;
      const pupilY = Math.sin(angle) * distance * maxPupilY;

      // Rotação sutil da cabeça (em graus)
      const headRotY = Math.max(-9, Math.min(9, (orientedDeltaX / window.innerWidth) * 16));
      const headRotX = Math.max(-6, Math.min(6, (deltaY / window.innerHeight) * 12));

      robotPupils.style.transform = `translate(${pupilX.toFixed(2)}px, ${pupilY.toFixed(2)}px)`;
      robotHead.style.transform = `perspective(240px) rotateY(${headRotY.toFixed(2)}deg) rotateX(${(-headRotX).toFixed(2)}deg)`;
    }

    // Desktop: Rastreamento contínuo do mouse
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!lookRafId) {
          lookRafId = requestAnimationFrame(() => {
            lookRafId = null;
            updateRobotGaze(targetX, targetY);
          });
        }
      }, { passive: true });
    }

    // Mobile: Rastreamento de toque (touch) e rolagem (scroll)
    let touchTimeout = null;
    function handleTouch(e) {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      targetX = touch.clientX;
      targetY = touch.clientY;

      if (!lookRafId) {
        lookRafId = requestAnimationFrame(() => {
          lookRafId = null;
          updateRobotGaze(targetX, targetY);
        });
      }

      if (touchTimeout) clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        // Volta a olhar suavemente para o centro da tela após soltar o dedo
        updateRobotGaze(window.innerWidth / 2, window.innerHeight * 0.45);
      }, 1200);
    }

    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Durante scroll, robô orienta o olhar para o centro do conteúdo
    let scrollLookTimeout = null;
    window.addEventListener('scroll', () => {
      if (!scrollLookTimeout) {
        scrollLookTimeout = setTimeout(() => {
          scrollLookTimeout = null;
          updateRobotGaze(window.innerWidth / 2, window.innerHeight * 0.5);
        }, 100);
      }
    }, { passive: true });
  }
});

