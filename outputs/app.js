const vocabulary = {
  work: [
    {
      word: "Interview",
      translation: "Собеседование",
      pronunciation: "/ˈɪntəvjuː/",
      example: "I have a job interview tomorrow.",
    },
    {
      word: "Employee",
      translation: "Сотрудник",
      pronunciation: "/ɪmˈplɔɪiː/",
      example: "Every employee has a training plan.",
    },
    {
      word: "Manager",
      translation: "Менеджер",
      pronunciation: "/ˈmænɪdʒə/",
      example: "My manager explains tasks clearly.",
    },
    {
      word: "Salary",
      translation: "Зарплата",
      pronunciation: "/ˈsæləri/",
      example: "The salary is paid every month.",
    },
  ],
  travel: [
    {
      word: "Airport",
      translation: "Аэропорт",
      pronunciation: "/ˈeəpɔːt/",
      example: "We arrived at the airport early.",
    },
    {
      word: "Ticket",
      translation: "Билет",
      pronunciation: "/ˈtɪkɪt/",
      example: "I bought a train ticket online.",
    },
    {
      word: "Luggage",
      translation: "Багаж",
      pronunciation: "/ˈlʌɡɪdʒ/",
      example: "Her luggage was very heavy.",
    },
  ],
  food: [
    {
      word: "Recipe",
      translation: "Рецепт",
      pronunciation: "/ˈresəpi/",
      example: "This recipe is easy to follow.",
    },
    {
      word: "Ingredient",
      translation: "Ингредиент",
      pronunciation: "/ɪnˈɡriːdiənt/",
      example: "Sugar is the main ingredient.",
    },
    {
      word: "Meal",
      translation: "Приём пищи",
      pronunciation: "/miːl/",
      example: "Dinner is my favorite meal.",
    },
  ],
  tech: [
    {
      word: "Website",
      translation: "Веб-сайт",
      pronunciation: "/ˈwebsaɪt/",
      example: "The website works well on phones.",
    },
    {
      word: "Coding",
      translation: "Программирование",
      pronunciation: "/ˈkəʊdɪŋ/",
      example: "Coding helps me build useful tools.",
    },
    {
      word: "Software",
      translation: "Программное обеспечение",
      pronunciation: "/ˈsɒftweə/",
      example: "This software checks spelling.",
    },
  ],
};

let activeCategory = "work";
let activeWord = vocabulary.work[0];

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll("[data-view]");
const categoryButtons = document.querySelectorAll("[data-category]");
const wordCloud = document.querySelector("#wordCloud");
const wordTitle = document.querySelector("#wordTitle");
const wordTranslation = document.querySelector("#wordTranslation");
const wordPronunciation = document.querySelector("#wordPronunciation");
const wordExample = document.querySelector("#wordExample");
const quizBox = document.querySelector("#quizBox");
const quizBtn = document.querySelector("#quizBtn");
const audioBtn = document.querySelector("#audioBtn");

function showView(viewId) {
  views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderWords() {
  wordCloud.innerHTML = "";
  vocabulary[activeCategory].forEach((entry) => {
    const button = document.createElement("button");
    button.className = "word-chip";
    button.textContent = entry.word.toLowerCase();
    button.classList.toggle("active", entry.word === activeWord.word);
    button.addEventListener("click", () => selectWord(entry));
    wordCloud.append(button);
  });
}

function selectWord(entry) {
  activeWord = entry;
  wordTitle.textContent = entry.word;
  wordTranslation.textContent = entry.translation;
  wordPronunciation.textContent = entry.pronunciation;
  wordExample.textContent = entry.example;
  quizBox.hidden = true;
  renderWords();
}

navButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const viewId = event.currentTarget.dataset.view;
    if (viewId) showView(viewId);
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    activeWord = vocabulary[activeCategory][0];
    categoryButtons.forEach((item) => item.classList.toggle("active", item === button));
    selectWord(activeWord);
  });
});

quizBtn.addEventListener("click", () => {
  quizBox.hidden = !quizBox.hidden;
});

audioBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(activeWord.word);
  utterance.lang = "en-US";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
});

renderWords();
