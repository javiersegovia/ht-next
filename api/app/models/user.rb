class User < ApplicationRecord

  FRONTEND_USER_KEYS = [
    :userId,
    :fullName,
    :location,
    :calification,
    :profilePercentage,
    :affinityPercentage,
    :currentState,
    :photo_path
  ]

  NEEDED_USER_KEYS = [
    :id,
    :name,
    :residence_city,
    :calification,
    :profile_completed_at,
    :affinity,
    :current_state,
    :photo
  ]

end
