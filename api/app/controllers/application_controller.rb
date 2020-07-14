class ApplicationController < ActionController::Base

  protected

  def verify_jwt_token
    head :unauthorized if request.headers['Authorization'].nil? ||
      !Api::Authentications::JwtService.valid?(request.headers['Authorization'].split(' ').last)
  end

end