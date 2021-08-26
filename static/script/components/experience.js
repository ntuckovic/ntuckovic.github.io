import { isScrolledIntoView } from '../utils.js'

const Experience = () => {
    return {
        eventElKeysShown: {
            1: false,
            2: false,
            3: false
        },
        nextKey: 1,
        
        mounted() {
            this.handleScroll = (event) => {
                const el = document.querySelector(`#event_${this.nextKey}_trigger`);
    
                const isVisible = isScrolledIntoView(el);
    
                if (isVisible) {
                    this.eventElKeysShown[this.nextKey] = true;
                    this.nextKey += 1
                    window.removeEventListener('scroll', this.handleScroll);
                    window.addEventListener('scroll', this.handleScroll);
                }
            };

            window.addEventListener('scroll', this.handleScroll);
            
            this.handleScroll();
        },

        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        getEventClasses(key) {
            if(this.eventElKeysShown[key] === true) {
                let classStr = "is-flex animate__fadeInUp";

                if (key > 1) {
                    classStr = `${classStr} animate__delay-1s`
                }

                return classStr;
            }
        }
    }
};

export default Experience;
