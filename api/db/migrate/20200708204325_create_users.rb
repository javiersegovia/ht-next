class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :residence_city
      t.string :affinity
      t.string :profile_completed_at
      t.string :photo_path
    end
  end
end
