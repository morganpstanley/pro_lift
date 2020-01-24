const BASE_URL = "http://localhost:3000"
const EXERCISES_URL = `${BASE_URL}/exercises`

function run() {
    fetch(EXERCISES_URL)
    .then(resp => resp.json())
    .then(json => 
        json.forEach(exercise => {
            let div = document.createElement('div');
            div.innerHTML = `<b> ${exercise.name} </b> `
            div.classList.add('lift');
            exercise.lifts.forEach(lift => {
                let p = document.createElement('p')
                liftString = lift.reps + " x " + lift.weight;
                console.log(liftString)
                p.innerHTML = liftString;
                div.appendChild(p)
            })
            document.querySelector('body').appendChild(div); 
        })
    );
}

run();