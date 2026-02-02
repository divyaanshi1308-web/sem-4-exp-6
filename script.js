const svg = document.getElementById("canvas");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;
let path;

function getPointFromClient(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    return {
        x: clientX - rect.left,
        y: clientY - rect.top,
    };
}

function startDraw(point) {
    drawing = true;
    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    const start = `M ${point.x} ${point.y}`;
    path.setAttribute("d", start);
    svg.appendChild(path);
}

function moveDraw(point) {
    if (!drawing || !path) return;
    const d = path.getAttribute("d") + ` L ${point.x} ${point.y}`;
    path.setAttribute("d", d);
}

function endDraw() {
    drawing = false;
    path = null;
}

svg.addEventListener("mousedown", (e) => {
    startDraw(getPointFromClient(e.clientX, e.clientY));
});

svg.addEventListener("mousemove", (e) => {
    moveDraw(getPointFromClient(e.clientX, e.clientY));
});

// Ensure drawing ends even if mouseup occurs outside the SVG
window.addEventListener("mouseup", () => {
    endDraw();
});

svg.addEventListener("mouseleave", () => {
    endDraw();
});

// Basic touch support
svg.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const t = e.touches[0];
    startDraw(getPointFromClient(t.clientX, t.clientY));
});

svg.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const t = e.touches[0];
    moveDraw(getPointFromClient(t.clientX, t.clientY));
});

window.addEventListener("touchend", () => {
    endDraw();
});

clearBtn.addEventListener("click", () => {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
});
