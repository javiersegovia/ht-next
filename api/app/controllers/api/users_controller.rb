class Api::UsersController < ApplicationController

  DEFAULT_PAGINTAION_PARAMS = { page: 1, per_page: 10 }

  def show
    users = User.paginate(pagination_params)

    @users = Api::Users::TransformeUsersService.(users)

    render json: { status: 200, users: @users }

  end

  private

  def sanitize_pagination_params
    params.permit(:page, :per_page).to_h.deep_symbolize_keys
  end

  def pagination_params
    DEFAULT_PAGINTAION_PARAMS.merge(sanitize_pagination_params)
  end

end