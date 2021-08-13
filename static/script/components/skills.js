import { isScrolledIntoView } from '../utils.js'

const Skills = () => {
    return {
        isShown: false,
        
        mounted() {
            this.handleScroll = (event) => {
                const el = document.querySelector("#skills_tags_trigger");
    
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

        getTagColorClass(ferquencyOfUsage="sometime") {
            const colorsMap = {
                "full": "is-danger",
                "partial": "is-warning",
                "occasional": "is-success",
                "sometime": "is-info"
            }

            return colorsMap[ferquencyOfUsage] || "is-success";
        },

        getTagSizeClass(yearsOfExperience="around1orless") {
            const sizeMap = {
                "5+": "is-large",
                "around3": "is-medium",
                "around1orless": "is-normal"
            }

            return sizeMap[yearsOfExperience] || "is-normal";
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

        resetTransDelay(e) {
            e.target.classList.add("trans-reset")
        },

        getTagClasses(ferquencyOfUsage, yearsOfExperience) {
            if(this.isShown) {
                return [
                    this.getTransDelayClass(),
                    this.getTagColorClass(ferquencyOfUsage),
                    this.getTagSizeClass(yearsOfExperience)
                ];
            }
        }
    }
}

export default Skills;
