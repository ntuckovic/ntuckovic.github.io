import { isScrolledIntoView } from '../utils.js'

const Skills = () => {
    return {
        isShown: false,
        
        mounted() {
            this.handleScroll = (event) => {
                const el = document.querySelector(".skills_title");
    
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

        getTagColorClass(ferquency="sometime") {
            const colorsMap = {
                "full": "is-danger",
                "partial": "is-warning",
                "occasional": "is-success",
                "sometime": "is-info"
            }

            return colorsMap[ferquency] || "is-success";
        },

        getTransDelayClass() {
            const transDelayList = [
                "trans-delay-05",
                "trans-delay-075",
                "trans-delay-1",
                "trans-delay-125",
                "trans-delay-15",
                "trans-delay-175",
                "trans-delay-2"
            ]
            const transDelayRandomIndex = Math.floor(Math.random() * transDelayList.length);
            
            return transDelayList[transDelayRandomIndex];
        },

        getTagClasses(ferquency) {
            if(this.isShown) {
                return [this.getTransDelayClass(), this.getTagColorClass(ferquency)];
            }
        }
    }
}

export default Skills;
