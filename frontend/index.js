const BASE_URL = "http://localhost:3000"
const EXERCISES_URL = `${BASE_URL}/exercises`

function run() {
    fetch(EXERCISES_URL)
    .then(resp => resp.json())
    .then(json => 
        json.forEach(exercise => {
            let p = document.createElement('p');
            p.innerText = exercise.name;
            document.querySelector('body').appendChild(p); 
        })
    );
}

run();