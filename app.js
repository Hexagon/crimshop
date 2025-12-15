// Import modules
import { Image } from './js/constants.js';
import { MIN_LAYER_DURATION, MULTI_FRAME_FORMATS } from './js/constants.js';
import { globalState, createWorkspaceState } from './js/state.js';
import * as LayersModule from './js/layers.js';
import * as HistoryModule from './js/history.js';
import * as UIModule from './js/ui.js';
import * as DrawingModule from './js/drawing.js';
import * as FileIOModule from './js/file-io.js';
import * as EffectsModule from './js/effects.js';
import * as SelectionModule from './js/selection.js';

// SVG Icons
const icons = {
    newFile: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/><path d="M12 11v6m-3-3h6"/></svg>',
    open: '<svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',
    save: '<svg viewBox="0 0 24 24"><path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/><path d="M6 6h9v4H6z"/></svg>',
    import: '<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
    dimensions: '<svg viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z"/><path d="M9 12l-3 3v-2H4v-2h2V9zm6 0l3-3v2h2v2h-2v2z"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2z"/></svg>',
    zoomOut: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M7 9h5v1H7z"/></svg>',
    zoomReset: '<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>',
    undo: '<svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>',
    redo: '<svg viewBox="0 0 24 24"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>',
    pointer: '<svg viewBox="0 0 24 24"><path d="M13.64 21.97c-.21 0-.42-.07-.59-.21L7.68 17.3l-1.4 1.4c-.19.19-.45.29-.71.29-.26 0-.52-.1-.71-.29L2.29 16.1c-.39-.39-.39-1.02 0-1.41l1.4-1.4-4.46-5.37c-.32-.38-.26-.95.12-1.27.38-.32.95-.26 1.27.12l6.5 7.83 6.5-7.83c.32-.38.89-.44 1.27-.12.38.32.44.89.12 1.27l-4.46 5.37 1.4 1.4c.39.39.39 1.02 0 1.41l-2.57 2.57 5.37 4.46c.35.29.4.81.11 1.16-.16.2-.39.3-.63.3z"/></svg>',
    rectSelect: '<svg viewBox="0 0 24 24"><path d="M3 5v14h18V5H3zm16 12H5V7h14v10z"/><path d="M6 8h2v2H6zm10 0h2v2h-2zM6 14h2v2H6zm10 0h2v2h-2z" opacity="0.5"/></svg>',
    freeformSelect: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" opacity="0.3"/><path d="M7 10l3-3 3 3 4-4 2 2-6 6-3-3z" fill="currentColor"/></svg>',
    move: '<svg viewBox="0 0 24 24"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/></svg>',
    brush: '<svg viewBox="0 0 24 24"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z"/></svg>',
    eraser: '<svg viewBox="0 0 24 24"><path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0zM4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53-6.36-6.36-3.54 3.53c-.78.79-.78 2.05 0 2.83z"/></svg>',
    fill: '<svg viewBox="0 0 24 24"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15a1.49 1.49 0 0 0 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/></svg>',
    gradient: '<svg viewBox="0 0 24 24"><path d="M11 9h2v2h-2zm-2 2h2v2H9zm4 0h2v2h-2zm2-2h2v2h-2z"/><path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" opacity="0.5"/><path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm8 0h2v2h-2zm0-4h2v2h-2z"/></svg>',
    rectangle: '<svg viewBox="0 0 24 24"><path d="M3 5v14h18V5H3zm16 12H5V7h14v10z"/></svg>',
    circle: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>',
    line: '<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    text: '<svg viewBox="0 0 24 24"><path d="M5 4v3h5.5v12h3V7H19V4H5z"/></svg>',
    selectAll: '<svg viewBox="0 0 24 24"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z"/></svg>',
    deselect: '<svg viewBox="0 0 24 24"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="2"/></svg>'
};

function createIcon(iconName) {
    const iconString = icons[iconName];
    if (!iconString) {
        console.warn(`Icon "${iconName}" not found`);
        return null;
    }
    
    const template = document.createElement('template');
    template.innerHTML = iconString.trim();
    return template.content.firstChild;
}

function setButtonIcon(element, iconName) {
    const icon = createIcon(iconName);
    if (icon) {
        element.innerHTML = '';
        element.appendChild(icon);
    }
}

// Application state (points to active workspace)
let state = null;

// Initialize the application
function init() {
    // Initialize icons for all buttons with data-icon attribute
    initializeIcons();
    
    // Create the start workspace
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const startState = createWorkspaceState(canvas, ctx);
    globalState.workspaces.set('start', startState);
    state = startState;
    
    setupEventListeners();
    restoreUIState();
    updateTabBar();
    
    // Show start screen
    showStartScreen();
}

// Initialize SVG icons for all buttons
function initializeIcons() {
    document.querySelectorAll('[data-icon]').forEach(button => {
        const iconName = button.getAttribute('data-icon');
        
        // For start buttons, add icon to the icon container
        if (button.classList.contains('start-btn')) {
            const iconContainer = button.querySelector('.start-btn-icon');
            if (iconContainer) {
                setButtonIcon(iconContainer, iconName);
            }
        } else {
            // For regular buttons, replace content
            setButtonIcon(button, iconName);
        }
    });
}

// Workspace Management
function showStartScreen() {
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('canvasWrapper').style.display = 'none';
}

function hideStartScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvasWrapper').style.display = 'block';
}

