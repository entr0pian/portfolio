// Click-to-load YouTube: the page shows a local poster until the visitor
// presses play, so no YouTube scripts or cookies load before that. Without JS
// the poster is a plain link to the video.
document.querySelectorAll(".video[data-video-id]").forEach((box) => {
  const facade = box.querySelector(".video-facade");
  facade.addEventListener("click", (event) => {
    event.preventDefault();
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${box.dataset.videoId}?autoplay=1&rel=0`;
    iframe.title = facade.getAttribute("aria-label") || "Video";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
  });
});
