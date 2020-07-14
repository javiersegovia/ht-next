Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api, defaults: { format: :json } do
    devise_for :companies,
    only: [:sessions],
    controllers: { sessions: 'api/companies/sessions' }

    resource :users, only: [:show, :update]
  end

  #resource :companies, only: [:index]

end
