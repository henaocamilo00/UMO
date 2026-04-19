const DEFAULT_STATE = {
    settings: {
        primaryColor: '#1a1c20',
        accentColor: '#b91c1c',
        fontFamily: "'Inter', sans-serif"
    },
    blocks: [
        {
            id: 'header-1',
            type: 'header',
            data: {
                logoText: 'UMO',
                links: ['About', 'Solutions', 'Global', 'Contact']
            }
        },
        {
            id: 'hero-1',
            type: 'hero',
            data: {
                title: 'Engineering the Future of Industry.',
                subtitle: 'Precision, innovation, and global scale in premium auto parts and mobility solutions.',
                buttonPrimary: 'Explore Solutions',
                buttonSecondary: 'Our History',
                image: 'https://images.unsplash.com/photo-1565514020179-026b92b64aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            }
        },
        {
            id: 'about-1',
            type: 'text_image',
            data: {
                title: 'About UMO',
                text: 'With decades of experience in the industrial manufacturing sector, UMO stands as a pillar of quality, comfort, and technological advancement. We engineer progress for a world in constant motion.',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5cb9aef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                reverse: false
            }
        },
        {
            id: 'cards-1',
            type: 'cards',
            data: {
                title: 'Business Lines',
                subtitle: 'Core competencies driving our corporate strategy.',
                items: [
                    { icon: 'ri-car-fill', title: 'Autoparts', desc: 'High-durability components for the modern automotive industry.' },
                    { icon: 'ri-motorbike-fill', title: 'Motorcycles', desc: 'Innovative mobility solutions blending power and efficiency.' },
                    { icon: 'ri-armchair-fill', title: 'Comfort Systems', desc: 'Premium ergonomic designs for commercial and public transit.' }
                ]
            }
        },
        {
            id: 'footer-1',
            type: 'footer',
            data: {
                company: 'UMO Industrial',
                text: 'Premium manufacturing and innovative engineering.',
                address: '123 Industrial Ave, Tech District'
            }
        }
    ]
};

const StateManager = {
    state: null,

    init() {
        const saved = localStorage.getItem('umo_state');
        if (saved) {
            try {
                this.state = JSON.parse(saved);
            } catch (e) {
                this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
            }
        } else {
            this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    },

    save() {
        localStorage.setItem('umo_state', JSON.stringify(this.state));
        this.applySettings();
    },

    reset() {
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        this.save();
    },

    applySettings() {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', this.state.settings.primaryColor);
        root.style.setProperty('--color-accent', this.state.settings.accentColor);
        root.style.setProperty('--font-family', this.state.settings.fontFamily);
    },

    updateBlockData(id, path, value) {
        const block = this.state.blocks.find(b => b.id === id);
        if (block) {
            // handle simple nested path like 'title' or 'items.0.title'
            const parts = path.split('.');
            let current = block.data;
            for (let i = 0; i < parts.length - 1; i++) {
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
            this.save();
        }
    },

    addBlock(type) {
        // Find default data for type from Blocks dict defined in blocks.js
        const newBlock = {
            id: type + '-' + Date.now(),
            type: type,
            data: JSON.parse(JSON.stringify(Blocks[type].defaultData))
        };
        // insert before footer if footer exists, else at end
        const footerIndex = this.state.blocks.findIndex(b => b.type === 'footer');
        if (footerIndex > -1) {
            this.state.blocks.splice(footerIndex, 0, newBlock);
        } else {
            this.state.blocks.push(newBlock);
        }
        this.save();
        return newBlock;
    },

    removeBlock(id) {
        this.state.blocks = this.state.blocks.filter(b => b.id !== id);
        this.save();
    },

    moveBlock(id, direction) {
        const idx = this.state.blocks.findIndex(b => b.id === id);
        if (idx > -1) {
            if (direction === 'up' && idx > 0) {
                const temp = this.state.blocks[idx];
                this.state.blocks[idx] = this.state.blocks[idx - 1];
                this.state.blocks[idx - 1] = temp;
                this.save();
            } else if (direction === 'down' && idx < this.state.blocks.length - 1) {
                const temp = this.state.blocks[idx];
                this.state.blocks[idx] = this.state.blocks[idx + 1];
                this.state.blocks[idx + 1] = temp;
                this.save();
            }
        }
    },

    duplicateBlock(id) {
        const idx = this.state.blocks.findIndex(b => b.id === id);
        if (idx > -1) {
            const copy = JSON.parse(JSON.stringify(this.state.blocks[idx]));
            copy.id = copy.type + '-' + Date.now();
            this.state.blocks.splice(idx + 1, 0, copy);
            this.save();
        }
    }
};
