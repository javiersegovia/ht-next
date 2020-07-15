class Api::SessionsController < Devise::SessionsController
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

  skip_before_action :verify_authenticity_token, only: [:create, :logout]
  before_action :authorize_access_request!, only: [:logout]

  # skip_before_action :verify_authenticity_token
  respond_to :json

  private

  def sign_in_params
    params.permit(:email, :password).to_h.deep_symbolize_keys
  end

  def current_company
    @current_company ||= Company.find(payload['company_id'])
  end

  def not_authorized
    render json: { error: "Not authorized" }, status: :unauthorized
  end
end