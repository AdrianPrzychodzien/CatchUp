class Api::V1::RefreshTokenController < ApiController
  skip_before_action :authenticate_request

  def create
    jwt = request.cookies["jwt"]
    refresh_token = RefreshToken.find_by_token(jwt)

    if refresh_token&.is_valid?
      render json: {
        status: :created,
        access_token: JsonWebToken.jwt_encode(student_id: refresh_token.student_id)
      }
    else
      render json: {status: :unauthorized}, status: :unauthorized
    end
  end
end
