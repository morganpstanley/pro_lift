class ExercisesController < ApplicationController
    skip_before_action :verify_authenticity_token
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
        date = Date.today.strftime("%m/%d/%y")
        exercise = Exercise.new(name: params[:name], date: date)
        if exercise.save
            params[:sets].each do |i|
                exercise.lifts.create(reps: i[0], weight: i[1])
            end
        end
        render json: exercise.to_json(:include => {
            :lifts => {:only => [:reps, :weight, :id]}
        })
    end

private

    def exercise_params
        params.require(:name).permit(:sets)
    end
end
