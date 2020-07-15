class ApplicationController < ActionController::Base
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized


  protected

  # def verify_jwt_token
  #   head :unauthorized if request.headers['Authorization'].nil? ||
  #     !Api::Authentications::JwtService.valid?(request.headers['Authorization'].split(' ').last)
  # end

  def not_authorized
    render json: { error: "Not authorized" }, status: :unauthorized
  end

end