const Editor = {
    init() {
        this.bindEvents();
        this.populateAddMenu();
        this.syncUIWithState();
    },

    bindEvents() {
        const togglePanelBtn = document.getElementById('editor-toggle');
        const panel = document.getElementById('editor-panel');
        
        togglePanelBtn.addEventListener('click', () => {
            panel.classList.toggle('collapsed');
        });

        const toggleMode = document.getElementById('edit-mode-toggle');
        toggleMode.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('is-editing');
            } else {
                document.body.classList.remove('is-editing');
            }
            Renderer.render(); // Re-render to show/hide toolbars
        });

        // Theme Controls
        document.getElementById('theme-primary').addEventListener('input', (e) => {
            StateManager.state.settings.primaryColor = e.target.value;
            StateManager.save();
        });
        document.getElementById('theme-accent').addEventListener('input', (e) => {
            StateManager.state.settings.accentColor = e.target.value;
            StateManager.save();
        });
        document.getElementById('theme-font').addEventListener('change', (e) => {
            StateManager.state.settings.fontFamily = e.target.value;
            StateManager.save();
        });

        // Reset
        document.getElementById('reset-site').addEventListener('click', () => {
            if(confirm('Are you sure you want to reset all content?')) {
                StateManager.reset();
                this.syncUIWithState();
                Renderer.render();
            }
        });
    },

    syncUIWithState() {
        document.getElementById('theme-primary').value = StateManager.state.settings.primaryColor;
        document.getElementById('theme-accent').value = StateManager.state.settings.accentColor;
        document.getElementById('theme-font').value = StateManager.state.settings.fontFamily;
    },

    populateAddMenu() {
        const menu = document.getElementById('add-block-menu');
        menu.innerHTML = '';
        Object.keys(Blocks).forEach(type => {
            const btn = document.createElement('button');
            btn.className = 'add-block-btn';
            btn.innerHTML = `<i class="ri-add-box-line"></i> ${Blocks[type].name}`;
            btn.addEventListener('click', () => {
                StateManager.addBlock(type);
                Renderer.render();
                // scroll to bottom smoothly
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
            menu.appendChild(btn);
        });
    },

    moveBlock(id, direction) {
        StateManager.moveBlock(id, direction);
        Renderer.render();
    },

    duplicateBlock(id) {
        StateManager.duplicateBlock(id);
        Renderer.render();
    },

    removeBlock(id) {
        if(confirm('Delete this section?')) {
            StateManager.removeBlock(id);
            Renderer.render();
        }
    },

    promptImageChange(blockId, path, currentUrl) {
        // Create an overlay to enter the new URL
        const overlay = document.createElement('div');
        overlay.className = 'overlay-prompt';
        overlay.innerHTML = `
            <div class="overlay-content">
                <h3>Change Image URL</h3>
                <input type="text" id="img-url-input" value="${currentUrl}" />
                <div class="overlay-actions">
                    <button class="btn btn-outline" id="img-cancel">Cancel</button>
                    <button class="btn btn-primary" id="img-save">Save</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('img-cancel').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        document.getElementById('img-save').addEventListener('click', () => {
            const newUrl = document.getElementById('img-url-input').value;
            if (newUrl) {
                StateManager.updateBlockData(blockId, path, newUrl);
                Renderer.render();
            }
            document.body.removeChild(overlay);
        });
    }
};
