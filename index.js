let usedQuestionIndices = [];
let cName;
let randomQuestion;
let traits;
let classes;
let className;
let classesRemaining;

//trait points
let traitPoints = {
  male: 0,
  female: 0,
  "hyper-mobile": 0,
  damage: 0,
  defence: 0,
  stealth: 0,
  support: 0,
  "long-range": 0,
  melee: 0,
  tank: 0,
  assassin: 0,
  summon: 0,
  shield: 0,
  heal: 0,
  spear: 0,
  sword: 0,
  axe: 0,
  staff: 0,
  agile: 0,
  bow: 0,
  gauntlet: 0,
  bruiser: 0,
  dodge: 0,
  flight: 0,
  magic: 0,
  "huge-damage": 0,
  ultimate: 0,
  aoe: 0,
  combo: 0,
  "glass-cannon": 0,
  "mid-range": 0,
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

function filterClasses(classes, traitPoints) {
  return classes.filter((classData) => {
    for (const trait in traitPoints) {
      if (traitPoints[trait] > 0 && !classData[trait]) {
        return false;
      }
    }
    return true;
  });
}

function nextQuestion() {
  // Initialize classes with all available classes
  fetch("class.json")
    .then((response) => response.json())
    .then((data) => {
      const classes = data.classes.slice();

      // Filter classes based on traitPoints
      classesRemaining = filterClasses(classes, traitPoints);

      if (classesRemaining.length <= 3) {
        showSelection();
        return;
      }

      console.log(classesRemaining);

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
            document.getElementById(`answer${i}`).innerHTML =
              randomQuestion.choice[i].replace("${cName}", cName);
          }
        });
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

function getClassInfo(classData) {
  for (let i = 0; i <= classData.length -1; i++) {
    title = classData[i].info.title;
    description = classData[i].info.description;
    image = classData[i].info.image;

    document.getElementById(`selectionTitle${i}`).innerHTML = title;
    document.getElementById(`selectionDescription${i}`).innerHTML = description;
    document.getElementById(`selectionImage${i}`).src = image;
  }

  if (classData.length == 2) {
    document.getElementById("only2RemainingClasses").classList.add("hidden");
    document
      .getElementById("RemainingClassesGRID")
      .classList.remove("grid-cols-3");
    document
      .getElementById("RemainingClassesGRID")
      .classList.add("grid-cols-2");
  } else if (classData.length < 2) {
    document.getElementById("only1RemainingClasses").classList.add("hidden");
    document.getElementById("only2RemainingClasses").classList.add("hidden");
    document
      .getElementById("RemainingClassesGRID")
      .classList.remove("grid-cols-3");
  }

  // if (classData.length < 3) {
  //   document.getElementById("only2RemainingClasses").classList.add("hidden");
  //   document.getElementById("only2RemainingClassesGRID").classList.remove("grid-cols-3");
  //   document.getElementById("only2RemainingClassesGRID").classList.add("grid-cols-2");
  //   // only2RemainingClasses
  //   // only2RemainingClassesGRID
  // }

  console.log(classData);
  return classData.info;
}

function showSelection() {
  getClassInfo(classesRemaining);
  document.getElementById("questionOutput").classList.add("hidden");
  document.getElementById("answers").classList.add("hidden");
  document.getElementById("characterSelect").classList.remove("hidden");
}
