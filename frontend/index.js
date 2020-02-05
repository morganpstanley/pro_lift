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
const ADD_EXERCISE_BUTTON = document.querySelector('#add-exercise-button');

function toggleNext() {
    this.nextElementSibling.classList.toggle('hidden')
}

ADD_SET_BUTTON.addEventListener('click', function() {
    div = document.createElement('div');
    div.setAttribute('id', 'set-form')
    div.innerHTML = formText;
    document.querySelector('#add-lift-form').appendChild(div)
})

ADD_EXERCISE_BUTTON.addEventListener('click', toggleNext)

/*---------------------     RUN PROGRAM     -----------------------*/

run();
