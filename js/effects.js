// Effects and transforms module
import { Image } from './constants.js';

export async function resizeLayer(state) {
    const layer = state.layers[state.activeLayerIndex];
    document.getElementById('resizeWidth').value = layer.canvas.width;
    document.getElementById('resizeHeight').value = layer.canvas.height;
    
    const modal = document.getElementById('resizeModal');
    modal.classList.add('active');
}

export async function applyResize(state, composeLayers, saveState, closeModal) {
    const width = parseInt(document.getElementById('resizeWidth').value);
    const height = parseInt(document.getElementById('resizeHeight').value);
    
    if (width > 0 && height > 0) {
        const layer = state.layers[state.activeLayerIndex];
        
        try {
            // Get current layer data
            const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
            
            // Create Image instance
            const image = Image.fromRGBA(
                layer.canvas.width,
                layer.canvas.height,
                new Uint8Array(imageData.data)
            );
            
            // Resize using cross-image
            image.resize({ width, height });
            
            // Update layer canvas
            layer.canvas.width = width;
            layer.canvas.height = height;
            
            const resizedImageData = new ImageData(
                new Uint8ClampedArray(image.data),
                width,
                height
            );
            layer.ctx.putImageData(resizedImageData, 0, 0);
            
            composeLayers();
            saveState();
        } catch (error) {
            console.error('Error resizing:', error);
            alert('Error resizing layer: ' + error.message);
        }
    }
    
    closeModal('resizeModal');
}

export async function rotateLayer(state, composeLayers, saveState) {
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        // Get current layer data
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Use cross-image's built-in rotate90 method
        image.rotate90();
        
        // Update layer canvas dimensions (width and height swap for 90° rotation)
        layer.canvas.width = image.width;
        layer.canvas.height = image.height;
        
        // Put rotated image data back
        const rotatedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(rotatedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error rotating layer:', error);
        alert('Error rotating layer: ' + error.message);
    }
}

export async function flipLayerHorizontal(state, composeLayers, saveState) {
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        // Get current layer data
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Use cross-image's built-in flipHorizontal method
        image.flipHorizontal();
        
        // Put flipped image data back
        const flippedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(flippedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error flipping layer horizontally:', error);
        alert('Error flipping layer horizontally: ' + error.message);
    }
}

export async function flipLayerVertical(state, composeLayers, saveState) {
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        // Get current layer data
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Use cross-image's built-in flipVertical method
        image.flipVertical();
        
        // Put flipped image data back
        const flippedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(flippedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error flipping layer vertically:', error);
        alert('Error flipping layer vertically: ' + error.message);
    }
}

export async function applyGrayscale(state, composeLayers, saveState) {
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Use cross-image's grayscale method
        image.grayscale();
        
        // Put processed image data back
        const processedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(processedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error applying grayscale:', error);
        alert('Error applying grayscale: ' + error.message);
    }
}

export async function applyInvert(state, composeLayers, saveState) {
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Use cross-image's invert method
        image.invert();
        
        // Put processed image data back
        const processedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(processedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error applying invert:', error);
        alert('Error applying invert: ' + error.message);
    }
}

export async function applySepia(state, composeLayers, saveState) {
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Use cross-image's sepia method
        image.sepia();
        
        // Put processed image data back
        const processedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(processedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error applying sepia:', error);
        alert('Error applying sepia: ' + error.message);
    }
}

export function showEffectModal(effectName, effectFunction) {
    const modal = document.getElementById('effectModal');
    const title = document.getElementById('effectTitle');
    const slider = document.getElementById('effectSlider');
    const valueDisplay = document.getElementById('effectValue');
    
    title.textContent = effectName;
    slider.value = 50;
    valueDisplay.textContent = '50';
    
    modal.classList.add('active');
    
    // Store effect function for apply button
    modal.dataset.effectFunction = effectFunction;
}

export async function applyEffect(state, composeLayers, saveState, closeModal) {
    const modal = document.getElementById('effectModal');
    const slider = document.getElementById('effectSlider');
    const value = parseInt(slider.value);
    const effectName = modal.dataset.effectFunction;
    
    const layer = state.layers[state.activeLayerIndex];
    
    try {
        const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
        
        // Create Image instance
        const image = Image.fromRGBA(
            layer.canvas.width,
            layer.canvas.height,
            new Uint8Array(imageData.data)
        );
        
        // Apply the selected effect using cross-image methods
        switch (effectName) {
            case 'brightness':
                // Range: -1 to 1, slider: 0-100, center at 50
                const brightnessAmount = (value - 50) / 50;
                image.brightness(brightnessAmount);
                break;
                
            case 'contrast':
                // Range: -1 to 1, slider: 0-100, center at 50
                const contrastAmount = (value - 50) / 50;
                image.contrast(contrastAmount);
                break;
                
            case 'blur':
                // Radius: 1-10 based on slider value
                const blurRadius = Math.max(1, Math.floor(value / 10));
                image.blur(blurRadius);
                break;
                
            case 'gaussianBlur':
                // Radius: 1-10 based on slider value
                const gaussianRadius = Math.max(1, Math.floor(value / 10));
                image.gaussianBlur(gaussianRadius);
                break;
                
            case 'medianFilter':
                // Radius: 1-5 based on slider value
                const medianRadius = Math.max(1, Math.floor(value / 20));
                image.medianFilter(medianRadius);
                break;
                
            case 'sharpen':
                // Amount: 0 to 1, slider: 0-100
                const sharpenAmount = value / 100;
                image.sharpen(sharpenAmount);
                break;
                
            case 'saturation':
                // Range: -1 to 1, slider: 0-100, center at 50
                const saturationAmount = (value - 50) / 50;
                image.saturation(saturationAmount);
                break;
                
            case 'hue':
                // Degrees: -180 to 180, slider: 0-100, center at 50
                const hueRotation = (value - 50) * 3.6;
                image.hue(hueRotation);
                break;
                
            case 'exposure':
                // Range: -1 to 1, slider: 0-100, center at 50
                const exposureAmount = (value - 50) / 50;
                image.exposure(exposureAmount);
                break;
        }
        
        // Put processed image data back
        const processedImageData = new ImageData(
            new Uint8ClampedArray(image.data),
            image.width,
            image.height
        );
        layer.ctx.putImageData(processedImageData, 0, 0);
        
        composeLayers();
        saveState();
    } catch (error) {
        console.error('Error applying effect:', error);
        alert('Error applying effect: ' + error.message);
    }
    
    closeModal('effectModal');
}

