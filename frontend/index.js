/*___________________________________________________________________________
///////////////////////       GLOBAL VARIABLES        ///////////////////////
---------------------------------------------------------------------------*/


const BASE_URL = "http://localhost:3000"
const EXERCISES_URL = `${BASE_URL}/exercises`
const formText = '<input type="text" name="reps" placeholder="REPS"> x <input type="text" name="weight" placeholder="WEIGHT">'

/*___________________________________________________________________________
///////////////////////           FUNCTIONS           ///////////////////////
---------------------------------------------------------------------------*/


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
    button.innerHTML = `<b> ${exercise.name} </b> ${exercise.date}`
    div.appendChild(button)
    div.classList.add('lift');
    let innerDiv = document.createElement('div');
    innerDiv.style.display = 'none';
    exercise.lifts.forEach(lift => {
       addLift(lift, innerDiv)
    })
    div.appendChild(innerDiv)
    document.querySelector('body').appendChild(div);
    button.addEventListener('click', toggleNext)
}

function addLift(lift, div) {
    let p = document.createElement('p')
    liftString = lift.reps + " x " + lift.weight;
    p.innerHTML = liftString;
    div.setAttribute("id", "set");
    div.appendChild(p)
}

/*___________________________________________________________________________
///////////////////////       EVENT LISTENERS         ///////////////////////
---------------------------------------------------------------------------*/

const ADD_SET_BUTTON = document.querySelector('#add_input_field');
const ADD_WORKOUT_BUTTON = document.querySelector('#add_workout');


function toggleNext() {
    if (this.nextElementSibling.style.display === 'none') {
        this.nextElementSibling.style.display = 'block';
    } else {
        this.nextElementSibling.style.display = 'none';
    }
}

ADD_SET_BUTTON.addEventListener('click', function() {
    div = document.createElement('div');
    div.setAttribute('id', 'set_form')
    div.innerHTML = formText;
    document.querySelector('#reps_and_weight_input_form').appendChild(div)
})

ADD_WORKOUT_BUTTON.addEventListener('click', toggleNext)

/*___________________________________________________________________________
///////////////////////          RUN PROGRAM          ///////////////////////
---------------------------------------------------------------------------*/

run();