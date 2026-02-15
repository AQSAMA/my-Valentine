
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const translations = {
    ar: {
        question: "هل تقبلين تكونين عيد حبي؟",
        yes: "اي",
        no: "لا",
        toggle: "English",
        success: "🤍عرفتتتت رااحح تقلبيين🤍",
        messages: [
            "متأكدة كلش لا؟",
            "يعني صدك متريدين😔؟؟",
            "لخاطري حبيبتي؟",
            "زين فكّر بالموضوع شويّة!",
            "بليز حبيبتي والله ادلعج😋",
            "راح أزعل...",
            "خلص تمام، ما راح ألح بعد...",
            "اشاقة، كولي اي بليز ❤️",
            "والله احبج ممكن تقبلين!",
            "ممنوع الرفض!"
        ]
    },
    en: {
        question: "Will you be my Valentine?",
        yes: "Yes",
        no: "No",
        toggle: "العربية",
        success: "🤍I knew you'd say yes!🤍",
        messages: [
            "Are you really sure?",
            "Still no? 🥺",
            "Please, pretty please?",
            "Think about it one more time!",
            "Come on, I'll spoil you 😋",
            "You're breaking my heart...",
            "Okay fine... I won't ask again...",
            "Just teasing, please say yes ❤️",
            "I really like you, please?",
            "Nope, rejecting is not allowed!"
        ]
    }
};

let currentLanguage = "ar";
let messageIndex = 0;
const MAX_ROTATION_DEGREES = 15;
const EDGE_PADDING = 20;

function getRandomRotation() {
    return Math.floor(Math.random() * ((MAX_ROTATION_DEGREES * 2) + 1)) - MAX_ROTATION_DEGREES;
}

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const messages = translations[currentLanguage].messages;
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
    noButton.style.position = "fixed";
    const buttonRect = noButton.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const maxX = Math.max(viewportWidth - buttonRect.width - EDGE_PADDING, 0);
    const maxY = Math.max(viewportHeight - buttonRect.height - EDGE_PADDING, 0);
    noButton.style.left = `${Math.random() * maxX}px`;
    noButton.style.top = `${Math.random() * maxY}px`;
    noButton.style.transform = `rotate(${getRandomRotation()}deg)`;
}

function handleYesClick() {
    window.location.href = "yespage.html";
}

function toggleLanguage() {
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";
    messageIndex = 0;
    applyLanguage();
}

function applyLanguage() {
    const question = document.querySelector("#question-text");
    const yesButton = document.querySelector(".yes-button");
    const noButton = document.querySelector(".no-button");
    const successText = document.querySelector(".header_text");
    const languageButton = document.querySelector(".language-button");
    const content = translations[currentLanguage];

    if (question) question.textContent = content.question;
    if (yesButton) yesButton.textContent = content.yes;
    if (noButton) noButton.textContent = content.no;
    if (successText) successText.textContent = content.success;
    if (languageButton) languageButton.textContent = content.toggle;
}

applyLanguage();
