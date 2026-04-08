import { createApp } from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js'

import Skills from './components/skills.js'
import Experience from './components/experience.js'

function initThemeToggle() {
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

initThemeToggle();

createApp({
    Skills,
    Experience
}).mount()
