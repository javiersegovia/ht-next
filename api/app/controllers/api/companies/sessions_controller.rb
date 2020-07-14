class Api::Companies::SessionsController < Api::SessionsController

  def create
    company = Company.find_by_email(sign_in_params[:email])
    if company&.valid_password?(sign_in_params[:password])
      token = Api::Authentications::JwtService.issue_token(company.attributes.deep_symbolize_keys.slice(:email, :id))
      render json: { status: 200, token: token }
    else
      render json: { status: 400, errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end

  end

  private

  def sign_in_params
    params.permit(:email, :password).to_h.deep_symbolize_keys
  end

end