(function() {
    let questionRef = 0;
    let randomNum;
    let appMultipleChoice = document.getElementById("app");
    let questions = [{
        question: "¿Quién escribió La Odisea?",
        answers: ["Odiseo", "Homero", "Maquiavelo"],
        answerCorrect: 1
    }, {
        question: " ¿Cuándo acabó la II Guerra Mundial?",
        answers: ["1820", "1942", "1945"],
        answerCorrect: 2
    }, {
        question: "Si 50 es el 100%, ¿cuánto es el 90%?",
        answers: ["100%", "45%", "55%"],
        answerCorrect: 1
    }, {
        question: "¿Cómo se llama el animal más rápido del mundo?",
        answers: ["Gepardo", "Halcón peregrino", "Avestruz"],
        answerCorrect: 0
    }, {
        question: "¿Quién ganó el mundial de 2014?",
        answers: ["Brasil", "Argentina", "Alemania"],
        answerCorrect: 2
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

    var createCustomElement = (element, attributes, children) => {
        var customElement = document.createElement(element);
        if (children !== undefined) children.forEach(function(el) {
            if (el.nodeType) {
                if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
            } else {
                customElement.innerHTML += el;
            }
        });
        addAttributes(customElement, attributes);
        return customElement;
    };

    // Añadir un objeto de atributos a un elemento
    var addAttributes = (element, attrObj) => {
        for (var attr in attrObj) {
            if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
        }
    };

    //Crear modal
    var modal = (content) => {
        const modalContent = createCustomElement('div', {
            id: 'modal-content',
            class: 'modal-content'
        }, [content]);
        const modalContainer = createCustomElement('div', {
            id: 'modal-container',
            class: 'modal-container'
        }, [modalContent]);

        appMultipleChoice.appendChild(modalContainer);

        const removeModal = () => {
            appMultipleChoice.removeChild(modalContainer);
        }

        modalContainer.addEventListener("click", (e) => {
            if (e.target === modalContainer) {
                removeModal();
            }
        });

    }

    appMultipleChoice.addEventListener("click", (e) => {
        const buttonCheck = e.path[0];
        if (questions.length > 0) {
            if (buttonCheck.id == questions[randomNum].answerCorrect) {
                //Imprimir modal
                modal('Correcto');
                questions.splice(randomNum, 1);
                if (questions.length > 0) {
                    questionsGenerator();
                } else {
                    modal('Viejo se termino el juego, Madure!!');
                }
            } else {
                console.log("Changos viejo, será en otra oportunidad!");
            }
        } else {
            modal('Viejo se termino el juego, Madure!!');

        }

    });



})();