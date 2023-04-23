mixpanel.init("0089702639df9b9a90475a33b0f12c88");

// Sections
function reportOpen(section) {
    mixpanel.track("Section opened", {
        "Section": section,
    });
}

const opened = new Set();
const divs = document.querySelectorAll(".content>div");
const divPlayers = new Map();
let playerId = 0;
const withYtApi = [];
for (const div of divs) {
    // Selection of sections
    div.addEventListener("click", async (e) => {
        div.classList.add("selected");

        if (!opened.has(div)) {
            opened.add(div);
            reportOpen(div.id);
        }
    });

    // Unique IDs for each video
    const videos = div.querySelectorAll(".video>iframe");
    const players = [];
    for (const video of videos) {
        video.id = playerId++;
        players.push(video);
    }
    divPlayers.set(div, players);

    // Collapsing of sections
    const collapse = div.querySelector(".collapse");
    collapse.addEventListener("click", (e) => {
        e.stopPropagation();
        div.classList.remove("selected");
    });

    // Pausing of videos when collapsing
    withYtApi.push(() => {
        const players = divPlayers.get(div)
            .map((id) => new YT.Player(id, {}));
        collapse.addEventListener("click", () =>
            players.forEach(p => p.pauseVideo())
        );
    });
}
function onYouTubeIframeAPIReady() {
    withYtApi.forEach(f => f());
}



// Letting CSS know the device pixel ratio
//
// Used for slight blurring of the text
const body = document.querySelector("body");
const windowResizeObserver = new ResizeObserver(() => {
    body.style.setProperty("--dpr", window.devicePixelRatio);
});
windowResizeObserver.observe(body);



// Expanding stuff
//
// The transition 0 -> fit-content isn't supported in CSS, 
// so we have to find the corresponding pixel value
const resizeObserver = new ResizeObserver(entries => {
    for (const e of entries) {
        const el = e.target;

        const style = getComputedStyle(el);
        const fullHeight = parseInt(style.getPropertyValue("--full-height"));
        const fullWidth = parseInt(style.getPropertyValue("--full-width"));
        const h = el.scrollHeight;
        const w = el.scrollWidth;

        if (1 < Math.abs(fullHeight - h))
            el.style.setProperty("--full-height", h + "px");

        if (1 < Math.abs(fullWidth - w))
            el.style.setProperty("--full-width", w + "px");
    }
});

const expanding = document.querySelectorAll(".expanding");
for (const e of expanding) {
    resizeObserver.observe(e);
}



// Link tracking
const links = document.querySelectorAll("a");
for (const link of links) {
    const url = link.href;
    link.id = url;
    mixpanel.track_links(`#${url}`, "Link clicked", { URL: url });
}
