function onload_setup() {
    if (document.documentElement.hasAttribute("manifest")) {
        add_cache_event_toasts();
    }

    //  Cargar favoritos solo si están vacíos o mal formateados
    try {
        let raw = localStorage.getItem("redirector_pinned");
        let parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].url) {
            throw new Error("formato incorrecto");
        }
    } catch (e) {
        localStorage.setItem("redirector_pinned", JSON.stringify(default_pinned_websites));
    }

    create_redirector_buttons();

    document.documentElement.style.overflowX = 'hidden';
    let redirector = document.getElementById("redirector-view");
    let center_view = document.getElementById("center-view");

    let isTransitionInProgress = false;

    center_view.style.transition = "left 0.4s ease, opacity 0.25s ease";
    center_view.style.pointerEvents = "auto";
    center_view.style.opacity = "1";
    redirector.style.pointerEvents = "none";
    redirector.style.opacity = "0";

    window.addEventListener('keydown', function (event) {
        if (event.keyCode == 51 || event.keyCode == 118) {
            if (isTransitionInProgress || window.jb_in_progress || window.jb_started) {
                return;
            }
            isTransitionInProgress = true;
            if (redirector.style.left == "-100%") {
                redirector.style.left = "-30%";
                setTimeout(() => {
                    redirector.style.transition = "left 0.4s ease, opacity 0.25s ease";
                    center_view.style.pointerEvents = "none";
                    center_view.style.opacity = "0";
                    redirector.style.pointerEvents = "auto";
                    redirector.style.opacity = "1";
                    redirector.style.left = "0";
                    center_view.style.left = "30%";
                    setTimeout(() => {
                        center_view.style.transition = "none";
                        center_view.style.left = "100%";
                        isTransitionInProgress = false;
                    }, 420);
                }, 10);
            } else {
                center_view.style.left = "30%";
                setTimeout(() => {
                    center_view.style.transition = "left 0.4s ease, opacity 0.25s ease";
                    center_view.style.pointerEvents = "auto";
                    center_view.style.opacity = "1";
                    redirector.style.pointerEvents = "none";
                    redirector.style.opacity = "0";
                    redirector.style.left = "-30%";
                    center_view.style.left = "0";
                    setTimeout(() => {
                        redirector.style.transition = "none";
                        redirector.style.left = "-100%";
                        isTransitionInProgress = false;
                    }, 420);
                }, 10);
            }
        }
    });

    create_redirector_buttons();
}

function redirectorGo() {
    let redirector_input = document.getElementById("redirector-input");
    let redirector_input_value = redirector_input.value;
    if (redirector_input_value == "" || redirector_input_value == "https://") {
        showToast("Enter a valid URL.");
        return;
    }

    let redirector_history_store_raw = localStorage.getItem("redirector_history");

    if (redirector_history_store_raw == null) {
        localStorage.setItem("redirector_history", JSON.stringify([redirector_input_value]));
    } else {
        let redirector_history_store = JSON.parse(redirector_history_store_raw);
        redirector_history_store.unshift(redirector_input_value);
        localStorage.setItem("redirector_history", JSON.stringify(redirector_history_store));
    }

    window.location = redirector_input_value;
}

const default_pinned_websites = [
    { url: "https://ps5xploit.github.io/umtx/", label: "1.xx - 5.xx" },
    { url: "https://ps5xploit.github.io/lite/", label: "3.xx - 4.xx" },
    { url: "https://ps5shopappkg.pages.dev", label: "Shop Appkg" }
];

