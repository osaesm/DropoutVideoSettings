function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function CheckVolume() {
    console.log("Starting...");
    await sleep(5000);

    // Checking the current volume
    const volume = document.querySelector('div.volume').getAttribute('aria-valuenow');

    // Accessing the captions
    const captionModule = document.querySelector('div[aria-label="CC/Subtitles"]');
    const captionSelection = captionModule.querySelector('div[aria-checked="true"]');
    let captionLanguage = "Off";
    if (captionSelection.getAttribute('data-id') !== 'off') {
        captionLanguage = captionSelection.textContent.trim();
        // TODO: Figure out caption settings if captions are turned on
        // Problem: I can't access the caption options without messing up captionModule
        // captionModule
        // 'aria-label'
        // 'aria-labelledby'
    }

    // Checking resolution
    const settingsModule = document.querySelector('div[aria-label="Settings"]');
    const resolution = settingsModule.querySelector('div[aria-checked="true"]');

    console.log(`Volume: ${volume}`);
    console.log(captionModule);
    const spans = captionModule.querySelectorAll('span');
    // Get caption custom settings
    for (const span of spans) {
        // Find the custom settings tab and click
        if (span.textContent.trim() === "Customize") {
            await simulateClick(span);
            // Now investigate each custom setting
            const spanResults = captionModule.querySelectorAll('span');
            const [ fontPage, backgroundPage, windowPage, resetButton ] = [spanResults[0], spanResults[1], spanResults[2], spanResults[3]];
            // First setting page is font settings
            await simulateClick(fontPage);
            const familyDiv = captionModule.querySelector('div[aria-label="Family"]');
            const fontChoice = familyDiv.querySelector('div[aria-checked="true"]').textContent.trim();

            const colorChoices = captionModule.querySelector('ul[aria-labelledby="vp-cc-font-color-label"]');
            const fontColor = colorChoices.querySelector('li[aria-checked="true"]').getAttribute('aria-label');

            const sizeChoices = captionModule.querySelector('ul[aria-labelledby="vp-cc-font-size-label"]');
            const fontSize = sizeChoices.querySelector('li[aria-checked="true"]').textContent;

            const opacities = captionModule.querySelector('ul[aria-labelledby="vp-cc-font-opacity-label"]');
            const fontOpacity = opacities.querySelector('li[aria-checked="true"]').textContent;

            const edgeDiv = captionModule.querySelector('div[aria-label="Edge style"]');
            const edgeChoice = edgeDiv.querySelector('div[aria-checked="true"]').textContent.trim();

            console.log(`Font Family: ${fontChoice}`);
            console.log(`Font Color: ${fontColor}`);
            console.log(`Font Size: ${fontSize}`);
            console.log(`Font Opacity: ${fontOpacity}`);
            console.log(`Font Edge: ${edgeChoice}`);
            console.log(captionModule);
            // await simulateClick(backgroundPage);
            // console.log(captionModule);
            // await simulateClick(windowPage);
            // console.log(captionModule);
            // console.log(resetButton);
        }
    }
    console.log(`Caption Language: ${captionLanguage}`);
    console.log(`Resolution: ${resolution}`);
}

async function simulateClick(element) {
    return Promise.all([element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })),
    element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true })),
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))]);
}

function initExtension() {
    CheckVolume();
}

// Ask parent page for confirmation
window.parent.postMessage('EXTENSION_CHECK_REQUEST', '*');

window.addEventListener('message', async (event) => {
    if (event.data === 'EXTENSION_CHECK_RESPONSE') {
        initExtension();  // Run only after confirmation
    }
});