function createWorkspace(name, width = 800, height = 600, bgColor = '#FFFFFF') {
    const workspaceId = `workspace-${globalState.nextWorkspaceId++}`;
    
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Create workspace state
    const workspaceState = createWorkspaceState(canvas, ctx);
    
    // Create preview canvas overlay
    workspaceState.previewCanvas = document.createElement('canvas');
    workspaceState.previewCanvas.width = width;
    workspaceState.previewCanvas.height = height;
    workspaceState.previewCanvas.style.position = 'absolute';
    workspaceState.previewCanvas.style.pointerEvents = 'none';
    workspaceState.previewCanvas.style.top = '0';
    workspaceState.previewCanvas.style.left = '0';
    workspaceState.previewCtx = workspaceState.previewCanvas.getContext('2d', { willReadFrequently: true });
    
    // Add preview canvas to canvas wrapper
    const canvasWrapper = document.getElementById('canvasWrapper');
    canvasWrapper.style.position = 'relative';
    
    // Remove old preview canvas if exists
    const oldPreview = canvasWrapper.querySelector('canvas:not(#mainCanvas)');
    if (oldPreview) {
        oldPreview.remove();
    }
    canvasWrapper.appendChild(workspaceState.previewCanvas);
    
    // Create initial background layer
    workspaceState.layers.push(createLayerObject(workspaceState, 'Background', true));
    workspaceState.activeLayerIndex = 0;
    fillLayerInWorkspace(workspaceState, 0, bgColor);
    
    // Store workspace
    globalState.workspaces.set(workspaceId, workspaceState);
    
    // Switch to new workspace
    switchWorkspace(workspaceId);
    
    // Update UI
    updateLayersPanel();
    composeLayers();
    saveState();
    updateUI();
    applyZoom(); // Initialize zoom display
    
    // Update tab bar
    updateTabBar();
    
    // Hide start screen
    hideStartScreen();
    
    return workspaceId;
}

function switchWorkspace(workspaceId) {
    if (!globalState.workspaces.has(workspaceId)) {
        console.error('Workspace not found:', workspaceId);
        return;
    }
    
    // Save current state reference
    const oldState = state;
    
    // Switch active workspace
    globalState.activeWorkspaceId = workspaceId;
    state = globalState.workspaces.get(workspaceId);
    
    if (workspaceId === 'start') {
        showStartScreen();
        // Clear layers panel for start tab
        const layersPanel = document.getElementById('layersPanel');
        layersPanel.innerHTML = '';
    } else {
        hideStartScreen();
        
        // Restore canvas size
        const canvas = document.getElementById('mainCanvas');
        canvas.width = state.canvas.width;
        canvas.height = state.canvas.height;
        
        // Update preview canvas
        const canvasWrapper = document.getElementById('canvasWrapper');
        const oldPreview = canvasWrapper.querySelector('canvas:not(#mainCanvas)');
        if (oldPreview) {
            oldPreview.remove();
        }
        if (state.previewCanvas) {
            canvasWrapper.appendChild(state.previewCanvas);
        }
        
        // Restore layers and UI
        updateLayersPanel();
        composeLayers();
        updateUI();
        applyZoom(); // Apply zoom when switching workspace
        
        // Update metadata table if we have state
        if (state && state.metadata) {
            updateMetadataTable();
        }
    }
    
    updateTabBar();
}

function closeWorkspace(workspaceId) {
    if (workspaceId === 'start') {
        return; // Can't close start workspace
    }
    
    if (!globalState.workspaces.has(workspaceId)) {
        return;
    }
    
    // Remove workspace
    globalState.workspaces.delete(workspaceId);
    
    // If closing active workspace, switch to another one
    if (globalState.activeWorkspaceId === workspaceId) {
        // Find another workspace to switch to
        const workspaceIds = Array.from(globalState.workspaces.keys());
        const nextWorkspaceId = workspaceIds[workspaceIds.length - 1] || 'start';
        switchWorkspace(nextWorkspaceId);
    }
    
    updateTabBar();
}

function updateTabBar() {
    const tabBar = document.getElementById('tabBar');
    tabBar.innerHTML = '';
    
    // Add start tab
    const startTab = document.createElement('div');
    startTab.className = 'tab start-tab' + (globalState.activeWorkspaceId === 'start' ? ' active' : '');
    startTab.dataset.tabId = 'start';
    
    const startName = document.createElement('span');
    startName.className = 'tab-name';
    startName.textContent = 'Start';
    
    startTab.appendChild(startName);
    startTab.addEventListener('click', () => switchWorkspace('start'));
    tabBar.appendChild(startTab);
    
    // Add workspace tabs
    for (const [workspaceId, workspace] of globalState.workspaces.entries()) {
        if (workspaceId === 'start') continue;
        
        const tab = document.createElement('div');
        tab.className = 'tab' + (globalState.activeWorkspaceId === workspaceId ? ' active' : '');
        tab.dataset.tabId = workspaceId;
        
        const tabName = document.createElement('span');
        tabName.className = 'tab-name';
        tabName.textContent = workspace.metadata.title || `Workspace ${workspaceId.replace('workspace-', '')}`;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'tab-close';
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Close this workspace? Any unsaved changes will be lost.')) {
                closeWorkspace(workspaceId);
            }
        });
        
        tab.appendChild(tabName);
        tab.appendChild(closeBtn);
        tab.addEventListener('click', () => switchWorkspace(workspaceId));
        
        tabBar.appendChild(tab);
    }
}

// Layer Management - using modules
function createLayerObject(workspaceState, name, isBackground = false) {
    return LayersModule.createLayerObject(workspaceState, name, isBackground);
}

function fillLayerInWorkspace(workspaceState, layerIndex, color) {
    LayersModule.fillLayerInWorkspace(workspaceState, layerIndex, color);
}

