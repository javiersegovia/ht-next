class AddCalificationToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :calification, :integer
    add_column :users, :current_state, :string
  end
end
