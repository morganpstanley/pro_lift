class CreateLifts < ActiveRecord::Migration[6.0]
  def change
    create_table :lifts do |t|
      t.integer :reps
      t.integer :weight

      t.timestamps
    end
  end
end
