// Load appropriate video resolution
const vertical_thresh = 1400;
const video = document.getElementById("waves");
const source = document.createElement("source");
source.src = video.clientHeight < vertical_thresh ? "resources/Waves-1080p.mp4" : "resources/Waves-4K.mp4";
source.type = 'video/mp4';
video.appendChild(source);
