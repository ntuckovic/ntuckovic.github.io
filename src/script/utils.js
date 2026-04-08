export const isScrolledIntoView = (el) => {
    if (el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;

        // Only completely visible elements return true:
        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
    } else {
        return false;
    }
}
