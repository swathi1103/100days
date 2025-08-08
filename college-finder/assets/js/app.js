/* College Finder India - Vanilla JS app */
(function () {
  const dom = {
    year: document.getElementById('year'),
    searchInput: document.getElementById('searchInput'),
    toggles: document.querySelectorAll('.toggle-group .toggle'),
    btnSearch: document.getElementById('btnSearch'),
    stateSelect: document.getElementById('stateSelect'),
    cityInput: document.getElementById('cityInput'),
    degBtech: document.getElementById('degBtech'),
    degMba: document.getElementById('degMba'),
    maxFees: document.getElementById('maxFees'),
    maxFeesValue: document.getElementById('maxFeesValue'),
    courseSelect: document.getElementById('courseSelect'),
    btnClearFilters: document.getElementById('btnClearFilters'),
    btnApplyFilters: document.getElementById('btnApplyFilters'),
    sortSelect: document.getElementById('sortSelect'),
    collegeGrid: document.getElementById('collegeGrid'),
    resultsCount: document.getElementById('resultsCount'),
    emptyState: document.getElementById('emptyState'),
    btnResetAll: document.getElementById('btnResetAll'),
    btnOpenLead: document.getElementById('btnOpenLead'),
    // Login
    btnLogin: document.getElementById('btnLogin'),
    btnProfile: document.getElementById('btnProfile'),
    profileName: document.getElementById('profileName'),
    loginModal: document.getElementById('loginModal'),
    loginName: document.getElementById('loginName'),
    loginEmail: document.getElementById('loginEmail'),
    loginPhone: document.getElementById('loginPhone'),
    btnDoLogin: document.getElementById('btnDoLogin'),
    closeLogin: document.getElementById('closeLogin'),
    // Lead
    leadModal: document.getElementById('leadModal'),
    leadName: document.getElementById('leadName'),
    leadEmail: document.getElementById('leadEmail'),
    leadPhone: document.getElementById('leadPhone'),
    leadMessage: document.getElementById('leadMessage'),
    btnSubmitLead: document.getElementById('btnSubmitLead'),
    closeLead: document.getElementById('closeLead'),
    // Details
    detailsModal: document.getElementById('detailsModal'),
    detailsTitle: document.getElementById('detailsTitle'),
    detailsGallery: document.getElementById('detailsGallery'),
    detailsLocation: document.getElementById('detailsLocation'),
    detailsType: document.getElementById('detailsType'),
    detailsFees: document.getElementById('detailsFees'),
    detailsRating: document.getElementById('detailsRating'),
    detailsCourses: document.getElementById('detailsCourses'),
    detailsDescription: document.getElementById('detailsDescription'),
    detailsWebsite: document.getElementById('detailsWebsite'),
    detailsSave: document.getElementById('detailsSave'),
    detailsConnect: document.getElementById('detailsConnect'),
    closeDetails: document.getElementById('closeDetails'),
    // Misc
    btnSaved: document.getElementById('btnSaved'),
  };

  const fmt = new Intl.NumberFormat('en-IN');

  const STORAGE = {
    user: 'cfi_user',
    leads: 'cfi_leads',
    saved: 'cfi_saved',
  };

  dom.year.textContent = new Date().getFullYear();

  // Sample dataset
  const colleges = [
    {
      id: 'iitb',
      name: 'Indian Institute of Technology Bombay',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Public',
      website: 'https://www.iitb.ac.in',
      rating: 4.9,
      degrees: ['btech', 'mba'],
      courses: ['Computer Science', 'Mechanical', 'Electrical', 'MBA'],
      fees: { btech: 225000, mba: 250000 },
      images: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop'
      ],
      description: 'A premier engineering and management institute known for world-class research, innovation and strong industry connect.'
    },
    {
      id: 'iima',
      name: 'Indian Institute of Management Ahmedabad',
      city: 'Ahmedabad',
      state: 'Gujarat',
      type: 'Public',
      website: 'https://www.iima.ac.in',
      rating: 4.8,
      degrees: ['mba'],
      courses: ['MBA', 'PGP'],
      fees: { mba: 2300000 },
      images: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=1200&auto=format&fit=crop'
      ],
      description: 'India’s top management institute with strong placements, global network and rigorous academics.'
    },
    {
      id: 'bits-pilani',
      name: 'BITS Pilani',
      city: 'Pilani',
      state: 'Rajasthan',
      type: 'Private',
      website: 'https://www.bits-pilani.ac.in',
      rating: 4.6,
      degrees: ['btech'],
      courses: ['Computer Science', 'Electronics', 'Chemical'],
      fees: { btech: 240000 },
      images: [
        'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop'
      ],
      description: 'Renowned private institute with flexible academics, strong alumni network, and vibrant campus life.'
    },
    {
      id: 'spjimr',
      name: 'SPJIMR Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Private',
      website: 'https://www.spjimr.org',
      rating: 4.5,
      degrees: ['mba'],
      courses: ['MBA', 'PGDM'],
      fees: { mba: 1990000 },
      images: [
        'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop'
      ],
      description: 'Top private B-school with industry-focused programs and excellent placements.'
    },
    {
      id: 'vit',
      name: 'Vellore Institute of Technology',
      city: 'Vellore',
      state: 'Tamil Nadu',
      type: 'Private',
      website: 'https://vit.ac.in',
      rating: 4.3,
      degrees: ['btech'],
      courses: ['CSE', 'ECE', 'ME'],
      fees: { btech: 190000 },
      images: [
        'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
      ],
      description: 'Leading private university known for modern infrastructure and strong industry collaborations.'
    },
    {
      id: 'iimk',
      name: 'IIM Kozhikode',
      city: 'Kozhikode',
      state: 'Kerala',
      type: 'Public',
      website: 'https://www.iimk.ac.in',
      rating: 4.4,
      degrees: ['mba'],
      courses: ['MBA', 'PGP'],
      fees: { mba: 1950000 },
      images: [
        'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=1200&auto=format&fit=crop'
      ],
      description: 'Top IIM with a picturesque campus and strong academic culture.'
    }
  ];

  // Build state and course options
  const uniqueStates = Array.from(new Set(colleges.map(c => c.state))).sort();
  uniqueStates.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s; dom.stateSelect.appendChild(opt);
  });

  const uniqueCourses = Array.from(new Set(colleges.flatMap(c => c.courses))).sort();
  uniqueCourses.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c; dom.courseSelect.appendChild(opt);
  });

  // Defaults
  dom.maxFees.value = 500000;
  dom.maxFeesValue.textContent = `₹${fmt.format(Number(dom.maxFees.value))}`;

  // Local storage helpers
  function readStorage(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }
  function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Auth
  function getUser() { return readStorage(STORAGE.user, null); }
  function setUser(user) { writeStorage(STORAGE.user, user); }
  function updateAuthUI() {
    const user = getUser();
    if (user) {
      dom.btnLogin.classList.add('hidden');
      dom.btnProfile.classList.remove('hidden');
      dom.profileName.textContent = user.name.split(' ')[0];
      // prefill lead form
      dom.leadName.value = user.name || '';
      dom.leadEmail.value = user.email || '';
      dom.leadPhone.value = user.phone || '';
    } else {
      dom.btnLogin.classList.remove('hidden');
      dom.btnProfile.classList.add('hidden');
    }
  }

  function loginOpen() { dom.loginModal.showModal(); }
  function loginClose() { dom.loginModal.close(); }
  function leadOpen() { dom.leadModal.showModal(); }
  function leadClose() { dom.leadModal.close(); }
  function detailsOpen() { dom.detailsModal.showModal(); }
  function detailsClose() { dom.detailsModal.close(); }

  dom.btnLogin.addEventListener('click', loginOpen);
  dom.closeLogin.addEventListener('click', loginClose);
  dom.btnOpenLead.addEventListener('click', leadOpen);
  dom.closeLead.addEventListener('click', leadClose);
  dom.closeDetails.addEventListener('click', detailsClose);

  dom.btnDoLogin.addEventListener('click', function (e) {
    e.preventDefault();
    const name = dom.loginName.value.trim();
    const email = dom.loginEmail.value.trim();
    const phone = dom.loginPhone.value.trim();
    if (!name || !email || !/^\d{10}$/.test(phone)) return;
    setUser({ name, email, phone });
    loginClose();
    updateAuthUI();
  });

  dom.btnSubmitLead.addEventListener('click', function (e) {
    e.preventDefault();
    const name = dom.leadName.value.trim();
    const email = dom.leadEmail.value.trim();
    const phone = dom.leadPhone.value.trim();
    const message = dom.leadMessage.value.trim();
    if (!name || !email || !/^\d{10}$/.test(phone)) return;
    const leads = readStorage(STORAGE.leads, []);
    leads.push({ name, email, phone, message, ts: Date.now() });
    writeStorage(STORAGE.leads, leads);
    alert('Thanks! Our counselor will contact you soon.');
    leadClose();
  });

  // Saved colleges
  function getSaved() { return new Set(readStorage(STORAGE.saved, [])); }
  function setSaved(set) { writeStorage(STORAGE.saved, Array.from(set)); }

  // Rendering
  function renderCard(college, savedSet) {
    const cover = college.images[0] || '';
    const minFees = Math.min(...Object.values(college.fees));
    const hasBtech = college.degrees.includes('btech');
    const hasMba = college.degrees.includes('mba');
    const saved = savedSet.has(college.id);
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-media" style="background-image:url('${cover}')"></div>
      <div class="card-body">
        <h3 class="card-title">${college.name}</h3>
        <div class="card-meta">
          <span>${college.city}, ${college.state}</span>
          <span>•</span>
          <span>${college.type}</span>
        </div>
        <div class="card-tags">
          ${hasBtech ? '<span class="tag">B.Tech</span>' : ''}
          ${hasMba ? '<span class="tag">MBA</span>' : ''}
          <span class="tag">⭐ ${college.rating}</span>
        </div>
        <div class="card-actions">
          <button class="save-btn ${saved ? 'saved' : ''}" data-id="${college.id}">${saved ? 'Saved' : 'Save'}</button>
          <div style="display:flex; gap:6px; align-items:center;">Fees from <strong>₹${fmt.format(minFees)}</strong></div>
          <button class="btn btn-secondary btn-details" data-id="${college.id}">Details</button>
        </div>
      </div>
    `;
    return card;
  }

  function applyFilters(data) {
    const query = dom.searchInput.value.trim().toLowerCase();
    const degreeToggle = document.querySelector('.toggle-group .toggle.active')?.dataset.degree || 'all';
    const state = dom.stateSelect.value;
    const city = dom.cityInput.value.trim().toLowerCase();
    const allowB = dom.degBtech.checked;
    const allowM = dom.degMba.checked;
    const maxFee = Number(dom.maxFees.value) || Infinity;
    const course = dom.courseSelect.value;

    let filtered = data.filter(c => {
      const matchesQuery = !query || [c.name, c.city, c.state, ...(c.courses || [])].join(' ').toLowerCase().includes(query);
      const matchesDegreeToggle = degreeToggle === 'all' || c.degrees.includes(degreeToggle);
      const matchesDegreeChecks = ((allowB && c.degrees.includes('btech')) || (allowM && c.degrees.includes('mba')));
      const matchesState = !state || c.state === state;
      const matchesCity = !city || c.city.toLowerCase().includes(city);
      const matchesCourse = !course || (c.courses || []).includes(course);
      const minFees = Math.min(...Object.values(c.fees));
      const matchesFees = minFees <= maxFee || (degreeToggle === 'btech' && (c.fees.btech ?? Infinity) <= maxFee) || (degreeToggle === 'mba' && (c.fees.mba ?? Infinity) <= maxFee);
      return matchesQuery && matchesDegreeToggle && matchesDegreeChecks && matchesState && matchesCity && matchesCourse && matchesFees;
    });

    // Sort
    const sort = dom.sortSelect.value;
    filtered.sort((a, b) => {
      if (sort === 'feesAsc') {
        return Math.min(...Object.values(a.fees)) - Math.min(...Object.values(b.fees));
      } else if (sort === 'feesDesc') {
        return Math.min(...Object.values(b.fees)) - Math.min(...Object.values(a.fees));
      } else if (sort === 'ratingDesc') {
        return b.rating - a.rating;
      }
      // relevance: keep as is
      return 0;
    });

    return filtered;
  }

  function renderList() {
    const saved = getSaved();
    const filtered = applyFilters(colleges);
    dom.resultsCount.textContent = filtered.length;
    dom.collegeGrid.innerHTML = '';
    if (filtered.length === 0) {
      dom.emptyState.classList.remove('hidden');
      return;
    }
    dom.emptyState.classList.add('hidden');
    const frag = document.createDocumentFragment();
    filtered.forEach(c => frag.appendChild(renderCard(c, saved)));
    dom.collegeGrid.appendChild(frag);
  }

  // Events
  dom.toggles.forEach(btn => btn.addEventListener('click', () => {
    dom.toggles.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderList();
  }));

  dom.searchInput.addEventListener('input', debounce(renderList, 200));
  dom.btnSearch.addEventListener('click', renderList);
  dom.stateSelect.addEventListener('change', renderList);
  dom.cityInput.addEventListener('input', debounce(renderList, 200));
  dom.degBtech.addEventListener('change', renderList);
  dom.degMba.addEventListener('change', renderList);
  dom.courseSelect.addEventListener('change', renderList);
  dom.maxFees.addEventListener('input', () => {
    dom.maxFeesValue.textContent = `₹${fmt.format(Number(dom.maxFees.value))}`;
  });
  dom.maxFees.addEventListener('change', renderList);
  dom.sortSelect.addEventListener('change', renderList);

  dom.btnApplyFilters.addEventListener('click', renderList);
  dom.btnClearFilters.addEventListener('click', () => {
    dom.stateSelect.value = '';
    dom.cityInput.value = '';
    dom.degBtech.checked = true;
    dom.degMba.checked = true;
    dom.maxFees.value = 500000;
    dom.maxFeesValue.textContent = `₹${fmt.format(Number(dom.maxFees.value))}`;
    dom.courseSelect.value = '';
    renderList();
  });
  dom.btnResetAll.addEventListener('click', () => {
    dom.searchInput.value = '';
    document.querySelectorAll('.toggle-group .toggle').forEach(b => b.classList.remove('active'));
    document.querySelector('.toggle-group .toggle[data-degree="all"]').classList.add('active');
    dom.stateSelect.value = '';
    dom.cityInput.value = '';
    dom.degBtech.checked = true;
    dom.degMba.checked = true;
    dom.maxFees.value = 500000;
    dom.maxFeesValue.textContent = `₹${fmt.format(Number(dom.maxFees.value))}`;
    dom.courseSelect.value = '';
    dom.sortSelect.value = 'relevance';
    renderList();
  });

  dom.collegeGrid.addEventListener('click', (e) => {
    const saveBtn = e.target.closest('.save-btn');
    const detailsBtn = e.target.closest('.btn-details');
    if (saveBtn) {
      const id = saveBtn.dataset.id;
      const saved = getSaved();
      if (saved.has(id)) saved.delete(id); else saved.add(id);
      setSaved(saved);
      renderList();
    }
    if (detailsBtn) {
      const id = detailsBtn.dataset.id;
      const college = colleges.find(c => c.id === id);
      if (college) openDetails(college);
    }
  });

  dom.btnSaved.addEventListener('click', () => {
    const saved = getSaved();
    if (saved.size === 0) { alert('No saved colleges yet.'); return; }
    const onlySaved = colleges.filter(c => saved.has(c.id));
    dom.resultsCount.textContent = onlySaved.length;
    dom.collegeGrid.innerHTML = '';
    const frag = document.createDocumentFragment();
    onlySaved.forEach(c => frag.appendChild(renderCard(c, saved)));
    dom.collegeGrid.appendChild(frag);
  });

  function openDetails(college) {
    dom.detailsTitle.textContent = college.name;
    dom.detailsLocation.textContent = `${college.city}, ${college.state}`;
    dom.detailsType.textContent = college.type;
    const feesParts = [];
    if (college.fees.btech) feesParts.push(`B.Tech ₹${fmt.format(college.fees.btech)}`);
    if (college.fees.mba) feesParts.push(`MBA ₹${fmt.format(college.fees.mba)}`);
    dom.detailsFees.textContent = feesParts.join(' | ');
    dom.detailsRating.textContent = `${college.rating}`;
    dom.detailsCourses.textContent = college.courses.join(', ');
    dom.detailsDescription.textContent = college.description;
    dom.detailsWebsite.href = college.website;

    dom.detailsGallery.innerHTML = '';
    college.images.forEach(src => {
      const div = document.createElement('div');
      div.className = 'img';
      div.style.backgroundImage = `url('${src}')`;
      div.role = 'img';
      dom.detailsGallery.appendChild(div);
    });

    const saved = getSaved();
    dom.detailsSave.textContent = saved.has(college.id) ? 'Saved' : 'Save';
    dom.detailsSave.classList.toggle('saved', saved.has(college.id));
    dom.detailsSave.onclick = () => {
      const s = getSaved();
      if (s.has(college.id)) s.delete(college.id); else s.add(college.id);
      setSaved(s);
      dom.detailsSave.textContent = s.has(college.id) ? 'Saved' : 'Save';
      dom.detailsSave.classList.toggle('saved', s.has(college.id));
      renderList();
    };

    dom.detailsConnect.onclick = () => {
      const user = getUser();
      if (user) {
        dom.leadName.value = user.name || '';
        dom.leadEmail.value = user.email || '';
        dom.leadPhone.value = user.phone || '';
      }
      dom.leadMessage.value = `Interested in ${college.name} (${college.city}) for ${college.degrees.join(' & ')}.`;
      leadOpen();
    };

    detailsOpen();
  }

  // Utils
  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // Init
  updateAuthUI();
  renderList();
})();