function createLayer(name = 'Layer', isBackground = false) {
    const layer = LayersModule.createLayer(state, name, isBackground);
    updateLayersPanel();
    composeLayers();
    return layer;
}

function fillLayer(layerIndex, color) {
    LayersModule.fillLayer(state, layerIndex, color);
}

function deleteLayer(layerIndex) {
    if (LayersModule.deleteLayer(state, layerIndex)) {
        updateLayersPanel();
        composeLayers();
        saveState();
    }
}

function toggleLayerVisibility(layerIndex) {
    LayersModule.toggleLayerVisibility(state, layerIndex);
    composeLayers();
}

function setActiveLayer(layerIndex) {
    LayersModule.setActiveLayer(state, layerIndex);
    updateLayersPanel();
}

function composeLayers() {
    if (state) LayersModule.composeLayers(state);
}

function updateLayersPanel() {
    const panel = document.getElementById('layersPanel');
    panel.innerHTML = '';
    
    state.layers.forEach((layer, index) => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item' + (index === state.activeLayerIndex ? ' active' : '');
        layerItem.dataset.layerId = index;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = layer.visible;
        checkbox.className = 'layer-visibility';
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLayerVisibility(index);
        });
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'layer-name';
        nameSpan.textContent = layer.name;
        
        const opacitySpan = document.createElement('span');
        opacitySpan.className = 'layer-opacity';
        opacitySpan.textContent = `${Math.round(layer.opacity * 100)}%`;
        opacitySpan.title = 'Click to edit opacity';
        opacitySpan.addEventListener('click', (e) => {
            e.stopPropagation();
            showLayerOpacityModal(index);
        });
        
        const durationSpan = document.createElement('span');
        durationSpan.className = 'layer-duration';
        durationSpan.textContent = `${layer.duration}ms`;
        durationSpan.title = 'Click to edit duration';
        durationSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            showLayerDurationModal(index);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'layer-delete';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteLayer(index);
        });
        
        layerItem.appendChild(checkbox);
        layerItem.appendChild(nameSpan);
        layerItem.appendChild(opacitySpan);
        layerItem.appendChild(durationSpan);
        if (!layer.isBackground || state.layers.length > 1) {
            layerItem.appendChild(deleteBtn);
        }
        
        layerItem.addEventListener('click', () => setActiveLayer(index));
        
        panel.appendChild(layerItem);
    });
}

// Drawing Functions
// Drawing - using modules
function getMousePos(e) {
    return DrawingModule.getMousePos(state, e);
}

function startDrawing(e) {
    if (!state) return;
    
    // For text tool, open modal instead of drawing
    if (state.tool === 'text') {
        const pos = DrawingModule.getMousePos(state, e);
        state.pendingTextPosition = { x: pos.x, y: pos.y };
        document.getElementById('textInput').value = '';
        UIModule.showModal('textModal');
        document.getElementById('textInput').focus();
        return;
    }
    
    DrawingModule.startDrawing(state, e, composeLayers);
}

function draw(e) {
    DrawingModule.draw(state, e, composeLayers);
}

function stopDrawing(e) {
    DrawingModule.stopDrawing(state, e, composeLayers, saveState);
    
    // Start selection animation if a selection was created
    if (state && state.selection) {
        startSelectionAnimation();
    }
}

// File Operations - using modules
async function openImage() {
    FileIOModule.openImage(createWorkspace, createLayerObject, globalState, mergeMetadata, updateLayersPanel, updateMetadataTable, composeLayers, saveState);
}

async function handleFileUpload(e) {
    FileIOModule.handleFileUpload(e, createWorkspace, createLayerObject, globalState, mergeMetadata, updateLayersPanel, updateMetadataTable, composeLayers, saveState);
}

async function importAsLayer() {
    FileIOModule.importAsLayer(globalState);
}

async function handleImportLayer(e) {
    FileIOModule.handleImportLayer(e, globalState, createLayer, composeLayers, saveState);
}

async function saveImage() {
    FileIOModule.saveImage();
}

async function applySaveImage() {
    FileIOModule.applySaveImage(state, hasMetadata, cleanMetadataForExport, closeModal);
}

function createNewImage() {
    const modal = document.getElementById('newImageModal');
    modal.classList.add('active');
}

function applyNewImage() {
    const width = parseInt(document.getElementById('newWidth').value);
    const height = parseInt(document.getElementById('newHeight').value);
    const bgColor = document.getElementById('newBgColor').value;
    
    if (width > 0 && height > 0) {
        // Create new workspace
        createWorkspace('New Image', width, height, bgColor);
    }
    
    closeModal('newImageModal');
}

// Transform Operations - using modules
async function resizeLayer() {
    EffectsModule.resizeLayer(state);
}

async function applyResize() {
    EffectsModule.applyResize(state, composeLayers, saveState, closeModal);
}

function rotateLayer() {
    EffectsModule.rotateLayer(state, composeLayers, saveState);
}

function flipLayerHorizontal() {
    EffectsModule.flipLayerHorizontal(state, composeLayers, saveState);
}

function flipLayerVertical() {
    EffectsModule.flipLayerVertical(state, composeLayers, saveState);
}

// Effects - using modules
function applyGrayscale() {
    EffectsModule.applyGrayscale(state, composeLayers, saveState);
}

function applyInvert() {
    EffectsModule.applyInvert(state, composeLayers, saveState);
}

function applySepia() {
    EffectsModule.applySepia(state, composeLayers, saveState);
}

function showEffectModal(effectName, effectFunction) {
    EffectsModule.showEffectModal(effectName, effectFunction);
}

