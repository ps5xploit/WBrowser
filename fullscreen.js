// Pantalla completa del navegador de la PS5 con los payloads de owendswang:
// https://github.com/owendswang/ps5-web-browser-fullscreen (GPL-3.0-or-later)
// Los ELF están en la carpeta fullscreen/ y se envían a websrv (Homebrew Launcher),
// que los ejecuta. El cambio se ve al cerrar y volver a abrir el navegador.

const WEBSRV_ELFLDR = "http://127.0.0.1:8080/elfldr";

let browser_payload_in_progress = false;

async function send_browser_payload(elf_path) {
    if (browser_payload_in_progress) {
        return;
    }
    browser_payload_in_progress = true;
    showToast("Sending payload...");

    let step = "ELF";
    try {
        let elf = await fetch(elf_path);
        if (!elf.ok) {
            throw new Error("HTTP " + elf.status);
        }

        // Mismo formato que la página /elfldr de websrv
        let form = new FormData();
        form.append("elf", await elf.blob(), elf_path.split("/").pop());

        step = "websrv";
        let response = await fetch(WEBSRV_ELFLDR, { method: "POST", body: form });
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        // El payload avisa el resultado con una notificación del sistema
        showToast("Payload sent.");
        setTimeout(() => showToast("Close and reopen the browser."), 2500);
    } catch (e) {
        if (step == "websrv" && e instanceof TypeError) {
            showToast("Start the Homebrew Launcher (websrv) first.");
        } else {
            showToast("Error (" + step + "): " + e.message);
        }
    } finally {
        browser_payload_in_progress = false;
    }
}

function browser_fullscreen() {
    send_browser_payload("fullscreen/web-browser-fullscreen.elf");
}

function browser_restore() {
    send_browser_payload("fullscreen/web-browser-restore.elf");
}
