/*-------------------     GLOBAL VARIABLES     --------------------*/

const BASE_URL = "http://localhost:3000"
const EXERCISES_URL = `${BASE_URL}/exercises`
const LIFTS_URL = `${BASE_URL}/lifts`
let inputWeight = 0;
let inputReps = 0;

/*-----------------------     FUNCTIONS     -----------------------*/

function run() {
    createCalendar();
    addWorkoutVideoLinks();
    fetch(EXERCISES_URL)
    .then(resp => resp.json())
    .then(json => 
        json.forEach(exercise => {
            addExercise(exercise);
            markCalendar(exercise.date)
        })
    );
}

/*------------------     LIFT SECTION     ------------------*/

function addExercise(exercise) {
    const div = createDiv('lift')
    const innerDiv = createDiv('hidden sets')
    const errorDiv = createDiv('hidden error-message')
    const buttonText = `<span id="exercise-name"><b>${exercise.name}</b></span> <span id="exercise-date">${exercise.date}</span`
    const button = createButton(buttonText, toggleNext)

    //add each set
    for (i = 0; i < exercise.lifts.length; i++) {
        addLift(exercise.lifts[i], innerDiv, i+1)
    }

    //append all divs
    innerDiv.prepend(errorDiv)
    div.appendChild(button)
    div.appendChild(innerDiv)
    document.querySelector('#workouts').prepend(div);
}

function addLift(lift, div, setNum) {
    const innerDiv = createDiv('set')
    innerDiv.setAttribute('id', lift.id)
    innerDiv.innerHTML = 
        `<span class="set-number">${setNum}</span> 
        <span class="reps-n-sets"> 
            <span class="lift-reps">${lift.reps}</span> 
            <span class="x-symbol">✘</span> 
            <span class="lift-weight">${lift.weight}</span> 
        </span>`;
    editButton = createButton("✐", editForm)
    editButton.classList.add('edit-button')
    innerDiv.appendChild(editButton)
    div.appendChild(innerDiv)
}

function editForm() {
    if (this.previousElementSibling.querySelector('.lift-reps').isContentEditable) {
        submitEditForm(this.previousElementSibling)
    } else {
        inputWeight = this.previousElementSibling.querySelector('.lift-weight').innerText;
        inputReps = this.previousElementSibling.querySelector('.lift-reps').innerText;
        this.previousElementSibling.querySelector('.lift-reps').contentEditable="true"
        this.previousElementSibling.querySelector('.lift-weight').contentEditable="true"
        this.innerText = "EDITING...";
        this.classList.add('editing')
        this.previousElementSibling.classList.add('being-edited')
    }

}

function submitEditForm(set) {
    const liftId = set.parentElement.id
    const reps = set.querySelector('.lift-reps').innerText
    const weight = set.querySelector('.lift-weight').innerText;
    
    if (handleEditFormErrors(set, reps, weight)) {
        set.querySelector('.lift-reps').contentEditable="false"
        set.querySelector('.lift-weight').contentEditable="false"
        set.classList.remove('being-edited')
        set.nextElementSibling.innerText = "✐";
        set.nextElementSibling.classList.remove('editing')
        fetch(`${LIFTS_URL}/${liftId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
            },
            body: JSON.stringify({
                "reps": reps,
                "weight": weight,
            })
        })
    }
}

function handleEditFormErrors(set, reps = 0, weight = 0) {
    const div = set.parentElement.parentElement.querySelector('.error-message')
    div.classList.remove('hidden')
    if (!reps && !weight) {
        set.querySelector('.lift-reps').classList.add('error');
        set.querySelector('.lift-reps').innerText = inputReps;
        set.querySelector('.lift-weight').classList.add('error')
        set.querySelector('.lift-weight').innerText = inputWeight
        div.innerHTML = "ERROR - PLEASE ADD AMOUNT OF REPS AND WEIGHT"
        return 0
    } else if (!reps) {
        set.querySelector('.lift-reps').classList.add('error');
        set.querySelector('.lift-reps').innerText = inputReps;
        set.querySelector('.lift-weight').classList.remove('error')
        div.innerHTML = "ERROR - PLEASE ADD AMOUNT OF REPS"
        return 0
    } else if (!weight) {
        set.querySelector('.lift-weight').classList.add('error')
        set.querySelector('.lift-reps').classList.remove('error')
        set.querySelector('.lift-weight').innerText = inputWeight
        div.innerHTML = "ERROR - PLEASE ADD A WEIGHT"
        return 0
    } else {
        set.querySelector('.lift-weight').classList.remove('error')
        set.querySelector('.lift-reps').classList.remove('error')
        div.classList.add('hidden')
        return 1
    }
}

function handleAddFormErrors(form) {
    errors = 0

    if (form.querySelector('.error')) {
        form.querySelector('.error').classList.remove('error');
    }
    if (form.querySelector('[name=input-exercise-name]').value === "") {
        form.querySelector('[name=input-exercise-name]').classList.add('error')
        errors += 1;
    }
    for (let i = 1; i <= setCounter; i++) {
        if (form.querySelector(`#add-set-${i} [name=input-reps]`).value === "") {
            errors += 1;
            form.querySelector(`#add-set-${i} [name=input-reps]`).classList.add('error')
        }
        if (form.querySelector(`#add-set-${i} [name=input-weight]`).value === "") {
            errors += 1;
            form.querySelector(`#add-set-${i} [name=input-weight]`).classList.add('error')
        }
    }
    return errors  
}

function createDiv(classes) {
    div = document.createElement('div');
    div.className = `${classes}`;
    return div;
}

function createButton(innerString, clickEvent) {
    button = document.createElement('button')
    button.innerHTML = innerString
    button.addEventListener('click', clickEvent)
    return button
}