function applyEffect() {
    EffectsModule.applyEffect(state, composeLayers, saveState, closeModal);
}

// History (Undo/Redo) - using modules
function saveState() {
    HistoryModule.saveState(state, updateUI);
}

function undo() {
    HistoryModule.undo(state, updateLayersPanel, composeLayers, updateUI);
}

function redo() {
    HistoryModule.redo(state, updateLayersPanel, composeLayers, updateUI);
}

function restoreState(historyState) {
    HistoryModule.restoreState(state, historyState, updateLayersPanel, composeLayers, updateUI);
}

// UI Updates - using modules
function updateUI() {
    UIModule.updateUI(state);
}

function updatePreviewCanvasSize() {
    UIModule.updatePreviewCanvasSize(state);
}

// Zoom Functions
const ZOOM_FACTOR = 1.2; // Zoom increment/decrement multiplier

function applyZoom() {
    if (!state) return;
    
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvas = state.canvas;
    const previewCanvas = state.previewCanvas;
    
    // Apply zoom transform with center origin
    canvas.style.transform = `scale(${state.zoom})`;
    canvas.style.transformOrigin = 'center';
    if (previewCanvas) {
        previewCanvas.style.transform = `scale(${state.zoom})`;
        previewCanvas.style.transformOrigin = 'center';
    }
    
    // Update zoom level display
    document.getElementById('zoomLevel').textContent = `${Math.round(state.zoom * 100)}%`;
}

function zoomIn() {
    if (!state) return;
    state.zoom = Math.min(state.zoomMax, state.zoom * ZOOM_FACTOR);
    applyZoom();
}

function zoomOut() {
    if (!state) return;
    state.zoom = Math.max(state.zoomMin, state.zoom / ZOOM_FACTOR);
    applyZoom();
}

function resetZoom() {
    if (!state) return;
    state.zoom = 1.0;
    applyZoom();
}

// Selection Functions
function selectAll() {
    if (!state) return;
    SelectionModule.selectAll(state);
    startSelectionAnimation();
}

function deselect() {
    if (!state) return;
    SelectionModule.clearSelection(state);
    stopSelectionAnimation();
    state.previewCtx.clearRect(0, 0, state.previewCanvas.width, state.previewCanvas.height);
}

function deleteSelection() {
    if (!state) return;
    const deleted = SelectionModule.deleteSelection(state, composeLayers, saveState);
    if (deleted) {
        stopSelectionAnimation();
    }
}

function updateToolOptions() {
    if (!state) return;
    
    const brushOptions = document.getElementById('brushOptions');
    const selectionOptions = document.getElementById('selectionOptions');
    const fillOptions = document.getElementById('fillOptions');
    const gradientOptions = document.getElementById('gradientOptions');
    const textOptions = document.getElementById('textOptions');
    const isSelectionTool = ['pointer', 'rectSelect', 'freeformSelect'].includes(state.tool);
    const isBrushTool = ['brush', 'eraser'].includes(state.tool);
    
    if (isBrushTool) {
        brushOptions.style.display = 'block';
    } else {
        brushOptions.style.display = 'none';
    }
    
    if (isSelectionTool) {
        selectionOptions.style.display = 'block';
    } else {
        selectionOptions.style.display = 'none';
    }
    
    if (state.tool === 'fill') {
        fillOptions.style.display = 'block';
    } else {
        fillOptions.style.display = 'none';
    }
    
    if (state.tool === 'gradient') {
        gradientOptions.style.display = 'block';
    } else {
        gradientOptions.style.display = 'none';
    }
    
    if (state.tool === 'text') {
        textOptions.style.display = 'block';
    } else {
        textOptions.style.display = 'none';
    }
}

// Selection animation
let selectionAnimationId = null;

function startSelectionAnimation() {
    if (selectionAnimationId) return; // Already running
    
    function animate(timestamp) {
        if (state && state.selection) {
            SelectionModule.drawSelectionOutline(state, timestamp);
            selectionAnimationId = requestAnimationFrame(animate);
        } else {
            selectionAnimationId = null;
        }
    }
    
    selectionAnimationId = requestAnimationFrame(animate);
}

function stopSelectionAnimation() {
    if (selectionAnimationId) {
        cancelAnimationFrame(selectionAnimationId);
        selectionAnimationId = null;
    }
}

// Metadata Helper Functions
function hasMetadata(metadata) {
    // Check if any metadata field has a non-empty value
    for (const key in metadata) {
        if (key === 'custom') {
            if (metadata.custom && Object.keys(metadata.custom).length > 0) {
                return true;
            }
        } else {
            const value = metadata[key];
            if (value !== null && value !== undefined && value !== '') {
                return true;
            }
        }
    }
    return false;
}

function cleanMetadataForExport(metadata) {
    const cleaned = {};
    
    // Copy non-empty values
    for (const key in metadata) {
        if (key === 'custom') {
            // Handle custom fields separately
            if (metadata.custom && Object.keys(metadata.custom).length > 0) {
                cleaned.custom = { ...metadata.custom };
            }
        } else {
            const value = metadata[key];
            // Only include non-null, non-undefined, non-empty values
            if (value !== null && value !== undefined && value !== '') {
                cleaned[key] = value;
            }
        }
    }
    
    return cleaned;
}

function mergeMetadata(existingMetadata, newMetadata) {
    // Create a merged metadata object, preserving existing structure
    const merged = { ...existingMetadata };
    
    // Merge all fields from newMetadata
    for (const key in newMetadata) {
        if (key === 'custom') {
            // Merge custom fields
            if (newMetadata.custom) {
                merged.custom = {
                    ...(merged.custom || {}),
                    ...newMetadata.custom
                };
            }
        } else if (newMetadata[key] !== null && newMetadata[key] !== undefined && newMetadata[key] !== '') {
            merged[key] = newMetadata[key];
        }
    }
    
    return merged;
}

