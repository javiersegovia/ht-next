class Company < ApplicationRecord
  devise  :registerable, :database_authenticatable,
          :recoverable, :rememberable, :trackable, :validatable,
          :lockable, :confirmable #, :invitable

  before_create :add_jti

  def add_jti
    self.jti ||= SecureRandom.uuid
  end
end
