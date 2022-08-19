class ApiController < ActionController::API
  include JsonWebToken

  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers["Authorization"]
    header = header.split(" ").last if header

    begin
      @decoded = JsonWebToken.jwt_decode(header)
      @current_student = Student.find(@decoded[:student_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: {errors: e.message}, status: :unauthorized
    rescue JWT::DecodeError => e
      # Go and get new refresh-token
      render json: {errors: e.message}, status: :forbidden
    end
  end
end
