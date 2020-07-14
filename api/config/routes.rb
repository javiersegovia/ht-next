Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #namespace :api, defaults: { format: :json } do

    devise_for :companies
    devise_scope :company do
      post "login" => "api/companies/sessions#create"
      post "sigup" => "api/companies/registrations#create"
    end


    resource :users, only: [:show, :update]
  #end

end
