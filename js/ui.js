// UI Utilities Module

// Update UI button states based on current state
export function updateUI(state) {
    if (!state) return;
    document.getElementById('undoBtn').disabled = state.historyIndex <= 0;
    document.getElementById('redoBtn').disabled = state.historyIndex >= state.history.length - 1;
}

// Update preview canvas size to match main canvas
export function updatePreviewCanvasSize(state) {
    if (state && state.previewCanvas) {
        state.previewCanvas.width = state.canvas.width;
        state.previewCanvas.height = state.canvas.height;
    }
}

// Toggle sidebar collapsed state
export function toggleSidebar(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (!sidebar) return;
    
    sidebar.classList.toggle('collapsed');
    localStorage.setItem(`${sidebarId}-collapsed`, sidebar.classList.contains('collapsed'));
}

// Restore UI state from localStorage
export function restoreUIState() {
    // Restore sidebar states
    const leftCollapsed = localStorage.getItem('leftSidebar-collapsed') === 'true';
    const rightCollapsed = localStorage.getItem('rightSidebar-collapsed') === 'true';
    
    if (leftCollapsed) {
        document.getElementById('leftSidebar')?.classList.add('collapsed');
    }
    if (rightCollapsed) {
        document.getElementById('rightSidebar')?.classList.add('collapsed');
    }
    
    // Restore panel states
    restorePanelStates();
}

// Toggle panel section collapsed state
export function togglePanelSection(panelName) {
    const panel = document.querySelector(`[data-panel="${panelName}"]`);
    if (!panel) return;
    
    panel.classList.toggle('collapsed');
    localStorage.setItem(`panel-${panelName}-collapsed`, panel.classList.contains('collapsed'));
}

// Restore panel collapsed states from localStorage
export function restorePanelStates() {
    const panels = document.querySelectorAll('[data-panel]');
    panels.forEach(panel => {
        const panelName = panel.dataset.panel;
        const isCollapsed = localStorage.getItem(`panel-${panelName}-collapsed`) === 'true';
        if (isCollapsed) {
            panel.classList.add('collapsed');
        }
    });
}

// Close a modal dialog
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Show a modal dialog
export function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}
