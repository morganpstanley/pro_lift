class LiftsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        lifts = Lift.all
        render json: lifts
    end

    def destroy
        lift = Lift.find_by_id(params[:id])
        Lift.destroy(params[:id])
    end

    def create
        binding.pry
        lift = Lift.create(reps: params[:reps], date: params[:amount])
        render json: lift
    end

    def show
        lift = Lift.find_by_id(params[:id])
        render json: lift
    end

    def update
        lift = Lift.find_by_id(params[:id])
        lift.update(lift_params)
        render json: lift
    end

private

def lift_params
    params.permit(:reps, :weight)
end
end
