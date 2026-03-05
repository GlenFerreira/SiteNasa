document.addEventListener('DOMContentLoaded', () => {
    const discoverBtn = document.getElementById('discover-btn');
    const birthDateInput = document.getElementById('birth-date');
    const resultContainer = document.getElementById('result-container');
    const mediaContent = document.getElementById('media-content');
    const apodTitle = document.getElementById('apod-title');
    const apodExplanation = document.getElementById('apod-explanation');
    const apodCopyright = document.getElementById('apod-copyright');
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('error-msg');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.setAttribute('max', today);

    discoverBtn.addEventListener('click', async () => {
        const date = birthDateInput.value;
        if (!date) {
            showError('Please select a valid date.');
            return;
        }

        resetUI();
        loader.classList.remove('hidden');

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/apod?date=${date}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch the cosmos.');
            }

            const data = await response.json();
            displayResult(data);
        } catch (error) {
            showError(error.message);
        } finally {
            loader.classList.add('hidden');
        }
    });

    function displayResult(data) {
        // Clear previous content
        mediaContent.innerHTML = '';

        // Handle Image vs Video (YouTube)
        if (data.media_type === 'image') {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            mediaContent.appendChild(img);
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            mediaContent.appendChild(iframe);
        }

        apodTitle.textContent = data.title;
        apodExplanation.textContent = data.explanation;
        apodCopyright.textContent = data.copyright ? `© ${data.copyright}` : '';

        resultContainer.classList.remove('hidden');
    }

    function showError(msg) {
        resetUI();
        errorMsg.textContent = msg;
        errorMsg.classList.remove('hidden');
    }

    function resetUI() {
        resultContainer.classList.add('hidden');
        errorMsg.classList.add('hidden');
        loader.classList.add('hidden');
    }
});
