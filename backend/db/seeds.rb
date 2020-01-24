# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Exercise.delete_all
Lift.delete_all

bench_press = Exercise.create(name: "Bench Press", date: "10/18/19")
shoulder_press = Exercise.create(name: "Shoulder Press", date: "10/18/19")
squat = Exercise.create(name: "Squat", date: "10/18/19")
deadlift = Exercise.create(name: "Deadlift", date: "10/19/19")

Lift.create(reps:8, weight:200, exercise_id:bench_press.id)
Lift.create(reps:5, weight:250, exercise_id:bench_press.id)
Lift.create(reps:1, weight:280, exercise_id:bench_press.id)

Lift.create(reps:10, weight: 120, exercise_id:shoulder_press.id)
Lift.create(reps:8, weight: 130, exercise_id:shoulder_press.id)
Lift.create(reps:5, weight: 140, exercise_id:shoulder_press.id)

Lift.create(reps:10, weight: 200, exercise_id:squat.id)
Lift.create(reps:8, weight: 225, exercise_id:squat.id)
Lift.create(reps:5, weight: 250, exercise_id:squat.id)

Lift.create(reps:5, weight: 350, exercise_id:deadlift.id)
Lift.create(reps:3, weight: 385, exercise_id:deadlift.id)
Lift.create(reps:1, weight: 415, exercise_id:deadlift.id)
