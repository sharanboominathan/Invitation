document.addEventListener('DOMContentLoaded', () => {

    // --- Audio Control ---
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control-btn');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '🎵';
            musicBtn.classList.remove('music-playing');
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '⏸️';
                musicBtn.classList.add('music-playing');
                isPlaying = true;
            }).catch(e => console.log("Audio play failed/blocked:", e));
        }
    }

    musicBtn.addEventListener('click', toggleMusic);

    // Auto-play on first interaction if possible
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            // Optional: Uncomment to force play on any click
            // toggleMusic();
        }
    }, { once: true });


    // --- Floating Hearts Background ---
    const heartsContainer = document.getElementById('background-hearts');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 7 + 's'; /* 7-10s duration */
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 300);


    // --- Scroll Animations (Intersection Observer) ---
    const sections = document.querySelectorAll('.hidden-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Hero Button ---
    document.getElementById('start-journey-btn').addEventListener('click', () => {
        const quizSection = document.getElementById('quiz-section');
        quizSection.style.display = 'block'; // Ensure it's rendered
        quizSection.scrollIntoView({ behavior: 'smooth' });

        // Start music if not playing
        if (!isPlaying) {
            toggleMusic();
        }
    });


    // --- Quiz Logic ---
    const questions = [
        {
            q: "Who fell first? 😘",
            a: ["Panda 🐼", "Teddy 🧸", "Both at once! 💕"],
            correct: 0 // Index of "correct" or fun answer
        },
        {
            q: "Our cutest memory? 🧸",
            a: ["Video call 📞", "Singing together 🎤", "All of them! ✨"],
            correct: 2
        },
        {
            q: "Who says sorry first? 🥺",
            a: ["Panda 🐼", "Teddy 🧸"],
            correct: 0
        },
        {
            q: "Who loves more? (Hint: There is only one answer 💕)",
            a: ["BOTH!!! 💖💖💖"],
            correct: 0
        },
        {
            q: "What is Panda's favorite thing to do? 🐼",
            a: ["Eating Bamboo 🌿", "Cuddling Teddy ❤️", "Sleeping 😴"],
            correct: 1
        },
        {
            q: "Where is our dream destination? 🌍",
            a: ["Switzerland 🏔️", "Paris 🗼", "Anywhere with you 💑"],
            correct: 2
        },
        {
            q: "Who is the best cuddler? 🤗",
            a: ["Teddy 🧸", "Panda 🐼", "We fit perfectly! 💞"],
            correct: 2
        },
        {
            q: "What makes Teddy smile the most? 😊",
            a: ["Panda's smile 🐼", "pampering 💆", "Presents 🎁"],
            correct: 0
        },
        {
            q: "What is our favorite food date? 🍕",
            a: ["panda's cooking 🍳", "teddy's cooking ☕", "Street Food 🌭"],
            correct: 0
        },
        {
            q: "Who is the messy one? 🙈",
            a: ["Panda 🐼", "Teddy 🧸", "We are both chaotic! 🤪"],
            correct: 2
        },
        {
            q: "Who is the better cook? 🍳",
            a: ["Teddy 👨‍🍳", "Panda 👩‍🍳", "We order out! 🥡"],
            correct: 1
        },
        {
            q: "What song reminds us of each other? 🎶",
            a: ["Subramaniyapuram - Kangal Irandal 🎸", "Koo-Koo - Agasatha", "Our own playlist 🎧"],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    const questionCard = document.getElementById('question-card');

    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            questionCard.innerHTML = `<h3>You know us perfectly! ❤️</h3><button class='cta-button' onclick='document.getElementById("first-meet-section").scrollIntoView({behavior: "smooth"})'>Continue Our Story ⬇️</button>`;
            return;
        }

        const q = questions[currentQuestion];
        let html = `<h3>${q.q}</h3>`;

        q.a.forEach((ans, index) => {
            html += `<button class="option-btn" onclick="checkAnswer(${index})">${ans}</button>`;
        });

        questionCard.innerHTML = html;
        questionCard.style.opacity = 0;
        setTimeout(() => questionCard.style.opacity = 1, 100); // Fade in
    }

    window.checkAnswer = function (index) {
        // Just for fun, we can show a sweet alert or just move to next
        // Use standard alert or custom popup? Let's keep it simple and sweet

        // Show fireworks/heart burst?
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
        });

        currentQuestion++;
        setTimeout(loadQuestion, 500);
    };

    loadQuestion();


    // --- Typing Effect for Panda's Letter / Section 2 Note ---
    const textToType = "I still remember the day I met my Teddy… from that moment, my world felt softer, warmer and full of love…";
    const typingElement = document.getElementById('typing-text');
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }

    // Trigger typing when section is visible
    const storyObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && charIndex === 0) {
            typeText();
        }
    });
    storyObserver.observe(document.getElementById('first-meet-section'));


    // --- Final Surprise "No" Button Logic ---
    const noBtn = document.getElementById('no-btn');
    const buttonGroup = document.querySelector('.button-group');

    // Desktop: Mouseover
    noBtn.addEventListener('mouseover', moveButton);
    // Mobile: Touchstart (often tricky, but acts as "tap to try to click")
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveButton();
    });

    // Prevent click if they somehow manage to click it
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    function moveButton() {
        // Use fixed positioning to allow movement across the entire viewport
        noBtn.style.position = 'fixed';
        noBtn.style.zIndex = '1000'; // Ensure it's above other elements

        // Get random coordinates within the visible viewport window
        // Subtract button dimensions to keep it fully visible
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;

        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Reset transform since we are using top/left now
        noBtn.style.transform = 'none';
    }

    // --- Final Surprise "Yes" Button Logic ---
    const yesBtn = document.getElementById('yes-btn');
    const finalPopup = document.getElementById('final-popup');

    yesBtn.addEventListener('click', () => {
        finalPopup.classList.remove('hidden');

        // Trigger massive confetti
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    });

    // Close popup on click (optional)
    finalPopup.addEventListener('click', (e) => {
        if (e.target === finalPopup) {
            finalPopup.classList.add('hidden');
        }
    });

    // --- Gallery Scroll Logic ---
    const scrollContainer = document.getElementById('gallery-scroll-container');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

});
