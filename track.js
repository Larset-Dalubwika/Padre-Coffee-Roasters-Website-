const track = document.getElementById("menu-track");
const container = document.querySelector(".menu-track-container");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = track.scrollWidth - container.offsetWidth;

    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    // Convert percentage to actual pixels for the translate
    const translateX = (nextPercentage / 100) * (track.scrollWidth - container.offsetWidth);

    track.animate({
        transform: `translate(${translateX}px, -50%)`
    }, { duration: 1000, fill: "forwards" });
}

container.onmousedown   = e => handleOnDown(e);
container.ontouchstart  = e => handleOnDown(e.touches[0]);

container.onmousemove   = e => handleOnMove(e);
container.ontouchmove   = e => handleOnMove(e.touches[0]);

// These stay on window so releasing outside still cancels the drag
window.onmouseup    = e => handleOnUp(e);
window.ontouchend   = e => handleOnUp(e.touches[0]);