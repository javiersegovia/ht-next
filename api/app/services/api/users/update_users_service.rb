module Api::Users::UpdateUsersService

  NEEDED_USER_KEYS = User::NEEDED_USER_KEYS

  def self.call(user_params)
    user_updater(user_params)
  end

  private

  def self.users_params_replacer(user)
      user.tap do |whitelist|
        whitelist[:name] = whitelist[:fullName] if whitelist[:fullName].present?
        whitelist[:residence_city] = whitelist[:location] if whitelist[:location].present?
        whitelist[:profile_completed_at] = whitelist[:profilePercentage] if whitelist[:profilePercentage].present?
        whitelist[:affinity] = whitelist[:affinityPercentage] if whitelist[:affinityPercentage].present?
        whitelist[:current_state] = whitelist[:currentState] if whitelist[:currentState].present?
        whitelist[:photo_path] = whitelist[:photo] if whitelist[:fullphotoName].present?
      end
      .slice(*NEEDED_USER_KEYS)
  end

  def self.user_updater(user_params)
    user_id = user_params.delete(:id)
    found_user = user_finder(user_id)
    puts found_user
    return [nil, {errors: 'user not found'}] if found_user.nil?

    update = found_user.update(users_params_replacer(user_params))

    result = update ? {message: "user updated"} : { errors: found_user.errors.details }

    [update, result]
  end

  def self.user_finder(user_id)
    User.find_by id: user_id
  end

end