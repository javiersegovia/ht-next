class User < ApplicationRecord

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


end
