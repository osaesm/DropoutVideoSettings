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
    // console.log(captionModule);
    console.log(`Caption Language: ${captionLanguage}`);
    console.log(`Resolution: ${resolution}`);
}

CheckVolume();