// Metadata Editor
function updateMetadataTable() {
    const tbody = document.getElementById('metadataTableBody');
    tbody.innerHTML = '';
    
    // Metadata field groups
    const metadataGroups = [
        {
            name: 'Basic Information',
            fields: [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'author', label: 'Author', type: 'text' },
                { key: 'copyright', label: 'Copyright', type: 'text' },
                { key: 'software', label: 'Software', type: 'text' },
                { key: 'userComment', label: 'User Comment', type: 'textarea' },
                { key: 'creationDate', label: 'Creation Date', type: 'datetime' }
            ]
        },
        {
            name: 'GPS Location',
            fields: [
                { key: 'latitude', label: 'Latitude', type: 'number' },
                { key: 'longitude', label: 'Longitude', type: 'number' }
            ]
        },
        {
            name: 'Camera Settings',
            fields: [
                { key: 'cameraMake', label: 'Camera Make', type: 'text' },
                { key: 'cameraModel', label: 'Camera Model', type: 'text' },
                { key: 'lensMake', label: 'Lens Make', type: 'text' },
                { key: 'lensModel', label: 'Lens Model', type: 'text' },
                { key: 'iso', label: 'ISO', type: 'number' },
                { key: 'exposureTime', label: 'Exposure Time (s)', type: 'number' },
                { key: 'fNumber', label: 'F-Number', type: 'number' },
                { key: 'focalLength', label: 'Focal Length (mm)', type: 'number' },
                { key: 'flash', label: 'Flash', type: 'number' },
                { key: 'whiteBalance', label: 'White Balance', type: 'number' },
                { key: 'orientation', label: 'Orientation', type: 'number' }
            ]
        },
        {
            name: 'Technical',
            fields: [
                { key: 'format', label: 'Format', type: 'text', readOnly: true },
                { key: 'compression', label: 'Compression', type: 'text', readOnly: true },
                { key: 'frameCount', label: 'Frame Count', type: 'number', readOnly: true },
                { key: 'bitDepth', label: 'Bit Depth', type: 'number', readOnly: true },
                { key: 'colorType', label: 'Color Type', type: 'text', readOnly: true },
                { key: 'dpiX', label: 'DPI X', type: 'number' },
                { key: 'dpiY', label: 'DPI Y', type: 'number' },
                { key: 'physicalWidth', label: 'Physical Width (in)', type: 'number' },
                { key: 'physicalHeight', label: 'Physical Height (in)', type: 'number' }
            ]
        }
    ];
    
    // Add each group
    metadataGroups.forEach(group => {
        addMetadataGroup(tbody, group.name, group.fields);
    });
    
    // Add custom fields group
    if (state.metadata.custom && Object.keys(state.metadata.custom).length > 0) {
        const customFields = Object.keys(state.metadata.custom).map(key => ({
            key: key,
            label: key,
            type: 'text',
            isCustom: true
        }));
        addMetadataGroup(tbody, 'Custom Fields', customFields);
    }
}

function addMetadataGroup(tbody, groupName, fields) {
    // Add group header row
    const headerRow = document.createElement('tr');
    headerRow.className = 'metadata-group-header';
    const headerCell = document.createElement('td');
    headerCell.colSpan = 2;
    headerCell.textContent = groupName;
    headerRow.appendChild(headerCell);
    tbody.appendChild(headerRow);
    
    // Add fields in this group
    fields.forEach(field => {
        addMetadataRow(tbody, field.key, field.label, field.type, field.isCustom || false, field.readOnly || false);
    });
}

function addMetadataRow(tbody, key, label, type, isCustom, readOnly) {
    const tr = document.createElement('tr');
    
    const tdLabel = document.createElement('td');
    const labelDiv = document.createElement('div');
    labelDiv.className = 'metadata-field-name';
    
    const labelText = document.createElement('span');
    labelText.textContent = label;
    labelDiv.appendChild(labelText);
    
    if (isCustom) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'metadata-delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.title = 'Remove field';
        deleteBtn.addEventListener('click', () => {
            removeCustomMetadataField(key);
        });
        labelDiv.appendChild(deleteBtn);
    }
    
    tdLabel.appendChild(labelDiv);
    
    const tdInput = document.createElement('td');
    let input;
    
    if (type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 2;
    } else {
        input = document.createElement('input');
        if (type === 'number') {
            input.type = 'number';
            input.step = 'any';
        } else if (type === 'datetime') {
            input.type = 'datetime-local';
        } else {
            input.type = 'text';
        }
    }
    
    input.className = 'metadata-input';
    
    // Get value from appropriate location (custom fields are in metadata.custom)
    let value;
    if (isCustom) {
        value = state.metadata.custom?.[key] || '';
    } else {
        value = state.metadata[key];
        // Handle date conversion
        if (type === 'datetime' && value instanceof Date) {
            // Convert Date to datetime-local format
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, '0');
            const day = String(value.getDate()).padStart(2, '0');
            const hours = String(value.getHours()).padStart(2, '0');
            const minutes = String(value.getMinutes()).padStart(2, '0');
            value = `${year}-${month}-${day}T${hours}:${minutes}`;
        } else if (value === null || value === undefined) {
            value = '';
        }
    }
    
    input.value = value;
    input.placeholder = '';
    
    // Set read-only if specified
    if (readOnly) {
        input.readOnly = true;
        input.style.cursor = 'default';
        input.style.backgroundColor = 'transparent';
    }
    
    input.addEventListener('input', (e) => {
        let newValue = e.target.value;
        
        // Convert value based on type
        if (type === 'number') {
            newValue = newValue === '' ? null : parseFloat(newValue);
        } else if (type === 'datetime') {
            newValue = newValue === '' ? null : new Date(newValue);
        }
        
        // Store in appropriate location
        if (isCustom) {
            if (!state.metadata.custom) {
                state.metadata.custom = {};
            }
            state.metadata.custom[key] = newValue;
        } else {
            state.metadata[key] = newValue;
        }
    });
    
    tdInput.appendChild(input);
    
    tr.appendChild(tdLabel);
    tr.appendChild(tdInput);
    tbody.appendChild(tr);
}

