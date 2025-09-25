/* contact.js - Kapcsolat oldal JavaScript funkciók */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const successMessage = document.getElementById('contactSuccessMessage');
    
    // Form validáció
    function validateContactForm() {
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value.trim();
        const privacy = document.getElementById('contactPrivacy').checked;
        
        const isValid = name.length > 0 && 
                       email.length > 0 && 
                       isValidEmail(email) &&
                       subject.length > 0 &&
                       message.length > 0 &&
                       privacy;
        
        submitBtn.disabled = !isValid;
    }
    
    // Email validáció
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Minden input mezőhöz eseménykezelő
    document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(element => {
        element.addEventListener('input', validateContactForm);
        element.addEventListener('change', validateContactForm);
    });
    
    // Kapcsolat form beküldése
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (submitBtn.disabled) return;
        
        // Loading állapot
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Adatok összegyűjtése
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Szimuláljuk a küldést
        setTimeout(() => {
            // Sikeres küldés
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll a sikeres üzenethez
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // LocalStorage-ba mentjük (backup)
            let contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            contactMessages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
            
            // Reset gomb működése megváltozik
            document.querySelector('.reset-btn').textContent = 'Új üzenet írása';
            document.querySelector('.reset-btn').onclick = function() {
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
                contactForm.reset();
                submitBtn.disabled = true;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                this.textContent = 'Törlés';
                this.onclick = null;
            };
            
        }, 2000); // 2 másodperces késleltetés
    });
    
    // Reset gomb
    contactForm.addEventListener('reset', function() {
        setTimeout(() => {
            validateContactForm();
        }, 10);
    });
    
    // FAQ működése
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Összes többi FAQ bezárása
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
            
            // Aktuális FAQ toggle
            item.classList.toggle('open');
        });
    });
    
    // Kezdeti validáció
    validateContactForm();
});

// Téma váltás funkció (ha nincs betöltve a fő script.js-ből)
if (typeof toggleTheme === 'undefined') {
    function toggleTheme() {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    }
    
    // Téma betöltése
    let theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") document.body.classList.add("dark");
}

// Back to top gomb (ha nincs betöltve a fő script.js-ből)
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.style.display = window.scrollY > 200 ? "block" : "none";
        });
        backToTop.addEventListener("click", () => window.scrollTo({top:0, behavior: 'smooth'}));
    }
});