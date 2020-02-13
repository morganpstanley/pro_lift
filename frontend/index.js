/*-------------------     GLOBAL VARIABLES     --------------------*/

const BASE_URL = "http://localhost:3000"
const EXERCISES_URL = `${BASE_URL}/exercises`
const LIFTS_URL = `${BASE_URL}/lifts`
const formText = 'REPS <input type="text" name="input-reps" placeholder=""> <span>x</span> WEIGHT <input type="text" name="input-weight" placeholder="">'

/*-----------------------     FUNCTIONS     -----------------------*/

function run() {
    createCalendar();
    fetch(EXERCISES_URL)
    .then(resp => resp.json())
    .then(json => 
        json.forEach(exercise => {
            addExercise(exercise);
            markCalendar(exercise.date)
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
    innerDiv.classList.add('hidden', 'sets');
    for (i = 0; i < exercise.lifts.length; i++) {
        addLift(exercise.lifts[i], innerDiv, i+1)
    }
    div.appendChild(innerDiv)
    document.querySelector('#workouts').appendChild(div);
    button.addEventListener('click', toggleNext)
}

function addLift(lift, div, setNum) {
    let innerDiv = document.createElement('div')
    innerDiv.setAttribute('id', lift.id)
    innerDiv.classList.add('set')
    liftString = `<span class="set-number">${setNum}</span> <span class="reps-n-sets"> <span class="lift-reps">${lift.reps}</span> <span class="x-symbol">x</span> <span class="lift-reps">${lift.weight}</span> </span>`
    innerDiv.innerHTML = liftString;
    editButton = document.createElement('button')
    editButton.innerText = "✐"
    editButton.classList.add('edit-button')
    innerDiv.appendChild(editButton)
    div.appendChild(innerDiv)
}

// CALENDAR
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
    div = document.createElement('div')
    div.classList.add('week')
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

//WORKOUT VIDEOS
const benchPress = "oaJVAxzoE0g";
const deadlift = "r4MzxtBKyNE";
const pushUp = "cOiT2mELfCY";
const skullCrusher = "NIWKqcmpBug";
const militaryPress = "47haESZnuiw"
const dumbellRow = "roCP6wCXPqo"
const bicepCurl = "hwidQWYkiRU"
const workoutMusic = "hjpF8ukSrvk"

document.querySelector('#bench-press').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${benchPress}"></iframe>`
})

document.querySelector('#deadlift').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${deadlift}"></iframe>`
})

document.querySelector('#push-up').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${pushUp}"></iframe>`
})

document.querySelector('#skull-crusher').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${skullCrusher}"></iframe>`
})

document.querySelector('#military-press').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${militaryPress}"></iframe>`
})

document.querySelector('#dumbell-row').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${dumbellRow}"></iframe>`
})

document.querySelector('#bicep-curl').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${bicepCurl}"></iframe>`
})

document.querySelector('#workout-music').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#workout-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${workoutMusic}"></iframe>`
})


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
    div.setAttribute('id', `add-set-${setCounter}`)
    setCounter += 1;
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
    let setArray = [];

    for (let i = 1; i < setCounter; i++) {
        setArray.push([document.querySelector(`#add-set-${i} [name=input-reps]`).value, 
        document.querySelector(`#add-set-${i} [name=input-weight]`).value])
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
    .then(json => {
        addExercise(json)
        markToday()
        toggleNext.call(ADD_EXERCISE_BUTTON)
    })
})

/*---------------------     RUN PROGRAM     -----------------------*/

run();
