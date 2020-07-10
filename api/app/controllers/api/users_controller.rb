class Api::UsersController < ApplicationController

  DEFAULT_PAGINTAION_PARAMS = { page: 1, per_page: 10 }

  def show
    users = User.paginate(pagination_params)

    @users = Api::Users::TransformeUsersService.(users)

    render json: { status: 200, users: @users, next_page: determinate_next_page(pagination_params) }

  end

  private

  def sanitize_pagination_params
    params.permit(:page, :per_page).to_h.deep_symbolize_keys
  end

  def pagination_params
    numeric_sanitize_pagination_params = sanitize_pagination_params.map { |key, value| [key, value.to_i] }.to_h
    DEFAULT_PAGINTAION_PARAMS.merge(numeric_sanitize_pagination_params)
  end

  def determinate_next_page(pagination_params)

    next_page = pagination_params[:page] + 1
    User.paginate(page: next_page, per_page: pagination_params[:per_page]).empty? ? nil : next_page
  end

end