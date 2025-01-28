window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
function scrollToPoint() {
    // Scroll to the element with the ID "target"
    const targetElement = document.getElementsByClassName("target")[0];
    targetElement.scrollIntoView({ behavior: 'smooth' });
}