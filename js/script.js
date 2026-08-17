        
        // Base API URL
        const API_BASE_URL = 'https://reidosembeds.online/api';

        // Helper function to build MafiaSports URL for any channel or event name
        function getMafiaSportsUrl(idOrName) {
            if (!idOrName) return 'https://mafiasports.pro/0112/tv001/megapix';
            const slug = idOrName.toString().toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
                .replace(/[^a-z0-9]/g, ''); // keep alphanumeric only
            return `https://mafiasports.pro/0112/tv001/${slug}`;
        }

        // API Endpoint definitions
        const API_ENDPOINTS = [
            { title: "Base API", desc: "Base da API que entrega os dados.", method: "GET", path: "/api", key: "base" },
            { title: "Listar todos canais", desc: "Lista todos os canais disponíveis.", method: "GET", path: "/api/channels", key: "channels" },
            { title: "Canal por ID", desc: "Retorna um canal específico pelo ID público.", method: "GET", path: "/api/channels/megapix", key: "channel_by_id" },
            { title: "Categorias de canais", desc: "Lista as categorias de canais.", method: "GET", path: "/api/channels/categories", key: "channel_cats" },
            { title: "Canais por categoria", desc: "Filtra canais pela categoria informada.", method: "GET", path: "/api/channels?category=Notícias", key: "channels_by_cat" },
            { title: "Listar eventos", desc: "Lista os eventos esportivos.", method: "GET", path: "/api/eventos", key: "events" },
            { title: "Evento específico", desc: "Retorna um evento específico por ID.", method: "GET", path: "/api/eventos/palmeiras-x-gremio", key: "event_by_id" },
            { title: "Categorias de eventos", desc: "Lista as categorias de eventos esportivos.", method: "GET", path: "/api/eventos/categories", key: "event_cats" },
            { title: "Eventos por esporte/status", desc: "Filtra eventos por categoria e status.", method: "GET", path: "/api/eventos?category=Futebol&status=live", key: "events_filtered" },
            { title: "Pesquisa global", desc: "Pesquisa global entre canais e eventos.", method: "GET", path: "/api/pesquisa?q=gremio", key: "search" },
            { title: "Guia dos canais", desc: "Guia de programação dos canais em XMLTV (Atualizado 24h).", method: "GET", path: "/api/guia", key: "guide" }
        ];

        // Channel Dataset
        const MOCK_CHANNELS = [
            { id: "megapix", slug: "megapix", name: "Megapix HD", category: "Filmes & Séries", logo: "https://placehold.co/120x120/1e293b/ec4899?text=Megapix", quality: "FHD", live: true },
            { id: "sportv", slug: "sportv", name: "SporTV 1 HD", category: "Esportes", logo: "https://placehold.co/120x120/1e293b/6366f1?text=SporTV", quality: "FHD", live: true },
            { id: "sportv2", slug: "sportv2", name: "SporTV 2 HD", category: "Esportes", logo: "https://placehold.co/120x120/1e293b/6366f1?text=SporTV2", quality: "FHD", live: true },
            { id: "espn", slug: "espn", name: "ESPN Brasil", category: "Esportes", logo: "https://placehold.co/120x120/1e293b/f43f5e?text=ESPN", quality: "FHD", live: true },
            { id: "premiere", slug: "premiere", name: "Premiere HD", category: "Esportes", logo: "https://placehold.co/120x120/1e293b/10b981?text=Premiere", quality: "4K", live: true },
            { id: "tnt-sports", slug: "tntsports", name: "TNT Sports", category: "Esportes", logo: "https://placehold.co/120x120/1e293b/eab308?text=TNT+Sports", quality: "FHD", live: true },
            { id: "combate", slug: "combate", name: "Canal Combate", category: "Esportes", logo: "https://placehold.co/120x120/1e293b/dc2626?text=Combate", quality: "FHD", live: true },
            { id: "hbo", slug: "hbo", name: "HBO Max TV", category: "Filmes & Séries", logo: "https://placehold.co/120x120/1e293b/8b5cf6?text=HBO", quality: "FHD", live: true },
            { id: "telecine-pipoca", slug: "telecinepipoca", name: "Telecine Pipoca", category: "Filmes & Séries", logo: "https://placehold.co/120x120/1e293b/ec4899?text=Telecine", quality: "FHD", live: true },
            { id: "amc", slug: "amc", name: "AMC TV", category: "Filmes & Séries", logo: "https://placehold.co/120x120/1e293b/06b6d4?text=AMC", quality: "HD", live: true },
            { id: "warner", slug: "warner", name: "Warner Channel", category: "Filmes & Séries", logo: "https://placehold.co/120x120/1e293b/3b82f6?text=Warner", quality: "FHD", live: true },
            { id: "globo-sp", slug: "globo", name: "TV Globo SP", category: "Variedades", logo: "https://placehold.co/120x120/1e293b/38bdf8?text=Globo", quality: "4K", live: true },
            { id: "sbt", slug: "sbt", name: "SBT HD", category: "Variedades", logo: "https://placehold.co/120x120/1e293b/f59e0b?text=SBT", quality: "FHD", live: true },
            { id: "band", slug: "band", name: "Band TV", category: "Variedades", logo: "https://placehold.co/120x120/1e293b/22c55e?text=Band", quality: "FHD", live: true },
            { id: "globonews", slug: "globonews", name: "GloboNews", category: "Notícias", logo: "https://placehold.co/120x120/1e293b/ef4444?text=GNews", quality: "FHD", live: true },
            { id: "cnn-brasil", slug: "cnn", name: "CNN Brasil", category: "Notícias", logo: "https://placehold.co/120x120/1e293b/b91c1c?text=CNN", quality: "FHD", live: true },
            { id: "discovery", slug: "discovery", name: "Discovery Channel", category: "Documentários", logo: "https://placehold.co/120x120/1e293b/f97316?text=Discovery", quality: "FHD", live: true },
            { id: "natgeo", slug: "natgeo", name: "National Geographic", category: "Documentários", logo: "https://placehold.co/120x120/1e293b/eab308?text=NatGeo", quality: "FHD", live: true }
        ];

        const MOCK_EVENTS = [
            { id: "palmeiras-x-gremio", slug: "palmeirasxgremio", title: "Palmeiras vs Grêmio", category: "Futebol", time: "Ao Vivo • 2º Tempo", status: "live", league: "Brasileirão Série A" },
            { id: "flamengo-x-vasco", slug: "flamengoxvasco", title: "Flamengo vs Vasco da Gama", category: "Futebol", time: "Hoje • 21:30", status: "upcoming", league: "Brasileirão Série A" },
            { id: "real-madrid-x-barcelona", slug: "realmadridxbarcelona", title: "Real Madrid vs Barcelona", category: "Futebol", time: "Amanhã • 16:00", status: "upcoming", league: "La Liga Santander" },
            { id: "lakers-x-celtics", slug: "lakersxceltics", title: "LA Lakers vs Boston Celtics", category: "Basquete", time: "Ao Vivo • 3º Qtr", status: "live", league: "NBA Temporada Regular" },
            { id: "ufc-300", slug: "ufc300", title: "UFC 300: Alex Poatan vs Jamahal Hill", category: "Lutas", time: "Sábado • 22:00", status: "upcoming", league: "UFC Main Card" }
        ];

        // State variables
        let channelsData = [];
        let eventsData = [];
        let activeCategory = 'All';
        let activeSportFilter = 'All';
        let searchQuery = '';
        let favorites = JSON.parse(localStorage.getItem('rei_favorites') || '[]');
        let currentPlayingItem = null;
        let currentFeaturedEvent = null;
        let featuredEventIndex = 0;
        let featuredTimer = null;

        window.onload = async function() {
            initSearchListeners();
            renderApiDocsGrid();
            await loadAllData();

            window.addEventListener('popstate', handleHashNavigation);
            handleHashNavigation();
        };

        function startFeaturedRotation() {
            if (featuredTimer) clearInterval(featuredTimer);
            featuredTimer = setInterval(() => {
                if (eventsData && eventsData.length > 0) {
                    featuredEventIndex = (featuredEventIndex + 1) % eventsData.length;
                    renderFeaturedBanner();
                }
            }, 8000);
        }

        function handleHashNavigation() {
            const hash = window.location.hash;
            if (hash.startsWith('#watch/')) {
                const pageSlug = hash.replace('#watch/', '');
                if (pageSlug && (!currentPlayingItem || (currentPlayingItem.slug !== pageSlug && currentPlayingItem.id !== pageSlug))) {
                    openPlayerModal(pageSlug, 'channel', true);
                }
            } else if (currentPlayingItem) {
                closePlayerModal(true);
            }
        }

        async function fetchJsonWithFallback(url, timeoutMs = 12000) {
            const fetchWithTimeout = async (targetUrl) => {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), timeoutMs);

                try {
                    const response = await fetch(targetUrl, {
                        method: 'GET',
                        mode: 'cors',
                        cache: 'no-store',
                        headers: { 'Accept': 'application/json' },
                        signal: controller.signal
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    return await response.json();
                } finally {
                    clearTimeout(timer);
                }
            };

            try {
                return await fetchWithTimeout(url);
            } catch (directError) {
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
                try {
                    return await fetchWithTimeout(proxyUrl);
                } catch (proxyError) {
                    throw new Error(`API direta: ${directError.message} | Proxy: ${proxyError.message}`);
                }
            }
        }

        function extractChannels(payload) {
            if (!payload) return [];
            let list = [];

            if (Array.isArray(payload)) {
                list = payload;
            } else if (Array.isArray(payload.data)) {
                list = payload.data;
            } else if (Array.isArray(payload.channels)) {
                list = payload.channels;
            } else if (payload.data && Array.isArray(payload.data.channels)) {
                list = payload.data.channels;
            }

            return list.map(channel => {
                const id = channel.id || channel.slug || channel.public_slug;
                if (!id) return null;

                return {
                    ...channel,
                    id: String(id),
                    slug: String(channel.slug || channel.public_slug || id),
                    name: String(channel.name || channel.title || id),
                    category: channel.category || 'Geral',
                    logo: channel.logo_url || channel.logo || '',
                    quality: channel.quality || 'HD',
                    live: channel.is_active !== false,
                    embed_url: channel.embed_url || channel.play_url || ''
                };
            }).filter(Boolean);
        }

        function extractEvents(payload) {
            if (!payload) return [];
            let list = [];

            if (Array.isArray(payload)) {
                list = payload;
            } else if (Array.isArray(payload.data)) {
                list = payload.data;
            } else if (Array.isArray(payload.eventos)) {
                list = payload.eventos;
            } else if (payload.data && Array.isArray(payload.data.eventos)) {
                list = payload.data.eventos;
            } else if (payload.data && Array.isArray(payload.data.events)) {
                list = payload.data.events;
            }

            return list.map(event => {
                const id = event.id || event.slug;
                if (!id) return null;

                let formattedTime = event.time;
                if (!formattedTime && event.start_time) {
                    const date = new Date(event.start_time.replace(' ', 'T'));
                    if (!Number.isNaN(date.getTime())) {
                        formattedTime = date.toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                }

                return {
                    ...event,
                    id: String(id),
                    slug: String(event.slug || id),
                    title: event.title || event.name || 'Evento',
                    category: event.category || 'Esportes',
                    time: formattedTime || (event.status === 'live' ? 'Ao Vivo' : 'Horário não informado'),
                    status: event.status || 'upcoming',
                    league: event.competition || event.league || '',
                    play_event_url: event.play_event_url || ''
                };
            }).filter(Boolean);
        }

        function showApiStatus(message, type = 'warning') {
            const banner = document.getElementById('apiStatusBanner');
            const text = document.getElementById('apiStatusText');

            if (!banner || !text) return;

            text.textContent = message;
            banner.classList.remove(
                'hidden',
                'bg-amber-500/10',
                'border-amber-500/20',
                'text-amber-300',
                'bg-red-500/10',
                'border-red-500/20',
                'text-red-300'
            );

            if (type === 'error') {
                banner.classList.add('flex', 'bg-red-500/10', 'border-red-500/20', 'text-red-300');
            } else {
                banner.classList.add('flex', 'bg-amber-500/10', 'border-amber-500/20', 'text-amber-300');
            }
        }

        function hideApiStatus() {
            const banner = document.getElementById('apiStatusBanner');
            if (banner) banner.classList.add('hidden');
        }

        async function loadAllData() {
            let channelsLoadedFromApi = false;
            let eventsLoadedFromApi = false;

            try {
                const payload = await fetchJsonWithFallback(`${API_BASE_URL}/channels`);
                const realChannels = extractChannels(payload);

                if (realChannels.length > 0) {
                    channelsData = realChannels;
                    channelsLoadedFromApi = true;
                } else {
                    channelsData = [];
                }
            } catch (err) {
                console.error('Erro ao carregar canais:', err);
                channelsData = [];
            }

            try {
                const payload = await fetchJsonWithFallback(`${API_BASE_URL}/eventos`);
                const realEvents = extractEvents(payload);

                if (realEvents.length > 0) {
                    eventsData = realEvents;
                    eventsLoadedFromApi = true;
                } else {
                    eventsData = [];
                }
            } catch (err) {
                console.error('Erro ao carregar eventos:', err);
                eventsData = [];
            }

            if (!channelsLoadedFromApi) {
                channelsData = MOCK_CHANNELS.map(channel => ({
                    ...channel,
                    embed_url: ''
                }));
            }

            if (!eventsLoadedFromApi) {
                eventsData = MOCK_EVENTS;
            }

            if (channelsLoadedFromApi || eventsLoadedFromApi) {
                hideApiStatus();
            } else {
                showApiStatus(
                    'Não foi possível acessar a API. Foram carregados dados de demonstração como contingência.',
                    'error'
                );
            }

            renderFeaturedBanner();
            startFeaturedRotation();
            renderCategoryPills();
            renderChannels();
            renderEvents();
            renderFavorites();
            updateLiveBadge();
        }

        // Render dynamic featured banner based on current events data with rotation
        function renderFeaturedBanner() {
            if (!eventsData || eventsData.length === 0) return;

            currentFeaturedEvent = eventsData[featuredEventIndex % eventsData.length];
            if (!currentFeaturedEvent) return;

            const titleEl = document.getElementById('featuredTitle');
            const descEl = document.getElementById('featuredDesc');
            const counterEl = document.getElementById('featuredCounter');

            if (titleEl) {
                titleEl.textContent = `${currentFeaturedEvent.title}${currentFeaturedEvent.league ? ' - ' + currentFeaturedEvent.league : ''}`;
            }
            if (descEl) {
                descEl.textContent = `Acompanhe em tempo real todas as emoções de ${currentFeaturedEvent.title} (${currentFeaturedEvent.time}) com transmissão ao vivo exclusiva.`;
            }
            if (counterEl) {
                counterEl.textContent = `(${ (featuredEventIndex % eventsData.length) + 1 }/${eventsData.length})`;
            }
        }

        // Function triggered when user clicks the "Próxima" or "Voltar" button
        function nextFeaturedBanner() {
            if (!eventsData || eventsData.length === 0) return;
            featuredEventIndex++;
            renderFeaturedBanner();
            startFeaturedRotation();
        }

        function prevFeaturedBanner() {
            if (!eventsData || eventsData.length === 0) return;
            featuredEventIndex--;
            if (featuredEventIndex < 0) {
                featuredEventIndex = eventsData.length - 1;
            }
            renderFeaturedBanner();
            startFeaturedRotation();
        }

        function playFeatured() {
            if (currentFeaturedEvent) {
                openPlayerModal(currentFeaturedEvent.id, 'event');
            } else {
                openPlayerModal('palmeiras-x-gremio', 'event');
            }
        }

        function openPlayerModal(id, type = 'channel', fromHash = false) {
            const modal = document.getElementById('playerModal');
            const titleEl = document.getElementById('playerTitle');
            const subTitleEl = document.getElementById('playerSubtitle');
            const iframe = document.getElementById('playerIframe');
            const urlDisplay = document.getElementById('playerActiveUrlDisplay');
            const externalLink = document.getElementById('externalLinkBtn');

            let item = null;

            if (type === 'channel') {
                item = channelsData.find(c => c.id === id || c.slug === id) || { 
                    id: id, 
                    slug: id, 
                    name: id.toUpperCase(), 
                    category: "Geral" 
                };
            } else {
                item = eventsData.find(e => e.id === id || e.slug === id) || { 
                    id: id, 
                    slug: id, 
                    title: `Evento ${id}`, 
                    category: "Esportes" 
                };
            }

            currentPlayingItem = item;
            currentPlayingItem.type = type;

            const channelSlug = item.slug || item.id || id;
            const targetUrl = item.embed_url ||
                item.play_event_url ||
                getMafiaSportsUrl(channelSlug);

            titleEl.textContent = item.name || item.title;
            subTitleEl.textContent = item.category ? `${item.category} • Transmissão Ao Vivo` : 'Transmissão Ao Vivo';
            
            if (urlDisplay) urlDisplay.textContent = targetUrl;
            if (externalLink) externalLink.href = targetUrl;

            iframe.src = targetUrl;

            if (!fromHash && window.location.hash !== `#watch/${channelSlug}`) {
                history.pushState({ page: channelSlug }, '', `#watch/${channelSlug}`);
            }

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closePlayerModal(fromHash = false) {
            const modal = document.getElementById('playerModal');
            const iframe = document.getElementById('playerIframe');
            
            if (iframe) iframe.src = '';

            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            currentPlayingItem = null;

            if (!fromHash && window.location.hash.startsWith('#watch/')) {
                history.pushState('', document.title, window.location.pathname + window.location.search);
            }
        }

        function switchTab(tabName) {
            const views = ['channels', 'events', 'favorites', 'apidocs'];
            views.forEach(v => {
                const el = document.getElementById(`view-${v}`);
                const btn = document.getElementById(`nav-${v}`);
                if (el) el.classList.add('hidden');
                if (btn) {
                    btn.classList.remove('text-brand-500', 'bg-brand-500/10');
                    btn.classList.add('text-gray-400');
                }
            });

            const activeView = document.getElementById(`view-${tabName}`);
            const activeBtn = document.getElementById(`nav-${tabName}`);
            
            if (activeView) activeView.classList.remove('hidden');
            if (activeBtn) {
                activeBtn.classList.remove('text-gray-400');
                activeBtn.classList.add('text-brand-500', 'bg-brand-500/10');
            }

            if (tabName === 'favorites') {
                renderFavorites();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function renderCategoryPills() {
            const container = document.getElementById('channelCategoriesList');
            if (!container) return;

            const cats = ['All', ...new Set(channelsData.map(c => c.category).filter(Boolean))];

            container.innerHTML = cats.map(cat => {
                const isAll = cat === 'All';
                const label = isAll ? 'Todos os Canais' : cat;
                const activeClass = (cat === activeCategory) 
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' 
                    : 'bg-dark-card hover:bg-dark-hover text-gray-300 border border-dark-border';
                
                return `
                    <button onclick="filterCategory('${cat}')" class="cat-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${activeClass}">
                        ${label}
                    </button>
                `;
            }).join('');
        }

        function filterCategory(cat) {
            activeCategory = cat;
            renderCategoryPills();
            renderChannels();
        }

        function renderChannels() {
            const grid = document.getElementById('channelsGrid');
            const emptyState = document.getElementById('noChannelsState');
            const countEl = document.getElementById('channelCount');

            if (!grid) return;

            let filtered = channelsData.filter(ch => {
                const matchCat = (activeCategory === 'All') || (ch.category === activeCategory);
                const matchSearch = searchQuery === '' || 
                    ch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    (ch.category && ch.category.toLowerCase().includes(searchQuery.toLowerCase()));
                return matchCat && matchSearch;
            });

            if (countEl) countEl.textContent = filtered.length;

            if (filtered.length === 0) {
                grid.innerHTML = '';
                if (emptyState) emptyState.classList.remove('hidden');
                return;
            }

            if (emptyState) emptyState.classList.add('hidden');

            grid.innerHTML = filtered.map(ch => {
                const isFav = favorites.includes(ch.id);
                return `
                    <div class="group relative rounded-2xl glass-card border border-dark-border hover:border-brand-500/50 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 cursor-pointer" onclick="openPlayerModal('${ch.id}', 'channel')">
                        
                        <div class="flex items-center justify-between mb-3 z-10">
                            <span class="px-2 py-0.5 rounded-md bg-dark-bg/80 text-brand-400 border border-dark-border text-[10px] font-bold tracking-wider">
                                ${ch.quality || 'HD'}
                            </span>
                            <button onclick="event.stopPropagation(); toggleFavorite('${ch.id}')" class="p-1.5 rounded-lg bg-dark-bg/60 text-gray-400 hover:text-red-500 transition-colors">
                                <i class="${isFav ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart text-xs"></i>
                            </button>
                        </div>

                        <div class="flex flex-col items-center justify-center py-3">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-bg border border-dark-border p-2 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                                <img src="${ch.logo}" alt="${ch.name}" onerror="this.src='https://placehold.co/120x120/1e293b/ffffff?text=TV'" class="w-full h-full object-contain rounded-xl">
                            </div>
                        </div>

                        <div class="mt-3 pt-3 border-t border-dark-border/50 text-center">
                            <h4 class="text-xs sm:text-sm font-bold text-gray-100 group-hover:text-brand-400 transition-colors truncate">${ch.name}</h4>
                            <span class="text-[10px] text-gray-500 font-medium">${ch.category || 'Geral'}</span>
                        </div>

                        <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-brand-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                `;
            }).join('');
        }

        function renderEvents() {
            const grid = document.getElementById('eventsGrid');
            if (!grid) return;

            let filtered = eventsData.filter(ev => {
                const matchSport = (activeSportFilter === 'All') || (ev.category === activeSportFilter);
                const matchSearch = searchQuery === '' || ev.title.toLowerCase().includes(searchQuery.toLowerCase());
                return matchSport && matchSearch;
            });

            grid.innerHTML = filtered.map(ev => {
                const isLive = ev.status === 'live';
                return `
                    <div class="rounded-2xl glass-card border border-dark-border hover:border-brand-accent/50 p-5 space-y-4 transition-all hover:-translate-y-1 cursor-pointer" onclick="openPlayerModal('${ev.id}', 'event')">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dark-bg border border-dark-border text-gray-400">
                                ${ev.league || ev.category}
                            </span>
                            ${isLive ? `
                                <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[11px] font-bold">
                                    <span class="w-2 h-2 rounded-full bg-brand-accent pulse-live"></span> ${ev.time}
                                </span>
                            ` : `
                                <span class="px-2.5 py-1 rounded-full bg-dark-bg border border-dark-border text-gray-400 text-[11px] font-semibold">
                                    <i class="fa-regular fa-clock mr-1"></i> ${ev.time}
                                </span>
                            `}
                        </div>

                        <div>
                            <h3 class="text-sm font-bold text-white hover:text-brand-500 transition-colors">${ev.title}</h3>
                            <p class="text-xs text-gray-400 mt-1">${ev.category} • Transmissão ao vivo</p>
                        </div>

                        <div class="pt-3 border-t border-dark-border/60 flex items-center justify-between">
                            <span class="text-xs text-brand-500 font-semibold flex items-center gap-1">
                                <i class="fa-solid fa-play text-[10px]"></i> Assistir Jogo
                            </span>
                            <span class="text-[10px] text-gray-500">MafiaSports Live</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function filterEvents(type, value) {
            if (type === 'sport') {
                activeSportFilter = value;
            }
            renderEvents();
        }

        function toggleFavorite(channelId) {
            if (favorites.includes(channelId)) {
                favorites = favorites.filter(id => id !== channelId);
                showToast("Canal removido dos favoritos!");
            } else {
                favorites.push(channelId);
                showToast("Canal adicionado aos favoritos!");
            }
            localStorage.setItem('rei_favorites', JSON.stringify(favorites));
            renderChannels();
            renderFavorites();
        }

        function renderFavorites() {
            const grid = document.getElementById('favoritesGrid');
            const emptyState = document.getElementById('noFavoritesState');

            if (!grid) return;

            const favChannels = channelsData.filter(c => favorites.includes(c.id));

            if (favChannels.length === 0) {
                grid.innerHTML = '';
                if (emptyState) emptyState.classList.remove('hidden');
                return;
            }

            if (emptyState) emptyState.classList.add('hidden');

            grid.innerHTML = favChannels.map(ch => `
                <div class="group relative rounded-2xl glass-card border border-dark-border hover:border-brand-500/50 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer" onclick="openPlayerModal('${ch.id}', 'channel')">
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-2 py-0.5 rounded bg-dark-bg text-brand-400 text-[10px] font-bold">${ch.quality || 'HD'}</span>
                        <button onclick="event.stopPropagation(); toggleFavorite('${ch.id}')" class="p-1.5 text-red-500 hover:text-gray-400">
                            <i class="fa-solid fa-heart text-xs"></i>
                        </button>
                    </div>
                    <div class="flex justify-center py-2">
                        <img src="${ch.logo}" alt="${ch.name}" class="w-16 h-16 object-contain rounded-xl">
                    </div>
                    <div class="mt-2 text-center">
                        <h4 class="text-xs font-bold text-white truncate">${ch.name}</h4>
                    </div>
                </div>
            `).join('');
        }

        function updateLiveBadge() {
            const liveCount = eventsData.filter(e => e.status === 'live').length;
            const badge = document.getElementById('liveEventsBadge');
            if (badge) {
                if (liveCount > 0) {
                    badge.textContent = liveCount;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }
        }

        function initSearchListeners() {
            const input = document.getElementById('searchInput');
            const mobileInput = document.getElementById('mobileSearchInput');
            const clearBtn = document.getElementById('clearSearchBtn');

            const handleSearch = (val) => {
                searchQuery = val.trim();
                if (clearBtn) {
                    if (searchQuery.length > 0) clearBtn.classList.remove('hidden');
                    else clearBtn.classList.add('hidden');
                }
                renderChannels();
                renderEvents();
            };

            if (input) input.addEventListener('input', (e) => handleSearch(e.target.value));
            if (mobileInput) mobileInput.addEventListener('input', (e) => handleSearch(e.target.value));
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    if (input) input.value = '';
                    if (mobileInput) mobileInput.value = '';
                    handleSearch('');
                });
            }
        }

        function toggleMobileSearch() {
            const container = document.getElementById('mobileSearchContainer');
            if (container) container.classList.toggle('hidden');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            if (menu) menu.classList.toggle('hidden');
        }

        function resetFilters() {
            activeCategory = 'All';
            searchQuery = '';
            const input = document.getElementById('searchInput');
            if (input) input.value = '';
            renderCategoryPills();
            renderChannels();
        }

        function renderApiDocsGrid() {
            const grid = document.getElementById('apiEndpointsGrid');
            if (!grid) return;

            grid.innerHTML = API_ENDPOINTS.map(ep => `
                <div class="glass-card rounded-2xl p-5 border border-dark-border space-y-3 flex flex-col justify-between hover:border-brand-500/40 transition-all">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-white flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    ${ep.method}
                                </span>
                                ${ep.title}
                            </h4>
                            <button onclick="copyToClipboard('${API_BASE_URL}${ep.path.replace('/api', '')}')" class="px-2.5 py-1 rounded-lg bg-dark-bg hover:bg-dark-hover border border-dark-border text-[11px] font-semibold text-gray-400 hover:text-white transition-all">
                                <i class="fa-regular fa-copy"></i> Copiar
                            </button>
                        </div>
                        <p class="text-xs text-gray-400">${ep.desc}</p>
                        <div class="bg-dark-bg rounded-xl p-2.5 font-mono text-xs text-brand-400 border border-dark-border truncate">
                            ${API_BASE_URL}${ep.path.replace('/api', '')}
                        </div>
                    </div>

                    <div class="pt-2 flex justify-end">
                        <button onclick="testApiEndpoint('${ep.key}', '${ep.path}')" class="px-3 py-1.5 rounded-xl bg-brand-600/20 hover:bg-brand-600 text-brand-300 hover:text-white border border-brand-500/30 text-xs font-semibold transition-all">
                            <i class="fa-solid fa-bolt mr-1"></i> Testar Endpoint
                        </button>
                    </div>
                </div>
            `).join('');
        }

        async function testApiEndpoint(key, path) {
            const consoleOutput = document.getElementById('apiConsoleOutput');
            const consoleStatus = document.getElementById('apiConsoleStatus');

            consoleStatus.textContent = "Status: Requisitando...";
            consoleStatus.className = "text-xs px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-mono";
            consoleOutput.textContent = `// Solicitando GET ${API_BASE_URL}${path} ...`;

            try {
                const data = await fetchJsonWithFallback(`${API_BASE_URL}${path}`);
                consoleOutput.textContent = JSON.stringify(data, null, 2);
                consoleStatus.textContent = "Status: 200 OK";
                consoleStatus.className = "text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-mono";
            } catch (err) {
                consoleOutput.textContent =
                    `// Falha ao acessar o endpoint.\n// ${err.message}\n\n` +
                    JSON.stringify(getMockResponseForKey(key), null, 2);

                consoleStatus.textContent = "Status: Falha / Mock";
                consoleStatus.className = "text-xs px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 font-mono";
            }
        }

        function getMockResponseForKey(key) {
            switch(key) {
                case 'base': return { status: "online", message: "API Rei dos Embeds v1.0", docs: "https://reidosembeds.online/api" };
                case 'channels': return { count: MOCK_CHANNELS.length, channels: MOCK_CHANNELS };
                case 'channel_by_id': return MOCK_CHANNELS[0];
                case 'channel_cats': return { categories: ["Esportes", "Filmes & Séries", "Notícias", "Variedades", "Documentários"] };
                case 'events': return { count: MOCK_EVENTS.length, eventos: MOCK_EVENTS };
                case 'event_by_id': return MOCK_EVENTS[0];
                default: return { status: "success", data: "Dados de resposta pré-formatados para " + key };
            }
        }

        function copyToClipboard(text) {
            const dummy = document.createElement('textarea');
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            showToast("Endpoint copiado para a área de transferência!");
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            if (toast && toastMsg) {
                toastMsg.textContent = msg;
                toast.classList.remove('hidden', 'translate-y-2');
                toast.classList.add('translate-y-0');
                setTimeout(() => {
                    toast.classList.add('hidden', 'translate-y-2');
                }, 3000);
            }
        }
