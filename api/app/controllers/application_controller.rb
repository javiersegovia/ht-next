class ApplicationController < ActionController::Base
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized


  protected

  def not_authorized
    render json: { error: "Not authorized" }, status: :unauthorized
  end

end