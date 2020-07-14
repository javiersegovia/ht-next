module Api::Authentications::JwtService

  def self.issue_token(payload)
    payload['exp'] = 24.hours.from_now.to_i # Set expiration to 24 hours.
    JWT.encode(payload, ENV['RAILS_DEVISE_JWT_SECRET_KEY'])
  end

  def self.valid?(token)
    begin
      JWT.decode(token, ENV['RAILS_DEVISE_JWT_SECRET_KEY'])
    rescue
      false
    end
  end
end