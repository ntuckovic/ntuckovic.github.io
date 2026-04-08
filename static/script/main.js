import { createApp } from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js'

import { initThemeToggle, initCopyrightYear } from './components/general.js'
import Skills from './components/skills.js'
import Experience from './components/experience.js'

initThemeToggle();
initCopyrightYear();

createApp({
    Skills,
    Experience
}).mount()
