export function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const icon = btn.querySelector('.fa');

    function updateIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        icon.className = isDark ? 'fa fa-moon-o' : 'fa fa-sun-o';
    }

    btn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        updateIcon();
    });

    updateIcon();
}

export function initCopyrightYear() {
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
}
