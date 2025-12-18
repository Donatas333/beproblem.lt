/**
 * Simple i18n (internationalization) handler
 * Supports language switching between Lithuanian (lt) and English (en)
 */

class I18n {
    constructor() {
        // Set default first, then compute currentLang
        this.defaultLang = 'lt';
        this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
        this.translations = {};
    }

    /**
     * Get language from localStorage
     */
    getStoredLanguage() {
        return localStorage.getItem('language');
    }

    /**
     * Detect browser language (fallback to default if not supported)
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // Get 'en' from 'en-US'
        return ['lt', 'en', 'nl'].includes(langCode) ? langCode : this.defaultLang;
    }

    /**
     * Load translation file for specific language
     */
    async loadTranslations(lang) {
        try {
            console.log('Fetching translation file:', `assets/i18n/${lang}.json`); // Debug
            const response = await fetch(`assets/i18n/${lang}.json`);
            console.log('Response status:', response.status); // Debug
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json: ${response.status}`);
            }
            this.translations = await response.json();
            console.log('Translations loaded:', Object.keys(this.translations)); // Debug
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);
            alert(`Failed to load translations: ${error.message}`); // User feedback
            return false;
        }
    }

    /**
     * Get translated text by key (supports nested keys like "nav.home")
     */
    t(key) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value;
    }

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations(animate = false) {
        const elements = document.querySelectorAll('[data-i18n]');
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');

        if (animate) {
            // Animate out first
            elements.forEach(element => {
                if (!element.classList.contains('typed')) {
                    element.classList.add('lang-switching-out');
                }
            });

            // Wait for animation to complete, then update text and animate in
            setTimeout(() => {
                elements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    const translation = this.t(key);

                    // Skip if element has the 'typed' class (handled by typed.js)
                    if (element.classList.contains('typed')) {
                        return;
                    }

                    // Check if element has data-i18n-attr to translate an attribute instead of text
                    const attr = element.getAttribute('data-i18n-attr');

                    if (attr) {
                        element.setAttribute(attr, translation);
                    } else {
                        // Only update textContent if translation is found
                        if (translation && translation !== key) {
                            element.textContent = translation;
                        }
                    }

                    // Remove out animation and add in animation
                    element.classList.remove('lang-switching-out');
                    element.classList.add('lang-switching-in');
                });

                // Update placeholders (no animation needed)
                placeholderElements.forEach(element => {
                    const key = element.getAttribute('data-i18n-placeholder');
                    const translation = this.t(key);
                    if (translation && translation !== key) {
                        element.setAttribute('placeholder', translation);
                    }
                });

                // Handle placeholder translations (no animation needed for placeholders)
                placeholderElements.forEach(element => {
                    const key = element.getAttribute('data-i18n-placeholder');
                    const translation = this.t(key);
                    if (translation && translation !== key) {
                        element.setAttribute('placeholder', translation);
                    }
                });

                // Clean up animation classes
                setTimeout(() => {
                    elements.forEach(element => {
                        element.classList.remove('lang-switching-in');
                    });
                }, 300);
            }, 300);
        } else {
            // No animation - just update
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.t(key);

                // Skip if element has the 'typed' class (handled by typed.js)
                if (element.classList.contains('typed')) {
                    return;
                }

                // Check if element has data-i18n-attr to translate an attribute instead of text
                const attr = element.getAttribute('data-i18n-attr');

                if (attr) {
                    element.setAttribute(attr, translation);
                } else {
                    // Only update textContent if translation is found
                    if (translation && translation !== key) {
                        element.textContent = translation;
                    }
                }
            });

            // Update placeholders (no animation)
            placeholderElements.forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = this.t(key);
                if (translation && translation !== key) {
                    element.setAttribute('placeholder', translation);
                }
            });

            // Handle placeholder translations
            placeholderElements.forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = this.t(key);
                if (translation && translation !== key) {
                    element.setAttribute('placeholder', translation);
                }
            });
        }

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', this.currentLang);
    }

    /**
     * Switch to a different language
     */
    async switchLanguage(lang) {
        console.log('Switching to language:', lang); // Debug
        if (this.currentLang === lang) {
            console.log('Already on this language, skipping'); // Debug
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('language', lang);

        console.log('Loading translations for:', lang); // Debug
        const loaded = await this.loadTranslations(lang);
        console.log('Translations loaded:', loaded); // Debug

        if (loaded) {
            this.applyTranslations(true); // Enable animation on language switch

            // Wait for flip animation to complete before reinitializing typed
            setTimeout(() => {
                this.reinitializeTyped();
            }, 300);

            this.updateLanguageToggle();
            console.log('Language switched successfully to:', lang); // Debug
        }
    }

    /**
     * Update active state on language toggle buttons
     */
    updateLanguageToggle() {
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Reinitialize typed.js with translated content
     */
    reinitializeTyped() {
        const typedElement = document.querySelector('.typed');
        if (!typedElement) return;

        const dataTypedItems = this.t('hero.roles');
        if (!dataTypedItems || dataTypedItems === 'hero.roles') return;

        // Update the attribute for future reference
        typedElement.setAttribute('data-typed-items', dataTypedItems);

        // Check if Typed is available
        if (typeof Typed !== 'undefined') {
            // Destroy existing typed instance if it exists
            if (window.typedInstance) {
                window.typedInstance.destroy();
            }

            // Reinitialize with new language
            const items = dataTypedItems.split(',').map(item => item.trim());
            window.typedInstance = new Typed('.typed', {
                strings: items,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });

            console.log('Typed.js reinitialized with language:', this.currentLang);
        } else {
            console.warn('Typed.js not loaded yet');
        }
    }

    /**
     * Initialize i18n system
     */
    async init() {
        // Load initial translations
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();

        // Initialize typed.js after translations are loaded
        this.initializeTyped();

        // Set up language toggle buttons (direct listeners)
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                console.log('Language button clicked:', lang); // Debug log
                this.switchLanguage(lang);
            });
        });

        // Also add delegated click handling as a fallback
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-lang]');
            if (btn) {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                console.log('Delegated language click:', lang);
                this.switchLanguage(lang);
            }
        });

        this.updateLanguageToggle();
    }

    /**
     * Initialize typed.js for the first time
     */
    initializeTyped() {
        const typedElement = document.querySelector('.typed');
        if (!typedElement) return;

        const dataTypedItems = this.t('hero.roles');
        if (!dataTypedItems || dataTypedItems === 'hero.roles') return;

        // Wait for Typed to be available
        if (typeof Typed === 'undefined') {
            console.warn('Typed.js not loaded yet, retrying...');
            setTimeout(() => this.initializeTyped(), 100);
            return;
        }

        const items = dataTypedItems.split(',').map(item => item.trim());
        window.typedInstance = new Typed('.typed', {
            strings: items,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });

        console.log('Typed.js initialized with language:', this.currentLang);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
    window.i18n.init();
});
