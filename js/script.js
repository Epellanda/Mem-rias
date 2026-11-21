/**
 * MEMORIAL ESCOLAR & PORTFÓLIO DE REDAÇÕES — EDUARDA PELLANDA
 * Arquivo: js/script.js
 * Comportamento, Interatividade, Filtros, Modais e Acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- INICIALIZAÇÃO DE ESTADO ---
  let currentEssayIndex = 0;
  let currentGalleryIndex = 0;
  let activeCategory = 'all';
  let searchTerm = '';
  let activeGalleryFilter = 'all';
  let currentViewMode = 'grid'; // 'grid' ou 'accordion'

  // --- ELEMENTOS DO DOM ---
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('reading-progress-bar');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Galeria
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightboxOverlay = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  // Redações
  const essaysSearchInput = document.getElementById('essays-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const categoryPills = document.querySelectorAll('.category-pill');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewAccordionBtn = document.getElementById('view-accordion-btn');
  const essaysGrid = document.getElementById('essays-grid');
  const essaysAccordion = document.getElementById('essays-accordion');
  const essaysCounterStatus = document.getElementById('essays-counter-status');

  // Modal Leitor de Redação
  const essayModal = document.getElementById('essay-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalNumberBadge = document.getElementById('modal-number-badge');
  const modalCatTag = document.getElementById('modal-cat-tag');
  const modalEssayTitle = document.getElementById('modal-essay-title');
  const modalWordCount = document.getElementById('modal-word-count');
  const modalReadingTime = document.getElementById('modal-reading-time');
  const modalEssayBody = document.getElementById('modal-essay-body');
  const modalRepertoiresList = document.getElementById('modal-repertoires-list');
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');
  const copyEssayBtn = document.getElementById('copy-essay-btn');
  const printEssayBtn = document.getElementById('print-essay-btn');
  const modalFontDecrease = document.getElementById('modal-font-decrease');
  const modalFontIncrease = document.getElementById('modal-font-increase');

  // Mural de Recados
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookCardsGrid = document.getElementById('guestbook-cards-grid');

  // Toast
  const toastNotice = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');

  // ==========================================
  // 1. TEMA ESCURO / CLARO COM LOCALSTORAGE
  // ==========================================
  const savedTheme = localStorage.getItem('eduarda_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('eduarda_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
    showToast(isDark ? 'Tema Noturno ativado ✨' : 'Tema Diurno ativado ☀️');
  });

  function updateThemeIcon(isDark) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    themeToggleBtn.setAttribute('title', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
  }

  // ==========================================
  // 3. BARRA DE PROGRESSO & SCROLL DO HEADER
  // ==========================================
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy nos links do Menu
    highlightActiveNavLink();
  });

  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link && scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  // ==========================================
  // 4. MENU MOBILE (HAMBÚRGUER)
  // ==========================================
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.innerHTML = isOpen ? '✕' : '☰';
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '☰';
      });
    });
  }

  // ==========================================
  // 5. GALERIA VISUAL DE MEMÓRIAS & LIGHTBOX
  // ==========================================
  function renderGallery() {
    if (!galleryGrid || typeof GALLERY_DATA === 'undefined') return;

    const filtered = GALLERY_DATA.filter(item => {
      if (activeGalleryFilter === 'all') return true;
      return item.phase === activeGalleryFilter;
    });

    galleryGrid.innerHTML = '';

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Ver foto ampliada: ${item.title}`);

      card.innerHTML = `
        <div class="gallery-card-img-wrap">
          <img src="${item.image}" alt="${item.title}" class="gallery-card-img" loading="lazy">
          <div class="gallery-zoom-badge" title="Ampliar foto">🔍</div>
          <div class="gallery-card-overlay">
            <span class="gallery-card-phase">${item.phaseLabel} • ${item.school}</span>
            <h4 class="gallery-card-title">${item.title}</h4>
            <p class="gallery-card-caption-preview">${item.caption}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        // Encontra o índice global correspondente em GALLERY_DATA
        const globalIndex = GALLERY_DATA.findIndex(g => g.id === item.id);
        openLightbox(globalIndex);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const globalIndex = GALLERY_DATA.findIndex(g => g.id === item.id);
          openLightbox(globalIndex);
        }
      });

      galleryGrid.appendChild(card);
    });
  }

  // Filtros de fase da Galeria
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGalleryFilter = btn.getAttribute('data-filter');
      renderGallery();
    });
  });

  // Lightbox Modal
  function openLightbox(index) {
    if (typeof GALLERY_DATA === 'undefined' || !GALLERY_DATA[index]) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = GALLERY_DATA[currentGalleryIndex];
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = `${item.title} (${item.phaseLabel})`;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentGalleryIndex + 1} de ${GALLERY_DATA.length}`;
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
      updateLightboxContent();
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY_DATA.length;
      updateLightboxContent();
    });
  }

  // ==========================================
  // 6. PORTFÓLIO DE REDAÇÕES (CARDS & ACORDEÃO)
  // ==========================================
  function getFilteredEssays() {
    if (typeof ESSAYS_DATA === 'undefined') return [];

    return ESSAYS_DATA.filter(essay => {
      // Filtro de Categoria
      const matchesCategory = activeCategory === 'all' || essay.category === activeCategory;

      // Filtro de Busca
      const searchNormalized = searchTerm.trim().toLowerCase();
      if (!searchNormalized) return matchesCategory;

      const titleMatch = essay.title.toLowerCase().includes(searchNormalized);
      const repMatch = essay.repertoires.some(r => r.toLowerCase().includes(searchNormalized));
      const contentMatch = essay.paragraphs.some(p => p.toLowerCase().includes(searchNormalized));
      const numberMatch = essay.num.includes(searchNormalized);

      return matchesCategory && (titleMatch || repMatch || contentMatch || numberMatch);
    });
  }

  function renderEssays() {
    const filtered = getFilteredEssays();
    updateCounterStatus(filtered.length);

    if (currentViewMode === 'grid') {
      renderEssaysGrid(filtered);
    } else {
      renderEssaysAccordion(filtered);
    }
  }

  function updateCounterStatus(count) {
    if (!essaysCounterStatus) return;
    const total = typeof ESSAYS_DATA !== 'undefined' ? ESSAYS_DATA.length : 17;
    if (searchTerm) {
      essaysCounterStatus.innerHTML = `Exibindo <strong>${count}</strong> de <strong>${total}</strong> redações para o termo "<em>${escapeHTML(searchTerm)}</em>"`;
    } else {
      essaysCounterStatus.innerHTML = `Exibindo <strong>${count}</strong> de <strong>${total}</strong> redações do 3º ano`;
    }
  }

  function renderEssaysGrid(essays) {
    if (!essaysGrid) return;
    essaysGrid.innerHTML = '';

    if (essays.length === 0) {
      essaysGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-main); margin-bottom: 0.5rem;">Nenhuma redação encontrada</h3>
          <p style="font-size: 0.95rem;">Tente buscar por outro termo ou selecione a categoria "Todas".</p>
        </div>
      `;
      return;
    }

    essays.forEach(essay => {
      const card = document.createElement('article');
      card.className = 'essay-card';

      const repertoiresHTML = essay.repertoires.map(r => `<span class="repertoire-chip">🔖 ${escapeHTML(r)}</span>`).join('');

      card.innerHTML = `
        <div class="essay-card-header">
          <span class="essay-number-badge">Redação #${essay.num}</span>
          <span class="essay-cat-tag">${essay.theme_icon} ${essay.category_label}</span>
        </div>
        <h3 class="essay-card-title">${escapeHTML(essay.title)}</h3>
        <p class="essay-card-excerpt">${escapeHTML(essay.paragraphs[0])}</p>
        <div class="essay-repertoires-list">
          ${repertoiresHTML}
        </div>
        <div class="essay-card-footer">
          <div class="essay-meta-info">
            <span>⏱️ ${essay.reading_time_min} min</span>
            <span>📝 ${essay.word_count} palavras</span>
          </div>
          <button class="btn-read-essay" data-essay-id="${essay.id}">
            Ler Completa ➔
          </button>
        </div>
      `;

      // Evento de clique para abrir o Modal Leitor
      const readBtn = card.querySelector('.btn-read-essay');
      readBtn.addEventListener('click', () => {
        openEssayModal(essay.id - 1);
      });

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-read-essay')) {
          openEssayModal(essay.id - 1);
        }
      });

      essaysGrid.appendChild(card);
    });
  }

  function renderEssaysAccordion(essays) {
    if (!essaysAccordion) return;
    essaysAccordion.innerHTML = '';

    if (essays.length === 0) {
      essaysAccordion.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-main); margin-bottom: 0.5rem;">Nenhuma redação encontrada</h3>
          <p style="font-size: 0.95rem;">Tente buscar por outro termo ou selecione a categoria "Todas".</p>
        </div>
      `;
      return;
    }

    essays.forEach(essay => {
      const item = document.createElement('div');
      item.className = 'accordion-item';

      const paragraphsHTML = essay.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
      const repertoiresHTML = essay.repertoires.map(r => `<span class="repertoire-chip">🔖 ${escapeHTML(r)}</span>`).join('');

      item.innerHTML = `
        <button class="accordion-header" aria-expanded="false">
          <div class="accordion-header-left">
            <span class="accordion-num">#${essay.num}</span>
            <div>
              <h4 class="accordion-title">${escapeHTML(essay.title)}</h4>
              <span style="font-size: 0.775rem; color: var(--text-muted);">${essay.theme_icon} ${essay.category_label} • ⏱️ ${essay.reading_time_min} min</span>
            </div>
          </div>
          <span class="accordion-toggle-icon">▼</span>
        </button>
        <div class="accordion-body">
          <div class="accordion-essay-text">
            ${paragraphsHTML}
          </div>
          <div class="accordion-actions">
            <div class="essay-repertoires-list" style="margin-bottom: 0;">
              ${repertoiresHTML}
            </div>
            <button class="btn btn-outline" style="padding: 0.4rem 0.9rem; font-size: 0.8rem;" data-modal-id="${essay.id}">
              Modo Foco 🔍
            </button>
          </div>
        </div>
      `;

      const headerBtn = item.querySelector('.accordion-header');
      headerBtn.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        headerBtn.setAttribute('aria-expanded', isOpen);
      });

      const modalBtn = item.querySelector('[data-modal-id]');
      modalBtn.addEventListener('click', () => {
        openEssayModal(essay.id - 1);
      });

      essaysAccordion.appendChild(item);
    });
  }

  // ==========================================
  // 7. MODAL LEITOR DE REDAÇÃO (MODO FOCO)
  // ==========================================
  function openEssayModal(index) {
    if (typeof ESSAYS_DATA === 'undefined' || !ESSAYS_DATA[index]) return;
    currentEssayIndex = index;
    updateEssayModalContent();
    essayModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEssayModal() {
    essayModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateEssayModalContent() {
    const essay = ESSAYS_DATA[currentEssayIndex];
    if (!essay) return;

    modalNumberBadge.textContent = `Redação #${essay.num}`;
    modalCatTag.textContent = `${essay.theme_icon} ${essay.category_label} • Ref: ${essay.orig}`;
    modalEssayTitle.textContent = essay.title;
    modalWordCount.textContent = `📝 ${essay.word_count} palavras`;
    modalReadingTime.textContent = `⏱️ ${essay.reading_time_min} min de leitura`;

    // Parágrafos estruturados (Introdução, D1, D2, Conclusão)
    const labels = [
      { class: 'intro', label: 'Introdução & Contextualização' },
      { class: 'd1', label: 'Desenvolvimento 1 — Argumentação' },
      { class: 'd2', label: 'Desenvolvimento 2 — Aprofundamento Crítico' },
      { class: 'concl', label: 'Conclusão & Proposta de Intervenção' }
    ];

    modalEssayBody.innerHTML = '';
    const structuredDiv = document.createElement('div');
    structuredDiv.className = 'essay-structured-view';

    essay.paragraphs.forEach((p, idx) => {
      const block = document.createElement('div');
      const info = labels[idx] || { class: 'd2', label: `Parágrafo ${idx + 1}` };
      block.className = `essay-section-block ${info.class}`;
      block.innerHTML = `
        <div class="essay-section-label">${info.label}</div>
        <p class="essay-paragraph-text">${escapeHTML(p)}</p>
      `;
      structuredDiv.appendChild(block);
    });

    modalEssayBody.appendChild(structuredDiv);

    // Box de Repertórios
    modalRepertoiresList.innerHTML = essay.repertoires.map(r => `<span class="repertoire-chip">🔖 ${escapeHTML(r)}</span>`).join('');

    // Botões de Anterior / Próxima
    modalPrevBtn.disabled = currentEssayIndex === 0;
    modalNextBtn.disabled = currentEssayIndex === ESSAYS_DATA.length - 1;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEssayModal);
  if (essayModal) {
    essayModal.addEventListener('click', (e) => {
      if (e.target === essayModal) closeEssayModal();
    });
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      if (currentEssayIndex > 0) {
        currentEssayIndex--;
        updateEssayModalContent();
      }
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      if (currentEssayIndex < ESSAYS_DATA.length - 1) {
        currentEssayIndex++;
        updateEssayModalContent();
      }
    });
  }

  // Copiar Texto da Redação
  if (copyEssayBtn) {
    copyEssayBtn.addEventListener('click', () => {
      const essay = ESSAYS_DATA[currentEssayIndex];
      if (!essay) return;
      const fullText = `${essay.title}\n\n` + essay.paragraphs.join('\n\n');
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('Texto da redação copiado com sucesso! 📋');
      }).catch(() => {
        showToast('Não foi possível copiar o texto automaticamente.');
      });
    });
  }

  // Imprimir Redação
  if (printEssayBtn) {
    printEssayBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Ajuste de Tamanho de Fonte dentro do Modal
  let modalFontStep = 0;
  if (modalFontIncrease && modalFontDecrease) {
    modalFontIncrease.addEventListener('click', () => {
      if (modalFontStep < 2) {
        modalFontStep++;
        applyModalFontSize();
      }
    });
    modalFontDecrease.addEventListener('click', () => {
      if (modalFontStep > -1) {
        modalFontStep--;
        applyModalFontSize();
      }
    });
  }

  function applyModalFontSize() {
    const paragraphs = modalEssayBody.querySelectorAll('.essay-paragraph-text');
    const sizes = ['0.95rem', '1.05rem', '1.2rem', '1.35rem'];
    const currentSize = sizes[modalFontStep + 1] || '1.05rem';
    paragraphs.forEach(p => {
      p.style.fontSize = currentSize;
    });
  }

  // ==========================================
  // 8. FILTROS & BUSCA DE REDAÇÕES
  // ==========================================
  // Busca em tempo real com debounce
  let searchTimeout = null;
  if (essaysSearchInput) {
    essaysSearchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchTerm = e.target.value;
        if (searchClearBtn) {
          searchClearBtn.classList.toggle('visible', searchTerm.length > 0);
        }
        renderEssays();
      }, 150);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      essaysSearchInput.value = '';
      searchTerm = '';
      searchClearBtn.classList.remove('visible');
      renderEssays();
      essaysSearchInput.focus();
    });
  }

  // Filtros de Categoria
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderEssays();
    });
  });

  // Alternador de Visualização (Grade vs. Acordeão)
  if (viewGridBtn && viewAccordionBtn) {
    viewGridBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewAccordionBtn.classList.remove('active');
      essaysGrid.classList.remove('hidden');
      essaysAccordion.classList.remove('active');
      renderEssays();
    });

    viewAccordionBtn.addEventListener('click', () => {
      currentViewMode = 'accordion';
      viewAccordionBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      essaysGrid.classList.add('hidden');
      essaysAccordion.classList.add('active');
      renderEssays();
    });
  }

  // ==========================================
  // 9. NAVEGAÇÃO POR TECLADO (GLOBAL)
  // ==========================================
  window.addEventListener('keydown', (e) => {
    // Tecla Esc fecha qualquer modal aberto
    if (e.key === 'Escape') {
      if (lightboxOverlay.classList.contains('active')) closeLightbox();
      if (essayModal.classList.contains('active')) closeEssayModal();
    }

    // Navegação de fotos no Lightbox com setas
    if (lightboxOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
        updateLightboxContent();
      } else if (e.key === 'ArrowRight') {
        currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY_DATA.length;
        updateLightboxContent();
      }
    }

    // Navegação de redações no Modal com setas
    if (essayModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft' && currentEssayIndex > 0) {
        currentEssayIndex--;
        updateEssayModalContent();
      } else if (e.key === 'ArrowRight' && currentEssayIndex < ESSAYS_DATA.length - 1) {
        currentEssayIndex++;
        updateEssayModalContent();
      }
    }
  });

  // ==========================================
  // 10. MURAL DE RECADOS (GUESTBOOK)
  // ==========================================
  const DEFAULT_MESSAGES = [
    {
      author: 'Amigos',
      tag: 'Amigos do Terceirão',
      message: 'Pellanda, nossa caminhada no 3F não teria sido a mesma sem você! Das risadas no pátio até o desespero pré-provas, levamos memórias eternas da nossa pantera!',
      date: 'Novembro de 2024'
    },
    {
      author: 'Família',
      tag: 'Família',
      message: 'Muito orgulho da sua trajetória, desde o Pré II até a formatura do Ensino Médio. Você superou todos os desafios e agora um futuro brilhante te espera na faculdade!',
      date: 'Novembro de 2024'
    }
  ];

  function getGuestbookMessages() {
    try {
      const stored = localStorage.getItem('eduarda_guestbook_messages');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_MESSAGES;
  }

  function renderGuestbook() {
    if (!guestbookCardsGrid) return;
    const messages = getGuestbookMessages();
    guestbookCardsGrid.innerHTML = '';

    messages.forEach(item => {
      const card = document.createElement('div');
      card.className = 'guestbook-card';
      card.innerHTML = `
        <div class="guestbook-card-header">
          <span class="guestbook-author">${escapeHTML(item.author)}</span>
          <span class="guestbook-tag">${escapeHTML(item.tag)}</span>
        </div>
        <p class="guestbook-message">"${escapeHTML(item.message)}"</p>
        <span class="guestbook-date">${escapeHTML(item.date)}</span>
      `;
      guestbookCardsGrid.appendChild(card);
    });
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('guestbook-author').value.trim();
      const tag = document.getElementById('guestbook-role').value;
      const message = document.getElementById('guestbook-message').value.trim();

      if (!author || !message) {
        showToast('Por favor, preencha seu nome e a mensagem!');
        return;
      }

      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

      const newEntry = { author, tag, message, date: dateStr };
      const currentList = getGuestbookMessages();
      currentList.unshift(newEntry);

      localStorage.setItem('eduarda_guestbook_messages', JSON.stringify(currentList));
      renderGuestbook();
      guestbookForm.reset();
      showToast('Sua mensagem de carinho foi publicada no mural! 💖');
    });
  }

  // ==========================================
  // 11. UTILITÁRIOS: TOAST & ESCAPE HTML
  // ==========================================
  function showToast(msg) {
    if (!toastNotice || !toastText) return;
    toastText.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // RENDERIZAÇÃO INICIAL
  renderGallery();
  renderEssays();
  renderGuestbook();
});
