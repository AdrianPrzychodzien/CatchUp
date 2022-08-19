class Api::V1::SessionsController < ApiController
  skip_before_action :authenticate_request

  def create
    student = Student.find_by(email: session_params[:email])

    if student&.valid_password?(session_params[:password])
      access_token = Jwt::Encoder.call(student, response)

      render json: {
        status: :created,
        user: student.as_json(only: [:id, :email]),
        access_token: access_token
      }
    else
      render json: {status: 401}
    end
  end

  def destroy
    response.delete_cookie(:jwt)
    render json: {status: :ok}
  end

  private

  def session_params
    params.require(:student).permit(:email, :password)
  end
end
