class Exercise < ApplicationRecord
    has_many :lifts
    validates :name, :date, presence: true
end
