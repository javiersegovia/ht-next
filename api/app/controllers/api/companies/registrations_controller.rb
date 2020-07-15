class Api::Companies::RegistrationsController < Api::RegistrationsController

  def create
    resource = Company.find_by_email(sign_up_params[:email])

    if resource.present?
      return render json: { status: 400, error: 'email in use' }
    else
      resource = Company.new(sign_up_params)
    end

    if resource.valid?
      resource.save
      #token = Api::Authentications::JwtService.issue_token(resource.attributes.deep_symbolize_keys.slice(:email, :id))
      #render json: { status: 200, token: token }

      company = Company.find_by_email(resource.email)

      payload = { company_id: company.id }
      session = JWTSessions::Session.new(payload: payload)
      tokens = session.login

      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: false,
                          domain: nil,
                          secure: false)
      response.set_cookie(JWTSessions.refresh_cookie,
                          value: tokens[:refresh],
                          httponly: false,
                          domain: nil,
                          secure: false)

      render json: { csrf: tokens[:csrf] }
    else
      render json: { status: 400, errors: company.errors.details }, status: :unprocessable_entity
    end

  end

  private

  def current_company
    @current_company ||= Company.find(payload['company_id'])
  end
end