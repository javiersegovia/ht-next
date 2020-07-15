class Api::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: [:create]
  # skip_before_action :verify_authenticity_token
  # clear_respond_to
  respond_to :json

  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

  private

  def sign_in_params
    params.permit(:email, :password).to_h.deep_symbolize_keys
  end

  def current_company
    @current_company ||= Company.find(payload['company_id'])
  end
end