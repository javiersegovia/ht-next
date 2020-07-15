class Api::RegistrationsController < Devise::RegistrationsController
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

  skip_before_action :verify_authenticity_token, only: [:create]

  respond_to :json

  private

  def sign_up_params
    params.permit(:email, :password).to_h.deep_symbolize_keys
  end

  def not_authorized
    render json: { error: "Not authorized" }, status: :unauthorized
  end
end