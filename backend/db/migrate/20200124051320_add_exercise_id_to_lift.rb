class AddExerciseIdToLift < ActiveRecord::Migration[6.0]
  def change
    add_column :lifts, :exercise_id, :integer
  end
end
