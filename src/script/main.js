import { createApp } from 'petite-vue'

import { initThemeToggle, initCopyrightYear } from './components/general.js'
import Skills from './components/skills.js'
import Experience from './components/experience.js'

initThemeToggle();
initCopyrightYear();

createApp({
    Skills,
    Experience
}).mount()
