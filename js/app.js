const AppState = {
    data: {
        sections: [
            {
                id: 'sec-1',
                title: 'Mapeo inicial de la empresa',
                blocks: [
                    { id: 'b-1', type: 'title', content: 'Mapeo Inicial' },
                    { id: 'b-2', type: 'text', content: 'Aquí comienza el mapeo inicial de la empresa. Edita este texto para empezar a registrar información corporativa.' }
                ]
            },
            { id: 'sec-2', title: 'Descripción del bien y BMC', blocks: [] },
            { id: 'sec-3', title: 'Potencialidades', blocks: [] },
            { id: 'sec-4', title: 'Análisis DOFA', blocks: [] },
            { id: 'sec-5', title: 'Sostenibilidad ESG', blocks: [] },
            { id: 'sec-6', title: 'Viabilidad internacional', blocks: [] },
            { id: 'sec-7', title: 'Objetivo SMART', blocks: [] }
        ],
        currentSectionId: null
    },

    init() {
        const saved = localStorage.getItem('umo_dashboard_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.sections) {
                    this.data.sections = parsed.sections;
                }
            } catch (e) {
                console.error('Failed to parse saved state:', e);
            }
        }
    },

    save() {
        localStorage.setItem('umo_dashboard_data', JSON.stringify(this.data));
    },

    reset() {
        localStorage.removeItem('umo_dashboard_data');
        location.reload();
    },

    addSection() {
        const id = 'sec-' + Date.now();
        this.data.sections.push({
            id: id,
            title: 'Nueva Sección',
            blocks: []
        });
        this.save();
        return id;
    },

    deleteSection(id) {
        this.data.sections = this.data.sections.filter(s => s.id !== id);
        if (this.data.currentSectionId === id) {
            this.data.currentSectionId = null;
        }
        this.save();
    },

    updateSectionTitle(id, newTitle) {
        const sec = this.data.sections.find(s => s.id === id);
        if (sec) {
            sec.title = newTitle;
            this.save();
        }
    },

    moveSection(id, direction) {
        const idx = this.data.sections.findIndex(s => s.id === id);
        if (idx === -1) return;
        
        if (direction === -1 && idx > 0) {
            const temp = this.data.sections[idx];
            this.data.sections[idx] = this.data.sections[idx - 1];
            this.data.sections[idx - 1] = temp;
        } else if (direction === 1 && idx < this.data.sections.length - 1) {
            const temp = this.data.sections[idx];
            this.data.sections[idx] = this.data.sections[idx + 1];
            this.data.sections[idx + 1] = temp;
        }
        this.save();
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
            case 'list': content = '<li>Elemento de lista 1</li><li>Elemento de lista 2</li>'; break;
            case 'table': content = '<tr><th>Col 1</th><th>Col 2</th></tr><tr><td>Dato 1</td><td>Dato 2</td></tr>'; break;
        }

        sec.blocks.push({
            id: 'b-' + Date.now(),
            type: type,
            content: content
        });
        this.save();
    },

    updateBlock(sectionId, blockId, content) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        const block = sec.blocks.find(b => b.id === blockId);
        if (block) {
            block.content = content;
            this.save();
        }
    },

    deleteBlock(sectionId, blockId) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        sec.blocks = sec.blocks.filter(b => b.id !== blockId);
        this.save();
    },

    moveBlock(sectionId, blockId, direction) {
        const sec = this.data.sections.find(s => s.id === sectionId);
        if (!sec) return;
        const idx = sec.blocks.findIndex(b => b.id === blockId);
        if (idx === -1) return;
        
        if (direction === -1 && idx > 0) {
            const temp = sec.blocks[idx];
            sec.blocks[idx] = sec.blocks[idx - 1];
            sec.blocks[idx - 1] = temp;
        } else if (direction === 1 && idx < sec.blocks.length - 1) {
            const temp = sec.blocks[idx];
            sec.blocks[idx] = sec.blocks[idx + 1];
            sec.blocks[idx + 1] = temp;
        }
        this.save();
    }
};

