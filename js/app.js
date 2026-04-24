import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLBzT_wMTyR4v-E1Z7tQUdkJA-K8t_U_E",
  authDomain: "umo-internacionalizacion.firebaseapp.com",
  projectId: "umo-internacionalizacion",
  storageBucket: "umo-internacionalizacion.firebasestorage.app",
  messagingSenderId: "330761844790",
  appId: "1:330761844790:web:d0ee2c39cfb01346a78097"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Keep our doc ref constant for the shared dashboard
const docRef = doc(db, 'workspace', 'main');

const DEFAULT_SECTIONS = [
    {
        id: 'sec-1',
        title: 'Mapeo inicial de la empresa',
        blocks: [
            { id: 'b-1', type: 'title', content: 'Mapeo Inicial' },
            { id: 'b-2', type: 'text', content: 'Aquí comienza el mapeo inicial. Todo lo que escribas aquí se sincronizará mágicamente con tu equipo.' }
        ]
    },
    { id: 'sec-2', title: 'Descripción del bien y BMC', blocks: [] },
    { id: 'sec-3', title: 'Potencialidades', blocks: [] },
    { id: 'sec-4', title: 'Análisis DOFA', blocks: [] },
    { id: 'sec-5', title: 'Sostenibilidad ESG', blocks: [] },
    { id: 'sec-6', title: 'Viabilidad internacional', blocks: [] },
    { id: 'sec-7', title: 'Objetivo SMART', blocks: [] }
];

const getMacroBlocks = () => [
    {
        id: 'b-chart-pib-' + Date.now(),
        type: 'chart',
        content: JSON.stringify({
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'IOWA', borderColor: '#1d3557', backgroundColor: '#1d3557', borderWidth: 3, tension: 0.3, data: [225055.3, 244156.8, 253166.5, 265794.5, 277110.1] },
                    { label: 'NEBRASKA', borderColor: '#457b9d', backgroundColor: '#457b9d', borderWidth: 3, tension: 0.3, data: [150952.5, 167840.2, 183780.9, 189242.7, 198073.3] }
                ]
            },
            options: { responsive: true, plugins: { title: { display: true, text: 'PIB TOTAL (MILLONES USD)', font: { size: 16 } } } }
        })
    },
    {
        id: 'b-chart-manuf-' + Date.now() + 1,
        type: 'chart',
        content: JSON.stringify({
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'IOWA', borderColor: '#e63946', backgroundColor: '#e63946', borderWidth: 3, tension: 0.3, data: [36903.4, 39984.6, 43088.0, 44348.1, 43980.0] },
                    { label: 'NEBRASKA', borderColor: '#f4a261', backgroundColor: '#f4a261', borderWidth: 3, tension: 0.3, data: [16887.0, 16729.4, 16316.1, 16490.3, 16432.3] }
                ]
            },
            options: { responsive: true, plugins: { title: { display: true, text: 'PIB DEL SECTOR MANUFACTURA (MILLONES USD)', font: { size: 16 } } } }
        })
    },
    {
        id: 'b-chart-percapita-' + Date.now() + 2,
        type: 'chart',
        content: JSON.stringify({
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'IOWA', borderColor: '#2a9d8f', backgroundColor: '#2a9d8f', borderWidth: 3, tension: 0.3, data: [70351, 76254, 78752, 82278, 85570] },
                    { label: 'NEBRASKA', borderColor: '#e9c46a', backgroundColor: '#e9c46a', borderWidth: 3, tension: 0.3, data: [76832, 85086, 92437, 94358, 98153] }
                ]
            },
            options: { responsive: true, plugins: { title: { display: true, text: 'PIB PER CÁPITA (USD POR PERSONA)', font: { size: 16 } } } }
        })
    },
    {
        id: 'b-chart-empleo-' + Date.now() + 3,
        type: 'chart',
        content: JSON.stringify({
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'IOWA', borderColor: '#8338ec', backgroundColor: '#8338ec', borderWidth: 3, tension: 0.3, data: [1539.0, 1572.4, 1593.0, 1598.8, 1588.6] },
                    { label: 'NEBRASKA', borderColor: '#ff006e', backgroundColor: '#ff006e', borderWidth: 3, tension: 0.3, data: [1007.1, 1026.1, 1048.8, 1058.6, 1060.2] }
                ]
            },
            options: { responsive: true, plugins: { title: { display: true, text: 'NÚMERO DE EMPLEOS (MILES)', font: { size: 16 } } } }
        })
    },
    {
        id: 'b-chart-desempleo-' + Date.now() + 4,
        type: 'chart',
        content: JSON.stringify({
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'IOWA', borderColor: '#fb5607', backgroundColor: '#fb5607', borderWidth: 3, tension: 0.3, data: [3.9, 2.9, 3.0, 3.2, 3.5] },
                    { label: 'NEBRASKA', borderColor: '#ffbe0b', backgroundColor: '#ffbe0b', borderWidth: 3, tension: 0.3, data: [2.7, 2.2, 2.3, 2.7, 3.0] }
                ]
            },
            options: { responsive: true, plugins: { title: { display: true, text: 'TASA DE DESEMPLEO (%)', font: { size: 16 } } } }
        })
    },
    {
        id: 'b-chart-interes-' + Date.now() + 5,
        type: 'chart',
        content: JSON.stringify({
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'IOWA', borderColor: '#3a86ff', backgroundColor: '#3a86ff', borderWidth: 3, tension: 0.3, data: [0.25, 4.50, 5.50, 4.50, 3.75] },
                    { label: 'NEBRASKA', borderColor: '#8338ec', backgroundColor: '#8338ec', borderWidth: 3, tension: 0.3, borderDash: [5, 5], data: [0.25, 4.50, 5.50, 4.50, 3.75] }
                ]
            },
            options: { responsive: true, plugins: { title: { display: true, text: 'TASA DE INTERÉS (%)', font: { size: 16 } } } }
        })
    }
];

