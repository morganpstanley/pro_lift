class Lift < ApplicationRecord
    belongs_to :exercise

    validates :reps, :weight, presence: true
end
