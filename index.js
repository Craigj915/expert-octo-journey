let usedQuestionIndices = [];
let cName;
let randomQuestion;
let traits;
let classes;

// Initialize classes with all available classes
fetch("class.json")
  .then((response) => response.json())
  .then((data) => {
    classes = data.classes.slice(); // Copy the classes array   
    console.log(classes);
  });

//trait points
let traitPoints = {
  male: 0,
  female: 0,
  mobility: 0,
  damage: 0,
  defence: 0,
  stealth: 0,
  support: 0,
  range: 0,
  melee: 0,
  tank: 0,
  assassin: 0,
  summon: 0,
};

const input = document.getElementById("charanameBox");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("charaEnter").click();
  }
});

const validateCharaname = () => {
  cName = document.getElementById("charaname").value;
  if (cName !== "") {
    document.getElementById("charanameBox").classList.add("hidden");
    nextQuestion();
  } else {
    alert("Please Enter a Username");
  }
};

function nextQuestion() {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      const availableQuestions = data.filter(
        (_, index) => !usedQuestionIndices.includes(index)
      );
      if (availableQuestions.length === 0) {
        showSelection();
        return;
      }

      randomQuestion =
        availableQuestions[
          Math.floor(Math.random() * availableQuestions.length)
        ];
      usedQuestionIndices.push(data.indexOf(randomQuestion)); // Keep track of used questions
      document.getElementById("questionOutput").classList.remove("hidden");
      document.getElementById("answers").classList.remove("hidden");
      document.getElementById("questionOutput").innerHTML =
        randomQuestion.question.replace("${cName}", cName);
      console.log(availableQuestions);
      //choices
      for (let i = 1; i <= 3; i++) {
        document.getElementById(`answer${i}`).innerHTML = randomQuestion.choice[
          i
        ].replace("${cName}", cName);
      }
    });
}

// Event listeners for buttons
for (let i = 1; i <= 3; i++) {
  document.getElementById(`button${i}`).addEventListener("click", function () {
    traits = randomQuestion.traits[i];
    console.log(traits);
    addTraitPoint(traits);
  });
}

const addTraitPoint = (traits) => {
  let traitList = traits.split(",");
  for (let i = 0; i < traitList.length; i++) {
    traitPoints[traitList[i].toLowerCase()] += 1;
  }
  console.log(traitPoints);
};

function showSelection() {
  document.getElementById("questionOutput").classList.add("hidden");
  document.getElementById("answers").classList.add("hidden");
  document.getElementById("characterSelect").classList.remove("hidden");
}