const AppState = {
    data: {
        sections: DEFAULT_SECTIONS,
        currentSectionId: null
    },
    isInitializing: true,

    init() {
        // Suscribirse a cambios en Firebase (Tiempo real)
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const cloudData = docSnap.data();
                if(cloudData.sections) {
                    let needsSave = false;
                    cloudData.sections.forEach(sec => {
                        const t = sec.title.toLowerCase();
                        if (t === 'nueva sección' || t === 'nueva seccion' || t === 'pib total (millones usd)' || t === 'indicadores macroeconómicos') {
                            if (sec.title !== 'Indicadores Macroeconómicos') {
                                sec.title = 'Indicadores Macroeconómicos';
                                needsSave = true;
                            }
                            // Reemplazamos todos los bloques para sincronizar las nuevas gráficas que pidió el usuario si antes tenía 1 gráfica
                            if (sec.blocks.length <= 1) {
                                sec.blocks = getMacroBlocks();
                                needsSave = true;
                            }
                        }
                    });
                    this.data.sections = cloudData.sections;
                    if(!this.data.sections.find(s => s.id === this.data.currentSectionId)) {
                        this.data.currentSectionId = this.data.sections.length > 0 ? this.data.sections[0].id : null;
                    }
                    if (needsSave) {
                        this.saveToFirebase();
                    }
                }
            } else {
                this.saveToFirebase();
            }
            this.isInitializing = false;
            UI.renderSidebar();
            UI.renderWorkspace();
        }, (error) => {
            console.error("Firestore onSnapshot error:", error);
            this.isInitializing = false;
            // Aún si hay error, forzamos render para no dejar en blanco
            UI.renderSidebar();
            UI.renderWorkspace();
        });
    },

    saveToFirebase() {
        // Set the doc in Firebase. Triggering this will also fire onSnapshot, but that's handled safely.
        setDoc(docRef, { sections: this.data.sections }, { merge: true })
            .catch(err => alert("Error enviando datos: " + err.message));
    },

    reset() {
        this.data.sections = DEFAULT_SECTIONS;
        this.data.currentSectionId = null;
        this.saveToFirebase();
    },

    addSection() {
        const id = 'sec-' + Date.now();
        this.data.sections.push({ id: id, title: 'Indicadores Macroeconómicos', blocks: getMacroBlocks() });
        this.data.currentSectionId = id;
        this.saveToFirebase();
    },

    deleteSection(id) {
        this.data.sections = this.data.sections.filter(s => s.id !== id);
        if (this.data.currentSectionId === id) this.data.currentSectionId = null;
        this.saveToFirebase();
    },

    updateSectionTitle(id, newTitle) {
        const sec = this.data.sections.find(s => s.id === id);
        if (sec && sec.title !== newTitle) {
            sec.title = newTitle;
            this.saveToFirebase();
        }
    },

    moveSection(id, direction) {
        const idx = this.data.sections.findIndex(s => s.id === id);
        if (idx === -1) return;
        
        let swapped = false;
        if (direction === -1 && idx > 0) {
            const temp = this.data.sections[idx];
            this.data.sections[idx] = this.data.sections[idx - 1];
            this.data.sections[idx - 1] = temp;
            swapped = true;
        } else if (direction === 1 && idx < this.data.sections.length - 1) {
            const temp = this.data.sections[idx];
            this.data.sections[idx] = this.data.sections[idx + 1];
            this.data.sections[idx + 1] = temp;
            swapped = true;
        }
        if (swapped) this.saveToFirebase();
    },

    addBlock(sectionId, type) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        
        let content = '';
        switch(type) {
            case 'title': content = 'Nuevo Título'; break;
            case 'subtitle': content = 'Nuevo Subtítulo'; break;
            case 'text': content = 'Escribe tu contenido aquí...'; break;
            case 'image': content = 'https://images.unsplash.com/photo-1565514020179-026b92b64aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; break;
            case 'link': content = 'Etiqueta enlace|https://ejemplo.com'; break;
            case 'card': content = '<b>Título de la tarjeta</b><br>Contenido descriptivo de la tarjeta.'; break;
            case 'list': content = '<li>Elemento 1</li><li>Elemento 2</li>'; break;
            case 'table': content = '<tr><th>Col 1</th><th>Col 2</th></tr><tr><td>Dato 1</td><td>Dato 2</td></tr>'; break;
            case 'chart': content = JSON.stringify({
                type: 'line',
                data: {
                    labels: ['2021', '2022', '2023', '2024', '2025'],
                    datasets: [
                        { label: 'IOWA', borderColor: '#1d3557', backgroundColor: '#1d3557', borderWidth: 3, tension: 0.3, data: [225055.3, 244156.8, 253166.5, 265794.5, 277110.1] },
                        { label: 'NEBRASKA', borderColor: '#457b9d', backgroundColor: '#457b9d', borderWidth: 3, tension: 0.3, data: [150952.5, 167840.2, 183780.9, 189242.7, 198073.3] }
                    ]
                },
                options: { responsive: true, plugins: { title: { display: true, text: 'PIB TOTAL (MILLONES USD)', font: { size: 16 } } } }
            }); break;
        }

        sec.blocks.push({ id: 'b-' + Date.now(), type: type, content: content });
        this.saveToFirebase();
    },

    updateBlock(sectionId, blockId, content) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        const block = sec.blocks.find(b => b.id === blockId);
        if (block && block.content !== content) {
            block.content = content;
            this.saveToFirebase();
        }
    },

    deleteBlock(sectionId, blockId) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        sec.blocks = sec.blocks.filter(b => b.id !== blockId);
        this.saveToFirebase();
    },

    moveBlock(sectionId, blockId, direction) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        const idx = sec.blocks.findIndex(b => b.id === blockId);
        if (idx === -1) return;
        
        let swapped = false;
        if (direction === -1 && idx > 0) {
            const temp = sec.blocks[idx];
            sec.blocks[idx] = sec.blocks[idx - 1];
            sec.blocks[idx - 1] = temp;
            swapped = true;
        } else if (direction === 1 && idx < sec.blocks.length - 1) {
            const temp = sec.blocks[idx];
            sec.blocks[idx] = sec.blocks[idx + 1];
            sec.blocks[idx + 1] = temp;
            swapped = true;
        }
        if (swapped) this.saveToFirebase();
    }
};