const UI = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderSidebar();
        
        if (AppState.data.sections.length > 0) {
            this.loadSection(AppState.data.sections[0].id);
        } else {
            this.renderWorkspace();
        }
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
            const newId = AppState.addSection();
            this.renderSidebar();
            this.loadSection(newId);
        });

        this.btnDeleteSection.addEventListener('click', () => {
            if (AppState.data.currentSectionId) {
                if(confirm('¿Eliminar esta sección y todo su contenido?')) {
                    AppState.deleteSection(AppState.data.currentSectionId);
                    this.renderSidebar();
                    if(AppState.data.sections.length > 0) {
                        this.loadSection(AppState.data.sections[0].id);
                    } else {
                        AppState.data.currentSectionId = null;
                        this.renderWorkspace();
                    }
                }
            }
        });

        this.currentTitle.addEventListener('blur', (e) => {
            if (AppState.data.currentSectionId) {
                AppState.updateSectionTitle(AppState.data.currentSectionId, e.target.innerText);
                this.renderSidebar();
            }
        });

        // Add Content Modal
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
                    this.renderWorkspace();
                }
                this.modalAddContent.classList.remove('active');
            });
        });

        this.btnReset.addEventListener('click', () => {
            if(confirm('ATENCIÓN: Esto borrará toda tu información actual y restaurará las secciones por defecto. ¿Continuar?')) {
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
                this.loadSection(sec.id);
            });

            li.querySelector('[data-action="up"]').addEventListener('click', (e) => {
                e.stopPropagation();
                AppState.moveSection(sec.id, -1);
                this.renderSidebar();
            });

            li.querySelector('[data-action="down"]').addEventListener('click', (e) => {
                e.stopPropagation();
                AppState.moveSection(sec.id, 1);
                this.renderSidebar();
            });

            this.sectionList.appendChild(li);
        });
    },

    loadSection(id) {
        AppState.data.currentSectionId = id;
        this.renderSidebar();
        this.renderWorkspace();
    },

    renderWorkspace() {
        const sectionId = AppState.data.currentSectionId;
        const sec = AppState.data.sections.find(s => s.id === sectionId);

        if (!sec) {
            this.mainHeader.style.display = 'none';
            this.workspace.innerHTML = `
                <div class="empty-state">
                    <i class="ri-dashboard-line"></i>
                    <h2>Bienvenido a UMO Workspace</h2>
                    <p>Crea una nueva sección en el panel lateral.</p>
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

            // Render block content
            let contentHtml = '';
            let contentEditableAttr = 'contenteditable="true"';
            
            switch (block.type) {
                case 'title':
                    contentHtml = `<h2 class="umo-title" ${contentEditableAttr}>${block.content}</h2>`;
                    break;
                case 'subtitle':
                    contentHtml = `<h3 class="umo-subtitle" ${contentEditableAttr}>${block.content}</h3>`;
                    break;
                case 'text':
                    contentHtml = `<p class="umo-text" ${contentEditableAttr}>${block.content}</p>`;
                    break;
                case 'image':
                    contentHtml = `
                        <div class="umo-image-wrapper">
                            <img src="${block.content}" alt="Image" />
                            <div class="btn btn-primary btn-sm" style="position:absolute; top:8px; right:8px; z-index:10;" onclick="UI.promptImageChange('${sec.id}', '${block.id}', '${block.content}')">Cambiarl URL</div>
                        </div>
                    `;
                    break;
                case 'link':
                    let [label, url] = block.content.split('|');
                    if(!url) url = '#';
                    contentHtml = `
                        <div>
                            <a href="${url}" target="_blank" class="umo-link">${label} <i class="ri-external-link-line"></i></a>
                            <button class="btn btn-outline btn-sm ml-2" onclick="UI.promptLinkChange('${sec.id}', '${block.id}', '${block.content}')"><i class="ri-edit-line"></i> Editar enlace</button>
                        </div>
                    `;
                    break;
                case 'card':
                    contentHtml = `<div class="umo-card" ${contentEditableAttr}>${block.content}</div>`;
                    break;
                case 'list':
                    contentHtml = `<ul class="umo-list" ${contentEditableAttr}>${block.content}</ul>`;
                    break;
                case 'table':
                    contentHtml = `
                        <div style="overflow-x:auto;">
                            <table class="umo-table">
                                <tbody ${contentEditableAttr}>${block.content}</tbody>
                            </table>
                        </div>
                    `;
                    break;
            }

            blockEl.innerHTML = `
                ${contentHtml}
                <div class="block-actions">
                    <button class="btn-icon" title="Subir" onclick="UI.moveBlock('${sec.id}', '${block.id}', -1)"><i class="ri-arrow-up-line"></i></button>
                    <button class="btn-icon" title="Bajar" onclick="UI.moveBlock('${sec.id}', '${block.id}', 1)"><i class="ri-arrow-down-line"></i></button>
                    <button class="btn-icon text-danger" title="Eliminar" onclick="UI.deleteBlock('${sec.id}', '${block.id}')"><i class="ri-delete-bin-line"></i></button>
                </div>
            `;

            // Setup blur event for auto save
            const editableEl = blockEl.querySelector('[contenteditable="true"]');
            if (editableEl) {
                editableEl.addEventListener('blur', (e) => {
                    AppState.updateBlock(sec.id, block.id, editableEl.innerHTML);
                });
            }

            wrapper.appendChild(blockEl);
        });

        this.workspace.appendChild(wrapper);
    },

    deleteBlock(secId, blockId) {
        if(confirm('¿Eliminar bloque de contenido?')) {
            AppState.deleteBlock(secId, blockId);
            this.renderWorkspace();
        }
    },

    moveBlock(secId, blockId, direction) {
        AppState.moveBlock(secId, blockId, direction);
        this.renderWorkspace();
    },

    promptImageChange(secId, blockId, currentUrl) {
        const newUrl = prompt('Ingresa la nueva URL de la imagen:', currentUrl);
        if (newUrl !== null) {
            AppState.updateBlock(secId, blockId, newUrl);
            this.renderWorkspace();
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
        this.renderWorkspace();
    }
};

// Global Exposure for inline event handlers
window.UI = UI;

document.addEventListener('DOMContentLoaded', () => {
    AppState.init();
    UI.init();
});