function showAddMetadataFieldModal() {
    document.getElementById('newMetadataFieldName').value = '';
    const modal = document.getElementById('addMetadataFieldModal');
    modal.classList.add('active');
}

function applyAddMetadataField() {
    const fieldName = document.getElementById('newMetadataFieldName').value.trim();
    
    if (!fieldName) {
        alert('Please enter a field name');
        return;
    }
    
    // Check if field already exists in standard fields or custom fields
    if (state.metadata.hasOwnProperty(fieldName) || 
        (state.metadata.custom && state.metadata.custom.hasOwnProperty(fieldName))) {
        alert('A field with this name already exists');
        return;
    }
    
    // Initialize custom object if needed
    if (!state.metadata.custom) {
        state.metadata.custom = {};
    }
    
    // Add to custom fields
    state.metadata.custom[fieldName] = '';
    
    updateMetadataTable();
    closeModal('addMetadataFieldModal');
}

function removeCustomMetadataField(fieldName) {
    if (confirm(`Remove field "${fieldName}"?`)) {
        // Remove from custom fields
        if (state.metadata.custom && state.metadata.custom.hasOwnProperty(fieldName)) {
            delete state.metadata.custom[fieldName];
        }
        
        updateMetadataTable();
    }
}

// Panel Section Toggle
// UI Panel Management - using modules
function togglePanelSection(panelName) {
    const header = document.querySelector(`[data-panel="${panelName}"]`);
    if (!header) return;
    
    const section = header.closest('.panel-section');
    section.classList.toggle('collapsed');
    
    // Save state to localStorage
    const isCollapsed = section.classList.contains('collapsed');
    localStorage.setItem(`panel-${panelName}-collapsed`, isCollapsed);
}

function restorePanelStates() {
    UIModule.restorePanelStates();
}

function toggleSidebar(sidebarId) {
    UIModule.toggleSidebar(sidebarId);
}

function restoreUIState() {
    UIModule.restoreUIState();
}

function closeModal(modalId) {
    UIModule.closeModal(modalId);
}
function showLayerDurationModal(layerIndex) {
    state.tempLayerIndex = layerIndex;
    const layer = state.layers[layerIndex];
    document.getElementById('layerDurationInput').value = layer.duration;
    
    const modal = document.getElementById('layerDurationModal');
    modal.classList.add('active');
}

function applyLayerDuration() {
    const duration = parseInt(document.getElementById('layerDurationInput').value);
    if (duration >= MIN_LAYER_DURATION) {
        state.layers[state.tempLayerIndex].duration = duration;
        updateLayersPanel();
        saveState();
    }
    closeModal('layerDurationModal');
}

// Layer Opacity Editor
function showLayerOpacityModal(layerIndex) {
    state.tempLayerIndex = layerIndex;
    const layer = state.layers[layerIndex];
    const opacityPercent = Math.round(layer.opacity * 100);
    document.getElementById('layerOpacityInput').value = opacityPercent;
    document.getElementById('layerOpacityValue').textContent = opacityPercent;
    
    const modal = document.getElementById('layerOpacityModal');
    modal.classList.add('active');
}

function applyLayerOpacity() {
    const opacityPercent = parseInt(document.getElementById('layerOpacityInput').value);
    state.layers[state.tempLayerIndex].opacity = opacityPercent / 100;
    updateLayersPanel();
    composeLayers();
    saveState();
    closeModal('layerOpacityModal');
}

// Image Dimensions Editor
function showImageDimensionsModal() {
    document.getElementById('imageDimWidth').value = state.canvas.width;
    document.getElementById('imageDimHeight').value = state.canvas.height;
    document.getElementById('scaleAllLayers').checked = false;
    
    const modal = document.getElementById('imageDimensionsModal');
    modal.classList.add('active');
}

function applyImageDimensions() {
    const newWidth = parseInt(document.getElementById('imageDimWidth').value);
    const newHeight = parseInt(document.getElementById('imageDimHeight').value);
    const scaleAllLayers = document.getElementById('scaleAllLayers').checked;
    
    if (newWidth > 0 && newHeight > 0) {
        const oldWidth = state.canvas.width;
        const oldHeight = state.canvas.height;
        
        state.canvas.width = newWidth;
        state.canvas.height = newHeight;
        
        if (scaleAllLayers) {
            // Scale all layers proportionally
            state.layers.forEach(layer => {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = oldWidth;
                tempCanvas.height = oldHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(layer.canvas, 0, 0);
                
                layer.canvas.width = newWidth;
                layer.canvas.height = newHeight;
                layer.ctx.clearRect(0, 0, newWidth, newHeight);
                layer.ctx.drawImage(tempCanvas, 0, 0, oldWidth, oldHeight, 0, 0, newWidth, newHeight);
            });
        } else {
            // Just resize canvases without scaling content
            state.layers.forEach(layer => {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = oldWidth;
                tempCanvas.height = oldHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(layer.canvas, 0, 0);
                
                layer.canvas.width = newWidth;
                layer.canvas.height = newHeight;
                layer.ctx.clearRect(0, 0, newWidth, newHeight);
                layer.ctx.drawImage(tempCanvas, 0, 0);
            });
        }
        
        updatePreviewCanvasSize();
        composeLayers();
        saveState();
    }
    
    closeModal('imageDimensionsModal');
}

