import { isScrolledIntoView } from '../utils.js'

const Experience = () => {
    return {
        isShown: false,
        
        mounted() {
            this.handleScroll = (event) => {
                const el = document.querySelector("#experience_timeline_trigger");
    
                const isVisible = isScrolledIntoView(el);
    
                if (isVisible) {
                    this.isShown = true
                }
            };

            window.addEventListener('scroll', this.handleScroll);
            this.handleScroll();
        },

        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        getEventClasses(seconds) {
            if(this.isShown) {
                return `is-flex animate__fadeInDown animate__delay-${seconds}s`;
            }
        }
    }
};

export default Experience;
