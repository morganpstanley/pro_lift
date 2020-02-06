/*-------------------     GLOBAL VARIABLES     --------------------*/

const BASE_URL = "http://localhost:3000"
const EXERCISES_URL = `${BASE_URL}/exercises`
const formText = 'REPS <input type="text" name="input-reps" placeholder=""> <span>x</span> WEIGHT <input type="text" name="input-weight" placeholder="">'

/*-----------------------     FUNCTIONS     -----------------------*/

function run() {
    fetch(EXERCISES_URL)
    .then(resp => resp.json())
    .then(json => 
        json.forEach(exercise => {
            addExercise(exercise)
        })
    );
}

function addExercise(exercise) {
    let div = document.createElement('div');
    let button = document.createElement('button')
    button.innerHTML = `<span id="exercise-name"><b>${exercise.name}</b></span> <span id="exercise-date">${exercise.date}</span`
    div.appendChild(button)
    div.classList.add('lift');
    let innerDiv = document.createElement('div');
    innerDiv.classList.add('hidden');
    for (i = 0; i < exercise.lifts.length; i++) {
        addLift(exercise.lifts[i], innerDiv, i+1)
    }
    div.appendChild(innerDiv)
    document.querySelector('#workouts').appendChild(div);
    button.addEventListener('click', toggleNext)
}

function addLift(lift, div, setNum) {
    let p = document.createElement('p')
    liftString = `<span id="set-number">${setNum}.</span> ${lift.reps} <span id="x-symbol">x</span> ${lift.weight}`
    p.innerHTML = liftString;
    div.setAttribute("id", "set");
    div.appendChild(p)
}

/*--------------------     EVENT LISTENERS     --------------------*/

const ADD_SET_BUTTON = document.querySelector('#add-set-button');
const REMOVE_SET_BUTTON = document.querySelector('#remove-set-button');
const ADD_EXERCISE_BUTTON = document.querySelector('#add-exercise-button');
const ADD_EXERCISE_FORM_SUBMIT = document.querySelector('#add-exercise-form');
let setCounter = 2;


function toggleNext() {
    this.nextElementSibling.classList.toggle('hidden')
}

ADD_SET_BUTTON.addEventListener('click', function() {
    div = document.createElement('div');
    div.setAttribute('class', 'set-form')
    div.setAttribute('id', `set-${setCounter}`)
    setCounter += 1;
    div.innerHTML = formText;
    document.querySelector('#add-lift-form').appendChild(div)
})

REMOVE_SET_BUTTON.addEventListener('click', function() {
    setCounter -= 1;
    div = document.querySelector(`#set-${setCounter}`)
    div.remove();
})

ADD_EXERCISE_BUTTON.addEventListener('click', toggleNext)

ADD_EXERCISE_FORM_SUBMIT.addEventListener('submit', function() {
    let setArray = [];

    for (let i = 1; i < setCounter; i++) {
        setArray.push([document.querySelector(`#set-${i} [name=input-reps]`).value, 
        document.querySelector(`#set-${i} [name=input-weight]`).value])
    }

    event.preventDefault();
    fetch(EXERCISES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
            "sets": setArray,
            "name": document.querySelector('[name=input-exercise-name]').value,
        })
    })
    .then(resp => resp.json())
    .then(json => addExercise(json))
})

/*---------------------     RUN PROGRAM     -----------------------*/

run();
