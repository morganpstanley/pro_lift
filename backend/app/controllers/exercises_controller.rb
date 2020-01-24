class ExercisesController < ApplicationController
    def index
        exercises = Exercise.all
        render json:  exercises.to_json(:include => {
            :lifts => {:only => [:reps, :weight, :id]}
        })
    end

    def destroy
        exercise = Excercise.find_by_id(params[:id])
        Exercise.destroy(params[:id])
    end

    def create
        exercise = Exercise.create(name: params[:name], date: params[:date])
        render json: exercise
    end
end