const UI = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        // UI Render depends on Firebase Snapshot stream now
    },

    cacheDOM() {
        this.sectionList = document.getElementById('section-list');
        this.workspace = document.getElementById('workspace');
        this.mainHeader = document.getElementById('main-header');
        this.currentTitle = document.getElementById('current-section-title');
        
        this.btnAddSection = document.getElementById('btn-add-section');
        this.btnDeleteSection = document.getElementById('btn-delete-section');
        this.btnAddContent = document.getElementById('btn-add-content');
        this.btnReset = document.getElementById('btn-reset');
        
        this.modalAddContent = document.getElementById('modal-add-content');
        this.closeModalBtns = document.querySelectorAll('.close-modal');
        this.blockTypeBtns = document.querySelectorAll('.block-type-btn');
    },

    bindEvents() {
        this.btnAddSection.addEventListener('click', () => {
            AppState.addSection();
        });

        this.btnDeleteSection.addEventListener('click', () => {
            if (AppState.data.currentSectionId && confirm('¿Eliminar esta sección?')) {
                AppState.deleteSection(AppState.data.currentSectionId);
            }
        });

        this.currentTitle.addEventListener('blur', (e) => {
            if (AppState.data.currentSectionId) {
                AppState.updateSectionTitle(AppState.data.currentSectionId, e.target.innerText);
            }
        });

        this.btnAddContent.addEventListener('click', () => {
            this.modalAddContent.classList.add('active');
        });

        this.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.modalAddContent.classList.remove('active');
            });
        });

        this.blockTypeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                if (AppState.data.currentSectionId) {
                    AppState.addBlock(AppState.data.currentSectionId, type);
                }
                this.modalAddContent.classList.remove('active');
            });
        });

        this.btnReset.addEventListener('click', () => {
            if(confirm('ATENCIÓN: Borrará la base de datos entera de UMO. ¿Seguro?')) {
                AppState.reset();
            }
        });
    },

    renderSidebar() {
        this.sectionList.innerHTML = '';
        AppState.data.sections.forEach(sec => {
            const li = document.createElement('li');
            li.className = 'section-item' + (sec.id === AppState.data.currentSectionId ? ' active' : '');
            li.innerHTML = `
                <span class="section-name" title="${sec.title}">${sec.title}</span>
                <div style="display:flex; gap: 4px; opacity: 0.6;">
                    <i class="ri-arrow-up-s-line" data-action="up" style="cursor:pointer;" title="Subir"></i>
                    <i class="ri-arrow-down-s-line" data-action="down" style="cursor:pointer;" title="Bajar"></i>
                </div>
            `;
            
            li.querySelector('.section-name').addEventListener('click', () => {
                AppState.data.currentSectionId = sec.id;
                this.renderSidebar();
                this.renderWorkspace();
            });

            li.querySelector('[data-action="up"]').addEventListener('click', (e) => {
                e.stopPropagation();
                AppState.moveSection(sec.id, -1);
            });

            li.querySelector('[data-action="down"]').addEventListener('click', (e) => {
                e.stopPropagation();
                AppState.moveSection(sec.id, 1);
            });

            this.sectionList.appendChild(li);
        });
    },

    renderWorkspace() {
        let chartConfigs = [];
        const sectionId = AppState.data.currentSectionId;
        const sec = AppState.data.sections.find(s => s.id === sectionId);

        if (!sec) {
            this.mainHeader.style.display = 'none';
            this.workspace.innerHTML = `
                <div class="empty-state">
                    <i class="ri-refresh-line ri-spin" style="display: ${AppState.isInitializing ? 'block' : 'none'}; font-size:2rem; margin-bottom:10px;"></i>
                    <i class="ri-dashboard-line" style="display: ${AppState.isInitializing ? 'none' : 'block'};"></i>
                    <h2>Conectado con la Nube</h2>
                    <p>Selecciona o crea una nueva sección.</p>
                </div>
            `;
            return;
        }

        this.mainHeader.style.display = 'flex';
        this.currentTitle.innerText = sec.title;

        this.workspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'section-wrapper';

        if (sec.blocks.length === 0) {
            wrapper.innerHTML = `
                <div class="empty-state" style="height: 300px;">
                    <p>Esta sección está vacía.</p>
                    <button class="btn btn-primary mt-4" onclick="document.getElementById('btn-add-content').click()">
                        Agregar Contenido
                    </button>
                </div>
            `;
        }

        sec.blocks.forEach(block => {
            const blockEl = document.createElement('div');
            blockEl.className = 'content-block';
            blockEl.dataset.id = block.id;

            let contentHtml = '';
            let contentEditableAttr = 'contenteditable="true"';
            
            switch (block.type) {
                case 'title':
                    contentHtml = `<h2 class="umo-title" ${contentEditableAttr}>${block.content}</h2>`; break;
                case 'subtitle':
                    contentHtml = `<h3 class="umo-subtitle" ${contentEditableAttr}>${block.content}</h3>`; break;
                case 'text':
                    contentHtml = `<p class="umo-text" ${contentEditableAttr}>${block.content}</p>`; break;
                case 'image':
                    contentHtml = `
                        <div class="umo-image-wrapper">
                            <img src="${block.content}" alt="Image" />
                            <div class="btn btn-primary btn-sm" style="position:absolute; top:8px; right:8px; z-index:10;" onclick="window.UI.promptImageChange('${sec.id}', '${block.id}', '${block.content}')">Cambiarl URL</div>
                        </div>
                    `; break;
                case 'link':
                    let [label, url] = block.content.split('|');
                    if(!url) url = '#';
                    contentHtml = `
                        <div>
                            <a href="${url}" target="_blank" class="umo-link">${label} <i class="ri-external-link-line"></i></a>
                            <button class="btn btn-outline btn-sm ml-2" onclick="window.UI.promptLinkChange('${sec.id}', '${block.id}', '${block.content}')"><i class="ri-edit-line"></i> Editar enlace</button>
                        </div>
                    `; break;
                case 'card':
                    contentHtml = `<div class="umo-card" ${contentEditableAttr}>${block.content}</div>`; break;
                case 'list':
                    contentHtml = `<ul class="umo-list" ${contentEditableAttr}>${block.content}</ul>`; break;
                case 'table':
                    contentHtml = `
                        <div style="overflow-x:auto;">
                            <table class="umo-table"><tbody ${contentEditableAttr}>${block.content}</tbody></table>
                        </div>
                    `; break;
                case 'chart':
                    const canvasId = 'chart-' + block.id;
                    contentHtml = `
                        <div class="umo-chart-wrapper" style="width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <canvas id="${canvasId}"></canvas>
                        </div>
                    `;
                    try {
                        const config = JSON.parse(block.content);
                        chartConfigs.push({ canvasId, config });
                    } catch(e) { console.error('Invalid chart config', e); }
                    break;
            }

            blockEl.innerHTML = `
                ${contentHtml}
                <div class="block-actions">
                    <button class="btn-icon" title="Subir" onclick="window.UI.moveBlock('${sec.id}', '${block.id}', -1)"><i class="ri-arrow-up-line"></i></button>
                    <button class="btn-icon" title="Bajar" onclick="window.UI.moveBlock('${sec.id}', '${block.id}', 1)"><i class="ri-arrow-down-line"></i></button>
                    <button class="btn-icon text-danger" title="Eliminar" onclick="window.UI.deleteBlock('${sec.id}', '${block.id}')"><i class="ri-delete-bin-line"></i></button>
                </div>
            `;

            // Auto-save on blur
            const editableEl = blockEl.querySelector('[contenteditable="true"]');
            if (editableEl) {
                editableEl.addEventListener('blur', (e) => {
                    AppState.updateBlock(sec.id, block.id, editableEl.innerHTML);
                });
            }

            wrapper.appendChild(blockEl);
        });

        this.workspace.appendChild(wrapper);

        // Render charts after they are in the DOM
        chartConfigs.forEach(chartData => {
            const ctx = document.getElementById(chartData.canvasId);
            if (ctx) {
                new Chart(ctx, chartData.config);
            }
        });
    },

    deleteBlock(secId, blockId) {
        if(confirm('¿Eliminar bloque permanentemente?')) {
            AppState.deleteBlock(secId, blockId);
        }
    },

    moveBlock(secId, blockId, direction) {
        AppState.moveBlock(secId, blockId, direction);
    },

    promptImageChange(secId, blockId, currentUrl) {
        const newUrl = prompt('Ingresa la nueva URL de la imagen:', currentUrl);
        if (newUrl !== null) {
            AppState.updateBlock(secId, blockId, newUrl);
        }
    },

    promptLinkChange(secId, blockId, currentContent) {
        const parts = currentContent.split('|');
        const currentLabel = parts[0] || 'Enlace';
        const currentUrl = parts[1] || 'https://';
        
        const newLabel = prompt('Etiqueta del enlace:', currentLabel);
        if (newLabel === null) return;
        const newUrl = prompt('URL del enlace:', currentUrl);
        if (newUrl === null) return;
        
        AppState.updateBlock(secId, blockId, `${newLabel}|${newUrl}`);
    }
};

window.UI = UI;

function bootstrapApp() {
    UI.init();
    AppState.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
    bootstrapApp();
}
