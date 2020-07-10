module Api::Users::TransformeUsersService

  FRONTEND_USER_KEYS = [
    :fullName,
    :location,
    :calification,
    :profilePercentage,
    :affinityPercentage,
    :currentState,
    :photo_path
  ]

  NEEDED_USER_KEYS = [
    :name,
    :residence_city,
    :calification,
    :profile_completed_at,
    :affinity,
    :current_state,
    :photo
  ]

  def self.call(users = [])
    usersParamsTransformer(users)
  end

  private

  def self.usersParamsTransformer(users)
    users.map do |user|
      user.attributes.deep_symbolize_keys.tap do |whitelist|
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