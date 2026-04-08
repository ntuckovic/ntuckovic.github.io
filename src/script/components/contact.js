const Contact = () => {
    return {
        contactShown: false,

        mounted() {
            const el = document.querySelector('#contact_trigger');
            if (!el) return;

            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.contactShown = true;
                    this.observer.disconnect();
                }
            }, { threshold: 0, rootMargin: '0px 0px 100px 0px' });

            this.observer.observe(el);
        },

        unmounted() {
            if (this.observer) this.observer.disconnect();
        },

        getLinkClass(index) {
            if (this.contactShown) {
                const delays = ['', 'animate__delay-1s', 'animate__delay-2s'];
                return `contact-link-visible animate__animated animate__fadeInUp ${delays[index] || ''}`;
            }
            return '';
        }
    }
};

export default Contact;