/*---------------------     CALENDAR     ---------------------*/

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];

function createCalendar() {
    fillCalendarLeft();
    fillCalendarRight()
    highlightToday();
}

function fillCalendarLeft() {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    digitize(day)

    document.querySelector('#calendar-day-day').innerText = day;
    document.querySelector('#calendar-day-month').innerText = month;
}

function fillCalendarRight() {
    let week = createWeek()
    let emptyCells = 0;

    //fill emtpy days on first calendar row
    while (getFirstDateOfMonth() !== days[emptyCells]) {
        createInactiveDay(week);
        emptyCells++
    }   

    //fill calendar
    for (let i = 0; i < daysInThisMonth(); i++) {
        if ((i + emptyCells) % 7 === 0) {
            week = createWeek()
        }
        createCalendarDay(i + 1, week)
    }

    //fill remaining days on last calendar row
    while ((daysInThisMonth() + emptyCells) % 7 !== 0) {
        createInactiveDay(week);
        emptyCells++
    }
}

//-------------CALENDAR HELPER METHODS-------------

function createWeek() {
    div = createDiv('week')
    document.querySelector('.days').appendChild(div)
    return div;
}

function createInactiveDay(week) {
    li = document.createElement('li')
    li.innerHTML = "00";
    li.classList.add('inactive')
    week.appendChild(li) 
}

function createCalendarDay(dateInt, week) {
        const day = digitize(dateInt)
        li = document.createElement('li')
        li.innerHTML = day;
        li.setAttribute('id', `day-${day}`)
        week.appendChild(li)
}

function markCalendar(date) {
    let [month, day, year] = date.split('/')
    year = "20" + year
    todayDate = new Date()
    todayDay = todayDate.getDate()
    todayMonth = todayDate.getMonth()
    todayMonth = "0" + (todayMonth + 1)
    todayYear = todayDate.getFullYear()
    if (year == todayYear && month == todayMonth) {
        if (document.querySelector(`#day-${day} .active`)) {
            markToday(day)
        } else {
            markDay(day)
        }
    }
}

function markToday() {
    document.querySelector('#worked-out').innerHTML = '✓'
}

function markDay(day) {
    document.querySelector(`#day-${day}`).innerHTML = `<span class='worked-out'>${day}</span>`
}

function highlightToday() {
    day = new Date().getDate();
    day = digitize(day)
    document.querySelector(`#day-${day}`).innerHTML = `<span class='active'>${day}</span>`
}

//-------------CALENDAR HELPER METHODS-------------

function digitize(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number
}

function daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

function getFirstDateOfMonth() {
    date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 1).toUTCString().split(',')[0].toUpperCase();
}

/*-------------------     WORKOUT VIDEOS     -------------------*/

function addWorkoutVideoLinks() {
    const videoLinks = {
        'bench-press': 'oaJVAxzoE0g', 
        'deadlift': 'r4MzxtBKyNE', 
        'push-up': 'cOiT2mELfCY', 
        'skull-crusher': 'NIWKqcmpBug', 
        'military-press': '47haESZnuiw', 
        'dumbell-row': 'roCP6wCXPqo', 
        'bicep-curl': 'hwidQWYkiRU', 
        'workout-music': 'hjpF8ukSrvk'
    }

    for (const link in videoLinks) {
        document.querySelector(`#${link}`).addEventListener('click', function() {
            event.preventDefault();
            document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${videoLinks[link]}"></iframe>`
        })
    }
}

/*--------------------     EVENT LISTENERS     --------------------*/

const ADD_SET_BUTTON = document.querySelector('#add-set-button');
const REMOVE_SET_BUTTON = document.querySelector('#remove-set-button');
const ADD_EXERCISE_BUTTON = document.querySelector('#add-exercise-button');
const ADD_EXERCISE_FORM_SUBMIT = document.querySelector('#add-exercise-form');
const formText = 'REPS <input type="text" name="input-reps" placeholder=""> <span>x</span> WEIGHT <input type="text" name="input-weight" placeholder="">';
let setCounter = 1;


function toggleNext() {
    this.nextElementSibling.classList.toggle('hidden')
}

ADD_SET_BUTTON.addEventListener('click', function() {
    setCounter += 1;
    div = createDiv('set-form');
    div.setAttribute('id', `add-set-${setCounter}`)
    div.innerHTML = formText;
    document.querySelector('#add-lift-form').appendChild(div)
})

REMOVE_SET_BUTTON.addEventListener('click', function() {
    setCounter -= 1;
    div = document.querySelector(`#add-set-${setCounter}`)
    div.remove();
})

ADD_EXERCISE_BUTTON.addEventListener('click', toggleNext)

ADD_EXERCISE_FORM_SUBMIT.addEventListener('submit', function() {
    event.preventDefault();

    //Check for errors
    if (handleAddFormErrors(this) !== 0) {
        document.querySelector('#add-exercise-form .error-message').classList.remove('hidden')
        document.querySelector('#add-exercise-form .error-message').innerText = "ERROR - PLEASE FILL EMPTY FIELDS"
        return false;
    }

    //Collect sets into an array
    let setArray = [];
    for (let i = 1; i <= setCounter; i++) {
        setArray.push([document.querySelector(`#add-set-${i} [name=input-reps]`).value, 
        document.querySelector(`#add-set-${i} [name=input-weight]`).value])
    }

    //Post Exercise
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
    .then(json => {
        addExercise(json)
        markToday()
        toggleNext.call(ADD_EXERCISE_BUTTON)
    })
})

/*---------------------     RUN PROGRAM     -----------------------*/

run();
