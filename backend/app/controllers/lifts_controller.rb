class LiftsController < ApplicationController
    def index
        lifts = Lift.all
        render json: lifts
    end

    def destroy
        lift = Lift.find_by_id(params[:id])
        Lift.destroy(params[:id])
    end

    def create
        lift = Lift.create(reps: params[:reps], date: params[:amount])
        render json: lift
    end
end