function create_redirector_buttons() {
    let redirector_pinned_store_raw = localStorage.getItem("redirector_pinned");

    if (redirector_pinned_store_raw == null) {
        localStorage.setItem("redirector_pinned", JSON.stringify(default_pinned_websites));
        redirector_pinned_store_raw = localStorage.getItem("redirector_pinned");
    }

    let redirector_pinned_store = JSON.parse(redirector_pinned_store_raw).map(entry => {
        if (typeof entry === "string") {
            return { url: entry, label: entry };
        }
        return entry;
    });

    const redirector_pinned = document.getElementById("redirector-pinned");
    redirector_pinned.innerHTML = "";

    let pinned_text = document.createElement("p");
    pinned_text.innerHTML = "Favorites";
    pinned_text.style.textAlign = "center";
    redirector_pinned.appendChild(pinned_text);

    for (let i = 0; i < redirector_pinned_store.length; i++) {
        let div = document.createElement("div");
        div.style.display = "flex";

        let a1 = document.createElement("a");
        a1.className = "btn small-btn";
        a1.tabIndex = "0";
        a1.innerHTML = `${redirector_pinned_store[i].url} <span style="color: #aaa; margin-left: 6px;">(${redirector_pinned_store[i].label})</span>`;
        a1.title = redirector_pinned_store[i].url;
        a1.onclick = () => {
            window.location = redirector_pinned_store[i].url;
        };
        div.appendChild(a1);

        let a2 = document.createElement("a");
        a2.className = "btn icon-btn";
        a2.tabIndex = "0";
        a2.innerHTML = '<svg width="24px" height="24px" fill="#ddd"><use href="#delete-icon" /></svg>';
        a2.onclick = () => {
            let pinned_raw = localStorage.getItem("redirector_pinned");
            let pinned = JSON.parse(pinned_raw);
            pinned.splice(i, 1);
            localStorage.setItem("redirector_pinned", JSON.stringify(pinned));
            create_redirector_buttons();
        };
        div.appendChild(a2);

        redirector_pinned.appendChild(div);
    }

    let redirector_history_store_raw = localStorage.getItem("redirector_history");
    if (redirector_history_store_raw == null) {
        localStorage.setItem("redirector_history", JSON.stringify([]));
        redirector_history_store_raw = localStorage.getItem("redirector_history");
    }

    let redirector_history_store = JSON.parse(redirector_history_store_raw);
    let redirector_history = document.getElementById("redirector-history");
    redirector_history.innerHTML = "";

    let history_text = document.createElement("p");
    history_text.innerHTML = "History";
    history_text.style.textAlign = "center";
    redirector_history.appendChild(history_text);

    for (let i = 0; i < redirector_history_store.length; i++) {
        let div = document.createElement("div");
        div.style.display = "flex";

        let a1 = document.createElement("a");
        a1.className = "btn small-btn";
        a1.tabIndex = "0";
        a1.innerHTML = redirector_history_store[i];
        a1.onclick = () => {
            window.location = redirector_history_store[i];
        };
        div.appendChild(a1);

        let a2 = document.createElement("a");
        a2.className = "btn icon-btn";
        a2.tabIndex = "0";
        a2.innerHTML = "&#9733;";
        a2.onclick = () => {
            let pinned_raw = localStorage.getItem("redirector_pinned");
            let pinned = JSON.parse(pinned_raw);
            pinned.unshift({
                url: redirector_history_store[i],
                label: redirector_history_store[i]
            });
            localStorage.setItem("redirector_pinned", JSON.stringify(pinned));
            create_redirector_buttons();
        };
        div.appendChild(a2);

        let a3 = document.createElement("a");
        a3.className = "btn icon-btn";
        a3.tabIndex = "0";
        a3.innerHTML = '<svg width="24px" height="24px" fill="#ddd"><use href="#delete-icon" /></svg>';
        a3.onclick = () => {
            let history_raw = localStorage.getItem("redirector_history");
            let history = JSON.parse(history_raw);
            history.splice(i, 1);
            localStorage.setItem("redirector_history", JSON.stringify(history));
            create_redirector_buttons();
        };
        div.appendChild(a3);

        redirector_history.appendChild(div);
    }
}

async function switch_to_post_jb_view() {
    document.getElementById("run-jb-parent").style.display = "none";
    document.getElementById("jb-progress").style.opacity = "0";
    await sleep(1000);
    document.getElementById("jb-progress").style.display = "none";

    document.getElementById("post-jb-view").style.opacity = "0";
    document.getElementById("post-jb-view").classList.add("opacity-transition");
    document.getElementById("post-jb-view").style.display = "flex";
    document.getElementById("post-jb-view").style.opacity = "1";

    document.getElementById("credits").style.opacity = "0";
    document.getElementById("credits").style.display = "none";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);
    toast.offsetHeight;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, 2000);
}




