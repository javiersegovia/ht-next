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
      token = Api::Authentications::JwtService.issue_token(resource.attributes.deep_symbolize_keys.slice(:email, :id))
      render json: { status: 200, token: token }
    else
      render json: { status: 400, errors: company.errors.details }, status: :unprocessable_entity
    end

  end
end