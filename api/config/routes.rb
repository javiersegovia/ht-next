Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  devise_for :companies
  devise_scope :company do
    post "api/login" => "api/companies/sessions#create"
    post "api/signup" => "api/companies/registrations#create"
  end

  namespace :api, defaults: { format: :json } do
    resource :users, only: [:show, :update]
  end

end
