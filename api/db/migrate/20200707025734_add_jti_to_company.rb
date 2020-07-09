class AddJtiToCompany < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :jti, :string

    # populate jti so we can make it not nullable
    Company.all.each do |company|
      company.update_column(:jti, SecureRandom.uuid)
    end

    change_column_null :companies, :jti, false
    add_index :companies, :jti, unique: true
  end
end
