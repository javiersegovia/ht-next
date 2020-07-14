class Api::UsersController < ApplicationController

  before_action :verify_jwt_token

  DEFAULT_PAGINTAION_PARAMS = { page: 1, per_page: 10 }

  def show
    users = User.paginate(pagination_params)

    @users = Api::Users::TransformeUsersService.(users)

    render json: { status: 200, users: @users, nextPage: determinate_next_page(pagination_params) }
  end

  def update
    update, result = Api::Users::UpdateUsersService.(sanitize_user_params)

    render json: { status: update ? 200: 400, user: result }
  end

  private

  def sanitize_pagination_params
    params.permit(:page, :per_page).to_h.deep_symbolize_keys
  end

  def pagination_params
    numeric_sanitize_pagination_params = sanitize_pagination_params.map { |key, value| [key, value.to_i] }.to_h
    DEFAULT_PAGINTAION_PARAMS.merge(numeric_sanitize_pagination_params)
  end

  def sanitize_user_params
    params.permit(:id, *User::FRONTEND_USER_KEYS).to_h.deep_symbolize_keys
  end

  def determinate_next_page(pagination_params)

    next_page = pagination_params[:page] + 1
    User.paginate(page: next_page, per_page: pagination_params[:per_page]).empty? ? nil : next_page
  end

end