module Api::Users::TransformeUsersService

  FRONTEND_USER_KEYS = User::FRONTEND_USER_KEYS

  def self.call(users = [])
    usersParamsTransformer(users)
  end

  private

  def self.usersParamsTransformer(users)
    users.map do |user|
      user.attributes.deep_symbolize_keys.tap do |whitelist|
        whitelist[:userId] = whitelist[:id]
        whitelist[:fullName] = whitelist[:name]
        whitelist[:location] = whitelist[:residence_city]
        whitelist[:calification] = "Calificación #{whitelist[:calification]}/5"
        whitelist[:profilePercentage] = whitelist[:profile_completed_at]
        whitelist[:affinityPercentage] = whitelist[:affinity]
        whitelist[:currentState] = whitelist[:current_state]
        whitelist[:photo] = whitelist[:photo_path]
      end
      .slice(*FRONTEND_USER_KEYS)
    end
  end

end