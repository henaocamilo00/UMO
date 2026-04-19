const Renderer = {
    container: null,

    init() {
        this.container = document.getElementById('app-container');
    },

    render() {
        this.container.innerHTML = '';
        const isEditing = document.body.classList.contains('is-editing');

        StateManager.state.blocks.forEach(block => {
            const blockDef = Blocks[block.type];
            if (!blockDef) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'block-wrapper';
            wrapper.dataset.blockId = block.id;

            wrapper.innerHTML = blockDef.render(block.id, block.data);

            if (isEditing) {
                this.injectToolbar(wrapper, block.id);
            }

            this.container.appendChild(wrapper);
        });

        this.bindInlineEvents();
    },

    injectToolbar(wrapper, id) {
        const toolbar = document.createElement('div');
        toolbar.className = 'block-toolbar';
        toolbar.innerHTML = `
            <button class="action-btn" title="Move Up" onclick="Editor.moveBlock('${id}', 'up')"><i class="ri-arrow-up-line"></i></button>
            <button class="action-btn" title="Move Down" onclick="Editor.moveBlock('${id}', 'down')"><i class="ri-arrow-down-line"></i></button>
            <button class="action-btn" title="Duplicate" onclick="Editor.duplicateBlock('${id}')"><i class="ri-file-copy-line"></i></button>
            <button class="action-btn delete-btn" title="Delete" onclick="Editor.removeBlock('${id}')"><i class="ri-delete-bin-line"></i></button>
        `;
        wrapper.appendChild(toolbar);
    },

    bindInlineEvents() {
        const isEditing = document.body.classList.contains('is-editing');
        
        // Editable text elements
        const editables = this.container.querySelectorAll('[data-editable="true"]');
        editables.forEach(el => {
            if (isEditing) {
                el.setAttribute('contenteditable', 'true');
                el.addEventListener('blur', (e) => {
                    const blockId = e.target.closest('.block-wrapper').dataset.blockId;
                    const path = e.target.dataset.path;
                    const value = e.target.innerText;
                    StateManager.updateBlockData(blockId, path, value);
                });
                
                // Prevent links from redirecting during edit
                if (el.tagName === 'A') {
                    el.addEventListener('click', e => e.preventDefault());
                }
            } else {
                el.removeAttribute('contenteditable');
            }
        });

        // Editable images
        const imageWrappers = this.container.querySelectorAll('.editable-img-wrapper');
        imageWrappers.forEach(wrapper => {
            if (isEditing) {
                wrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    const blockId = wrapper.closest('.block-wrapper').dataset.blockId;
                    const path = wrapper.dataset.path;
                    const img = wrapper.querySelector('img');
                    Editor.promptImageChange(blockId, path, img.src);
                });
            } else {
                // remove listeners if needed, usually cloning handles this or just recreate
            }
        });
    }
};
