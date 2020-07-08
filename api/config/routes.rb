Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Devise (login/logout) for HTML requests
  # devise_for :companies,
  #   defaults: { format: :html },
  #   path: '',
  #   path_names: { sign_up: 'register' },
  #   controllers: {
  #   sessions: 'sessions',
  #   registrations: 'registrations',
  #   confirmations: 'confirmations'
  # }

  # devise_scope :company do
  #   get 'sign_in', to: 'devise/sessions#new'
  #   get 'register', to: 'devise/registrations#new'
  #   post 'register', to: 'devise/registrations#create'
  #   delete 'sign_out', to: 'devise/sessions#destroy'
  #   get 'confirmation/sent', to: 'confirmations#sent'
  #   get 'confirmation/:confirmation_token', to: 'confirmations#show'
  #   patch 'confirmation', to: 'confirmations#create'
  # end

  # API namespace, for JSON requests at /api/sign_[in|out]
  namespace :api do
    devise_for :companies,
      defaults: { format: :json },
      class_name: 'ApiCompany',
      skip: [:invitations, :passwords, :confirmations, :unlocks], # :registrations,
      path: '',
      path_names: {
        sign_in: 'login',
        sign_out: 'logout'
      }

    devise_scope :company do
      get 'login', to: 'devise/sessions#new'
      delete 'logout', to: 'devise/sessions#destroy'
      post 'register', to: 'devise/registrations#create'
    end
  end
end
