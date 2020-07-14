class Api::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  clear_respond_to
  respond_to :json

  private

  def sign_in_params
    params.permit(:email, :password).to_h.deep_symbolize_keys
  end
end