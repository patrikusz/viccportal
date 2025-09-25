/* submit.js - Beküldő oldal JavaScript funkciók */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('submitForm');
    const jokeText = document.getElementById('jokeText');
    const charCounter = document.querySelector('.char-counter');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    
    const MAX_CHARS = 500;
    
    // Karakter számláló frissítése
    jokeText.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength} / ${MAX_CHARS} karakter`;
        
        // Színes jelzés
        charCounter.classList.remove('warning', 'error');
        if (currentLength > MAX_CHARS * 0.8) {
            charCounter.classList.add('warning');
        }
        if (currentLength >= MAX_CHARS) {
            charCounter.classList.add('error');
            this.value = this.value.substring(0, MAX_CHARS);
            charCounter.textContent = `${MAX_CHARS} / ${MAX_CHARS} karakter`;
        }
        
        validateForm();
    });
    
    // Form validáció
    function validateForm() {
        const jokeValue = jokeText.value.trim();
        const category = document.getElementById('category').value;
        const terms = document.getElementById('terms').checked;
        
        const isValid = jokeValue.length > 0 && 
                       jokeValue.length <= MAX_CHARS && 
                       category && 
                       terms;
        
        submitBtn.disabled = !isValid;
    }
    
    // Minden input mezőhöz eseménykezelő
    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('input', validateForm);
        element.addEventListener('change', validateForm);
    });
    
    // Form beküldése
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (submitBtn.disabled) return;
        
        // Loading állapot
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Adatok összegyűjtése
        const formData = {
            text: jokeText.value.trim(),
            category: document.getElementById('category').value,
            author: document.getElementById('authorName').value.trim() || 'Névtelen',
            email: document.getElementById('authorEmail').value.trim(),
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        };
        
        // Szimuláljuk a küldést
        setTimeout(() => {
            // Sikeres küldés
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll a sikeres üzenethez
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // LocalStorage-ba mentjük (valódi alkalmazásban szerverre küldenénk)
            let submittedJokes = JSON.parse(localStorage.getItem('submittedJokes') || '[]');
            submittedJokes.push(formData);
            localStorage.setItem('submittedJokes', JSON.stringify(submittedJokes));
            
            // Reset gomb működése megváltozik - újra megjelenítjük a formot
            document.querySelector('.reset-btn').textContent = 'Új vicc beküldése';
            document.querySelector('.reset-btn').onclick = function() {
                form.style.display = 'block';
                successMessage.style.display = 'none';
                form.reset();
                charCounter.textContent = '0 / 500 karakter';
                charCounter.classList.remove('warning', 'error');
                submitBtn.disabled = true;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                this.textContent = 'Törlés';
                this.onclick = null;
            };
            
        }, 2000); // 2 másodperces késleltetés a valószerűség kedvéért
    });
    
    // Reset gomb
    form.addEventListener('reset', function() {
        setTimeout(() => {
            charCounter.textContent = '0 / 500 karakter';
            charCounter.classList.remove('warning', 'error');
            validateForm();
        }, 10);
    });
    
    // Kezdeti validáció
    validateForm();
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