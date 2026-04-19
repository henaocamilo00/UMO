document.addEventListener('DOMContentLoaded', () => {
    // Initialize State
    StateManager.init();
    StateManager.applySettings();

    // Initialize Renderer
    Renderer.init();

    // Initialize Editor Panel
    Editor.init();

    // Initial Render
    Renderer.render();
});
