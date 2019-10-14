var funcForGenearateString = require("randomstring");
var axios = require('axios');
var print = require("./second");
var randomBroj = require("./first");

print.main();

var name = funcForGenearateString.generate({
  length: 12,
  charset: 'numeric'
});

//console.log(name);

function wrapper(a, b) {
  var c = a + b;
  return new Promise((resolve, reject) => {
    if (c > 10) {
      resolve(c);
    }
    reject("Error zbirot vi e = " + c + ", a treba da e nad 10");
  });
}

function wrapper2(a) {
  return new Promise((resolve, reject) => {
    if (a % 2 == 0) {
      resolve("Zbirot e paren");
    }
    reject("Zbirot NE e paren");
  });
}

async function sum() {
  try {
    var sum = await wrapper(11, 5);
    var result = await wrapper2(sum);
    console.log(result);

  } catch (error) {
    console.log(error);
  }
}

//sum();






async function getQuestions() {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    console.log(response.data);

    var questionsList = response.data.results.map((obj) => {
      return {
        question: obj.question,
        category: obj.category,
        difficulty: randomBroj.randomNumber(1, 5),

      };
    });
    var reducer = questionsList.reduce((sum, elem) => {
      return sum += elem.difficulty;
    },0)
    console.log(reducer/questionsList.length)

    /* prviot parametar najcesto go pisuvame result i na kraj od reduce ke iskaca deka e result = reducer
    currrentObject e sekogas objektot koj sto go vrtime i toj sto go reducirame*/

    // var reducer = questionsList.reduce((result, currentObject) => {
    //   return result += currentObject.difficulty;
    // },0)
    // console.log(reducer/questionsList.length)

    // console.log(questionsList)
    // console.log(questionsList.difficulty)


    // console.log(questionsList);
  } catch (error) {
    console.error(error);
  }
}

getQuestions();

async function postMail() {
  try {
    const response = await axios.post("http://urlexample.com", {
      ime: "nikola",
      prezime: "Stojkovski",
      oglasId: 1231234
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function Execute() {
  while (true) {
    await postMail();

  }
}

//Execute();
