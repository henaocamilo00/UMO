const Blocks = {
    header: {
        name: 'Header',
        defaultData: { logoText: 'UMO', links: ['About', 'Solutions', 'Contact'] },
        render: (id, data) => `
            <header class="header">
                <div class="container">
                    <div class="logo">
                        <i class="ri-triangle-fill"></i>
                        <span data-editable="true" data-path="logoText">${data.logoText}</span>
                    </div>
                    <ul class="nav-menu">
                        ${data.links.map((link, i) => `
                            <li><a href="#" class="nav-link" data-editable="true" data-path="links.${i}">${link}</a></li>
                        `).join('')}
                    </ul>
                </div>
            </header>
        `
    },
    hero: {
        name: 'Hero Section',
        defaultData: {
            title: 'New Hero Section',
            subtitle: 'Add an impressive subtitle here.',
            buttonPrimary: 'Action',
            buttonSecondary: 'Learn',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        },
        render: (id, data) => `
            <section class="hero">
                <div class="editable-img-wrapper" data-path="image">
                    <img src="${data.image}" alt="Hero Image" class="hero-img">
                </div>
                <div class="container">
                    <h1 data-editable="true" data-path="title">${data.title}</h1>
                    <p data-editable="true" data-path="subtitle">${data.subtitle}</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary" data-editable="true" data-path="buttonPrimary">${data.buttonPrimary}</button>
                        <button class="btn btn-outline" style="color:white; border-color:white;" data-editable="true" data-path="buttonSecondary">${data.buttonSecondary}</button>
                    </div>
                </div>
            </section>
        `
    },
    text_image: {
        name: 'Text + Image',
        defaultData: {
            title: 'Section Title',
            text: 'Describe your company capabilities, historical background, or strategic overview here.',
            image: 'https://images.unsplash.com/photo-1580983546086-63e2ab7ac8f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            reverse: false
        },
        render: (id, data) => `
            <section class="section">
                <div class="container">
                    <div class="img-text-section" style="direction: ${data.reverse ? 'rtl' : 'ltr'}">
                        <div style="direction: ltr">
                            <h2 class="section-title" data-editable="true" data-path="title">${data.title}</h2>
                            <p class="mt-4" data-editable="true" data-path="text" style="white-space: pre-wrap;">${data.text}</p>
                        </div>
                        <div class="editable-img-wrapper" data-path="image" style="direction: ltr">
                            <img src="${data.image}" alt="Image">
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    cards: {
        name: 'Features / Cards',
        defaultData: {
            title: 'Grid Section',
            subtitle: 'Perfect for business lines, strategic points, or products.',
            items: [
                { icon: 'ri-focus-3-line', title: 'Item 1', desc: 'Description 1' },
                { icon: 'ri-global-line', title: 'Item 2', desc: 'Description 2' },
                { icon: 'ri-lightbulb-flash-line', title: 'Item 3', desc: 'Description 3' }
            ]
        },
        render: (id, data) => `
            <section class="section section-dark">
                <div class="container">
                    <div class="text-center mb-8">
                        <h2 class="section-title" data-editable="true" data-path="title">${data.title}</h2>
                        <p class="section-subtitle mx-auto mt-4" data-editable="true" data-path="subtitle">${data.subtitle}</p>
                    </div>
                    <div class="grid grid-cols-3">
                        ${data.items.map((item, i) => `
                            <div class="card">
                                <i class="${item.icon} card-icon" data-editable="true" data-path="items.${i}.icon"></i>
                                <h3 class="card-title" data-editable="true" data-path="items.${i}.title">${item.title}</h3>
                                <p data-editable="true" data-path="items.${i}.desc">${item.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `
    },
    footer: {
        name: 'Footer',
        defaultData: {
            company: 'Company Name',
            text: 'Premium solutions.',
            address: '123 Main St.'
        },
        render: (id, data) => `
            <footer class="footer">
                <div class="container">
                    <div class="footer-top">
                        <div>
                            <h3 class="footer-title" data-editable="true" data-path="company">${data.company}</h3>
                            <p data-editable="true" data-path="text">${data.text}</p>
                        </div>
                        <div>
                            <h3 class="footer-title">Contact</h3>
                            <p data-editable="true" data-path="address">${data.address}</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2026 <span data-editable="true" data-path="company">${data.company}</span>. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `
    }
};
