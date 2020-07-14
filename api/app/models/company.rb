class Company < ApplicationRecord
  devise  :registerable, :database_authenticatable,
          :recoverable, :rememberable #, #:trackable, :validatable
          #:lockable, :confirmable, :invitable
end
