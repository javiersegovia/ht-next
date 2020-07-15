class Api::Companies::SessionsController < Api::SessionsController
  before_action :authorize_access_request!, only: [:destroy]

  def create
    company = Company.find_by_email!(sign_in_params[:email])
    if company&.valid_password?(sign_in_params[:password])
      #token = Api::Authentications::JwtService.issue_token(company.attributes.deep_symbolize_keys.slice(:email, :id))
      payload = { company_id: company.id }
      session = JWTSessions::Session.new(payload: payload)
      tokens = session.login

      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: true,
                          secure: Rails.env.production?)
      response.set_cookie(JWTSessions.refresh_cookie,
                          value: tokens[:refresh],
                          httponly: true,
                          secure: Rails.env.production?)

      render json: { csrf: tokens[:csrf] }
    else
      render json: "Invalid email or password", status: :unauthorized
    end

  end

  def destroy
    session = JWTSessions::Session.new(payload: payload)
    session.flush_by_access_payload
    render json: :ok
  end

end