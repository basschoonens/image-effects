async function init() {
    const input = document.getElementById('upload');

    const fileReader = new FileReader();

    let rustApp = null;

    try {
        rustApp = (await import('../pkg'))
    } catch (e) {
        console.error(e);
        return;
    }

    fileReader.onload = () => {
        const base64 = fileReader.result.replace(
            /^data:(image\/png|image\/jpeg);base64,/,
            ''
        );

        const imgDataURL = rustApp.grayscale(base64);
        document.getElementById('new-img').setAttribute('src', imgDataURL);
    }

    input.addEventListener('change', () => {
        fileReader.readAsDataURL(input.files[0]);
    });
}

init();