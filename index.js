(function() {
    let questionRef = 0;
    let randomNum;
    let appMultipleChoice = document.getElementById("app");
    let questions = [{
        question: "¿Quién escribió La Odisea?",
        answers: ["Odiseo", "Homero", "Carol XD"],
        answerCorrect: 1
    }, {
        question: "¿Como me llamo?",
        answers: ["Jose", "Jenny", "Carol XD"],
        answerCorrect: 0
    }, {
        question: "¿Hola que hace?",
        answers: ["Nada", "Mucho", "What!"],
        answerCorrect: 0
    }];
    appMultipleChoice.classList.add("app");
    questionsGenerator();

    function questionsGenerator() {
        const numMin = 0;
        const numMax = questions.length;
        randomNum = parseInt(Math.random() * (numMax - numMin) + numMin);
        const div = document.createElement('div');
        const questionsArr = questions[randomNum].answers;
        div.innerHTML = questions[randomNum].question;
        div.classList.add('questions');

        for (let i = 0; i < questionsArr.length; i++) {
            const check = document.createElement('button');
            check.innerHTML = questions[randomNum].answers[i];
            check.setAttribute('id', `${i}`);
            check.classList.add("btns");
            div.appendChild(check);
        }

        if (appMultipleChoice.hasChildNodes()) {
            appMultipleChoice.replaceChild(div, appMultipleChoice.firstChild);
        } else {
            appMultipleChoice.appendChild(div);
        }
    }

    appMultipleChoice.addEventListener("click", (e) => {
        const buttonCheck = e.path[0];
        if (buttonCheck.id == questions[randomNum].answerCorrect) {
            alert("Correcto");
            questions.splice(randomNum, 1);
            console.log(questions);
            if (questions.length > 0) {
                questionsGenerator();
            } else {
                console.log("Viejo se termino el juego, Madure!!");
            }
        }
    });
})();