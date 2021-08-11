const Skills = () => {

    return {
        mounted() {
            console.log(`I'm mounted!`)
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
            return [this.getTransDelayClass(), this.getTagColorClass(ferquency)]
        }
    }
}

export default Skills;