// Collapsible Sidebar Functions
// Event Listeners
function setupEventListeners() {
    // Canvas events - will be bound to the current state
    const canvas = document.getElementById('mainCanvas');
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Start screen buttons
    document.getElementById('startNewBtn').addEventListener('click', createNewImage);
    document.getElementById('startOpenBtn').addEventListener('click', openImage);
    
    // File operations
    document.getElementById('newBtn').addEventListener('click', createNewImage);
    document.getElementById('openBtn').addEventListener('click', openImage);
    document.getElementById('importLayerBtn').addEventListener('click', importAsLayer);
    document.getElementById('saveBtn').addEventListener('click', saveImage);
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('importLayerInput').addEventListener('change', handleImportLayer);
    
    // Undo/Redo
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);
    
    // Zoom controls
    document.getElementById('zoomInBtn').addEventListener('click', zoomIn);
    document.getElementById('zoomOutBtn').addEventListener('click', zoomOut);
    document.getElementById('zoomResetBtn').addEventListener('click', resetZoom);
    
    // Text tool modal
    document.getElementById('applyTextBtn').addEventListener('click', () => {
        if (!state) return;
        const text = document.getElementById('textInput').value.trim();
        if (text && state.pendingTextPosition) {
            DrawingModule.renderText(state, text, state.pendingTextPosition.x, state.pendingTextPosition.y, composeLayers, saveState);
        }
        closeModal('textModal');
        state.pendingTextPosition = null;
    });
    
    document.getElementById('cancelTextBtn').addEventListener('click', () => {
        if (!state) return;
        closeModal('textModal');
        state.pendingTextPosition = null;
    });
    
    // Tools
    document.querySelectorAll('[data-tool]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-tool]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            state.tool = this.dataset.tool;
            updateToolOptions();
        });
    });
    
    // Tool options
    document.getElementById('selectAllBtn').addEventListener('click', selectAll);
    document.getElementById('deselectBtn').addEventListener('click', deselect);
    
    // Color pickers
    document.getElementById('foregroundColor').addEventListener('change', (e) => {
        state.foregroundColor = e.target.value;
    });
    
    document.getElementById('backgroundColor').addEventListener('change', (e) => {
        state.backgroundColor = e.target.value;
    });
    
    // Brush settings
    document.getElementById('brushSize').addEventListener('input', (e) => {
        state.brushSize = parseInt(e.target.value);
        document.getElementById('brushSizeValue').textContent = state.brushSize;
    });
    
    document.getElementById('opacity').addEventListener('input', (e) => {
        state.opacity = parseInt(e.target.value) / 100;
        document.getElementById('opacityValue').textContent = e.target.value;
    });
    
    // Fill tool settings
    document.getElementById('fillTolerance').addEventListener('input', (e) => {
        state.fillTolerance = parseInt(e.target.value);
        document.getElementById('fillToleranceValue').textContent = state.fillTolerance;
    });
    
    // Gradient tool settings
    document.getElementById('gradientType').addEventListener('change', (e) => {
        state.gradientType = e.target.value;
    });
    
    // Text tool settings
    document.getElementById('fontSize').addEventListener('input', (e) => {
        state.fontSize = parseInt(e.target.value);
        document.getElementById('fontSizeValue').textContent = state.fontSize;
    });
    
    document.getElementById('fontFamily').addEventListener('change', (e) => {
        state.fontFamily = e.target.value;
    });
    
    // Layer controls
    document.getElementById('addLayerBtn').addEventListener('click', () => {
        createLayer();
        saveState();
    });
    
    document.getElementById('mergeLayersBtn').addEventListener('click', () => {
        if (state.activeLayerIndex > 0) {
            const activeLayer = state.layers[state.activeLayerIndex];
            const belowLayer = state.layers[state.activeLayerIndex - 1];
            
            // Draw active layer onto layer below
            belowLayer.ctx.globalAlpha = activeLayer.opacity;
            belowLayer.ctx.drawImage(activeLayer.canvas, 0, 0);
            belowLayer.ctx.globalAlpha = 1.0;
            
            // Delete active layer
            deleteLayer(state.activeLayerIndex);
        }
    });
    
    // Transforms
    document.getElementById('resizeBtn').addEventListener('click', resizeLayer);
    document.getElementById('rotateBtn').addEventListener('click', rotateLayer);
    document.getElementById('flipHBtn').addEventListener('click', flipLayerHorizontal);
    document.getElementById('flipVBtn').addEventListener('click', flipLayerVertical);
    
    // Effects
    document.getElementById('grayscaleBtn').addEventListener('click', applyGrayscale);
    document.getElementById('sepiaBtn').addEventListener('click', applySepia);
    document.getElementById('invertBtn').addEventListener('click', applyInvert);
    document.getElementById('brightnessBtn').addEventListener('click', () => {
        showEffectModal('Brightness', 'brightness');
    });
    document.getElementById('contrastBtn').addEventListener('click', () => {
        showEffectModal('Contrast', 'contrast');
    });
    document.getElementById('exposureBtn').addEventListener('click', () => {
        showEffectModal('Exposure', 'exposure');
    });
    document.getElementById('saturationBtn').addEventListener('click', () => {
        showEffectModal('Saturation', 'saturation');
    });
    document.getElementById('hueBtn').addEventListener('click', () => {
        showEffectModal('Hue', 'hue');
    });
    document.getElementById('blurBtn').addEventListener('click', () => {
        showEffectModal('Blur', 'blur');
    });
    document.getElementById('gaussianBlurBtn').addEventListener('click', () => {
        showEffectModal('Gaussian Blur', 'gaussianBlur');
    });
    document.getElementById('medianFilterBtn').addEventListener('click', () => {
        showEffectModal('Median Filter', 'medianFilter');
    });
    document.getElementById('sharpenBtn').addEventListener('click', () => {
        showEffectModal('Sharpen', 'sharpen');
    });
    
    // Modal buttons
    document.getElementById('createNewBtn').addEventListener('click', applyNewImage);
    document.getElementById('cancelNewBtn').addEventListener('click', () => closeModal('newImageModal'));
    
    document.getElementById('applyResizeBtn').addEventListener('click', applyResize);
    document.getElementById('cancelResizeBtn').addEventListener('click', () => closeModal('resizeModal'));
    
    document.getElementById('applyEffectBtn').addEventListener('click', applyEffect);
    document.getElementById('cancelEffectBtn').addEventListener('click', () => closeModal('effectModal'));
    
    // Effect slider update
    document.getElementById('effectSlider').addEventListener('input', (e) => {
        document.getElementById('effectValue').textContent = e.target.value;
    });
    
    // Save modal controls
    document.getElementById('saveFormat').addEventListener('change', (e) => {
        const format = e.target.value;
        const qualityLabel = document.getElementById('qualityLabel');
        const tiffOptions = document.getElementById('tiffOptions');
        
        // Show quality slider for JPEG, WebP, HEIC, and AVIF
        if (format === 'jpeg' || format === 'webp' || format === 'heic' || format === 'avif') {
            qualityLabel.style.display = 'block';
        } else {
            qualityLabel.style.display = 'none';
        }
        
        // Show TIFF options for TIFF format
        if (format === 'tiff') {
            tiffOptions.style.display = 'block';
        } else {
            tiffOptions.style.display = 'none';
        }
    });
    
    document.getElementById('saveQuality').addEventListener('input', (e) => {
        document.getElementById('qualityValue').textContent = e.target.value;
    });
    
    document.getElementById('applySaveBtn').addEventListener('click', applySaveImage);
    document.getElementById('cancelSaveBtn').addEventListener('click', () => closeModal('saveModal'));
    
    // Metadata modal controls
    document.getElementById('addMetadataFieldBtn').addEventListener('click', showAddMetadataFieldModal);
    document.getElementById('applyAddMetadataFieldBtn').addEventListener('click', applyAddMetadataField);
    document.getElementById('cancelAddMetadataFieldBtn').addEventListener('click', () => closeModal('addMetadataFieldModal'));
    
    // Panel section toggles
    document.querySelectorAll('.panel-header').forEach(header => {
        header.addEventListener('click', () => {
            const panelName = header.dataset.panel;
            togglePanelSection(panelName);
        });
    });
    
    // Layer duration modal controls
    document.getElementById('applyLayerDurationBtn').addEventListener('click', applyLayerDuration);
    document.getElementById('cancelLayerDurationBtn').addEventListener('click', () => closeModal('layerDurationModal'));
    
    // Layer opacity modal controls
    document.getElementById('layerOpacityInput').addEventListener('input', (e) => {
        document.getElementById('layerOpacityValue').textContent = e.target.value;
    });
    document.getElementById('applyLayerOpacityBtn').addEventListener('click', applyLayerOpacity);
    document.getElementById('cancelLayerOpacityBtn').addEventListener('click', () => closeModal('layerOpacityModal'));
    
    // Image dimensions modal controls
    document.getElementById('imageDimensionsBtn').addEventListener('click', showImageDimensionsModal);
    document.getElementById('applyImageDimensionsBtn').addEventListener('click', applyImageDimensions);
    document.getElementById('cancelImageDimensionsBtn').addEventListener('click', () => closeModal('imageDimensionsModal'));
    
    // Collapsible sidebar controls
    document.getElementById('leftCollapseToggle').addEventListener('click', () => {
        toggleSidebar('leftSidebar');
    });
    
    document.getElementById('rightCollapseToggle').addEventListener('click', () => {
        toggleSidebar('rightSidebar');
    });
    
    // Resize width/height linking
    const resizeWidth = document.getElementById('resizeWidth');
    const resizeHeight = document.getElementById('resizeHeight');
    const maintainAspect = document.getElementById('maintainAspect');
    let aspectRatio = 1;
    
    resizeWidth.addEventListener('focus', () => {
        if (maintainAspect.checked) {
            aspectRatio = resizeWidth.value / resizeHeight.value;
        }
    });
    
    resizeWidth.addEventListener('input', () => {
        if (maintainAspect.checked) {
            resizeHeight.value = Math.round(resizeWidth.value / aspectRatio);
        }
    });
    
    resizeHeight.addEventListener('input', () => {
        if (maintainAspect.checked) {
            resizeWidth.value = Math.round(resizeHeight.value * aspectRatio);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        redo();
                    } else {
                        undo();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    redo();
                    break;
                case 's':
                    e.preventDefault();
                    saveImage();
                    break;
                case 'o':
                    e.preventDefault();
                    openImage();
                    break;
                case 'a':
                    e.preventDefault();
                    selectAll();
                    break;
            }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (state && state.selection) {
                e.preventDefault();
                deleteSelection();
            }
        }
    });
}

// Start the application
init();
