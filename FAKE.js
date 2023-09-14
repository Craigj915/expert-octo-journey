let usedQuestionIndices = [];
let cName;
let randomQuestion;
let traits;
let classes;

// Initialize classes with all available classes
function avalibleClasses() {
  fetch("class.json")
  .then((response) => response.json())
  .then((data) => {
    classes = data.classes.slice(); // Copy the classes array   
  });
}

 console.log(classes)

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

        // Event listener for button click
        document
          .getElementById(`button${i}`)
          .addEventListener("click", function () {
            traits = randomQuestion.traits[i];

            console.log(traits);
          });
          
      }
      // add point?
      addTraitPoint(traits);
    });
  const addTraitPoint = (traits) => {
    let traitList = traits.split(",");
    for (let i = 0; i < traitList.length; i++) {
      traitPoints[traitList[i].toLowerCase()] = traitPoints[traitList[i].toLowerCase()] + 1;
    } console.log(traitList);
    console.log(traits);
  };

  console.log(traitPoints);
}

// result



function showSelection() {
  document.getElementById("questionOutput").classList.add("hidden");
  document.getElementById("answers").classList.add("hidden");
  document.getElementById("characterSelect").classList.remove("hidden");
}

//================

// const input = document.getElementById("charanameBox");

// input.addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("charaEnter").click();
//   }
// });

// const addTraitPoint = (trait) => {
//   traitPoints[trait]++;
// };

// const getRandomQuestion = (data) => {
//   let randomIndex;
//   do {
//     randomIndex = Math.floor(Math.random() * data.length);
//   } while (usedQuestionIndices.includes(randomIndex));
//   usedQuestionIndices.push(randomIndex);
//   return data[randomIndex];
// };

// const validateCharaname = () => {
//   let cName = document.getElementById("charaname").value;
//   if (cName !== "") {
//     fetch('questions.json')
//       .then(response => response.json())
//       .then(data => {
//         document.getElementById("questionOutput").classList.remove("hidden");
//         document.getElementById("answers").classList.remove("hidden");

//         const randomQuestion = getRandomQuestion(data);  // Get a random unused question
//         document.getElementById("questionOutput").innerHTML = randomQuestion.question.replace('${cName}', cName);
//         document.getElementById("charanameBox").classList.add("hidden");

//         //choices
//         for (let i = 1; i <= 3; i++) {
//           document.getElementById(`answer${i}`).innerHTML = randomQuestion[i];
//           document.getElementById(`answer${i}`).onclick = () => {
//             addTraitPoint(randomQuestion.trait); // Add trait point when answer is clicked
//             nextQuestion(); // Go to next question
//           };
//         }
//       });

//   } else {
//     alert("Please Enter a Username");
//   }
// };

//----------------------------

// const input = document.getElementById("charanameBox");

// input.addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("charaEnter").click();
//   }
// });

// const validateCharaname = () => {
//   let cName = document.getElementById("charaname").value;
//   if (cName !== "") {
//     document.getElementById("questionOutput").classList.remove("hidden");
//     document.getElementById("answers").classList.remove("hidden");
//     document.getElementById("questionOutput").innerHTML = `Heloooo ${cName}`;
//     document.getElementById("charanameBox").classList.add("hidden");
//   } else {
//     alert("Please Enter a Username");
//   }
// };

// $("charaname").keypress (function(event) {
//   if (event.keyCode === 13) {
//     $("charaEnter").click()
//   }
// });

// const cBox = document.getElementById("charanameBox")
// if ((cBox).keypress === "Enter") {
//   document.getElementById("charaEnter").click();
// }

//     fetch("questions.json")
// .then(function(response) {
//   return response.json();
// })

// async function loadQuestions() {
//   try {
//     const questionsResponse = await fetch('questions.json');
//     const questionsData = await questionsResponse.json();
//     return questionsData;
//   } catch (error) {
//     console.error('Error loading questions:', error);
//   }
// }
