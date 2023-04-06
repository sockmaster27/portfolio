
// Selection of sections
//
// The 'selected' section is expanded
let selected = null;

function clearSelection() {
    selected?.classList.remove("selected");
    selected = null;
}

const divs = document.querySelectorAll(".content>div");
for (const div of divs) {
    div.addEventListener("click", (e) => {
        e.stopPropagation();
        clearSelection();
        div.classList.add("selected");
        selected = div;
    });
}

document.addEventListener("click", clearSelection);



// Expanding stuff
//
// The transition 0 -> fit-content isn't supported in CSS, 
// so we have to find the corresponding pixel value
const resizeObserver = new ResizeObserver(entries => {
    for (e of entries) {
        const el = e.target;
        el.style.setProperty("--full-height", el.scrollHeight + "px");
        el.style.setProperty("--full-width", el.scrollWidth + "px");
    }
});

const expanding = document.querySelectorAll(".expanding");
for (e of expanding) {
    resizeObserver.observe(e);
}
