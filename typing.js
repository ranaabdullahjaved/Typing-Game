document.addEventListener("DOMContentLoaded", () => {
  const GivenTextEl = document.getElementById("Given_Text");
  const InputTextEl = document.getElementById("Input_Text");
  const SpeedEl = document.getElementById("speed");
  const AccuracyEl = document.getElementById("accuracy");

  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog",
    "She sells seashells by the seashore",
    "A watched pot never boils",
    "Actions speak louder than words",
    "Beauty is in the eye of the beholder",
    "Better late than never",
    "Brevity is the soul of wit",
    "Curiosity killed the cat",
    "Don't count your chickens before they hatch",
    "Every cloud has a silver lining",
    "Fortune favors the bold",
    "Good things come to those who wait",
    "Honesty is the best policy",
    "If it ain't broke, don't fix it",
    "Ignorance is bliss",
    "It's always darkest before the dawn",
    "Knowledge is power",
    "Laughter is the best medicine",
    "Leave no stone unturned",
  ];

  function initializeGame() {
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    GivenTextEl.textContent = text;
    InputTextEl.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    updateFeedback();
  }

  function updateFeedback() {
    const currentTime = new Date();
    // divide by 60000 to make in minutes
    const elapsedTime = (currentTime - startTime) / 60000;
    if (elapsedTime <= 0) {
      SpeedEl.textContent = 0;
    } else {
      const wordsTyped = InputTextEl.value.trim().split(/\s+/).length;
      console.log(wordsTyped);
      let speed = Math.round(wordsTyped / elapsedTime);
      SpeedEl.textContent = speed;
    }
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    AccuracyEl.textContent = accuracy;
  }

  function checkCharacter(inputChar, outputChar) {
    if (inputChar != outputChar) {
      errors++;
      new Audio("./error.mp3").play();
      return false;
    }
    return true;
  }

  function displayMessage(message = "dsf") {
    const Message = document.getElementById("Message_Area");
    Message.textContent = message;
    setTimeout(() => {
      Message.textContent = "";
    }, 3000);
  }
  InputTextEl.addEventListener("keyup", (t) => {
    const textTyped = InputTextEl.value;
    const textOutput = GivenTextEl.textContent;
    if (t.key === "Backspace") {
      console.log(textTyped);
      console.log(currentIndex);
      if (currentIndex > 0) {
        currentIndex--;

        GivenTextEl.innerHTML =
          textOutput.substring(0, currentIndex) +
          `<span class='none'>${textOutput[currentIndex]}</span>` +
          textOutput.substring(currentIndex + 1);
      }
    } else {
      if (currentIndex < textOutput.length) {
        console.log(textTyped);
        console.log(currentIndex);

        const isCorrect = checkCharacter(
          textTyped[currentIndex],
          textOutput[currentIndex]
        );
        GivenTextEl.innerHTML =
          textOutput.substring(0, currentIndex) +
          `<span class='${isCorrect ? "correct" : "incorrect"}'>${
            textOutput[currentIndex]
          }</span>` +
          textOutput.substring(currentIndex + 1);
        currentIndex++;
      }
      if (currentIndex === textOutput.length) {
        displayMessage("Text Completed starting new one");
        initializeGame();
      }
      updateFeedback();
    }
  });
  initializeGame();
});
