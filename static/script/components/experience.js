import { isScrolledIntoView } from '../utils.js'

const Experience = () => {
    return {
        eventElKeysShown: {},
        nextKey: 1,

        mounted() {
            const eventCount = document.querySelectorAll('[id^="event_"][id$="_trigger"]').length;
            for (let i = 1; i <= eventCount; i++) {
                this.eventElKeysShown[i] = false;
            }

            this.handleScroll = (event) => {
                const el = document.querySelector(`#event_${this.nextKey}_trigger`);

                const isVisible = isScrolledIntoView(el);

                if (isVisible) {
                    this.eventElKeysShown[this.nextKey] = true;
                    this.nextKey += 1
                    window.removeEventListener('scroll', this.handleScroll);
                    if (this.nextKey <= eventCount) {
                        window.addEventListener('scroll', this.handleScroll);
                    }
                }
            };

            window.addEventListener('scroll', this.handleScroll);

            this.handleScroll();
        },

        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        getEventClasses(key) {
            if (this.eventElKeysShown[key] === true) {
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
