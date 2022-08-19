class Api::V1::RegistrationsController < ApiController
  skip_before_action :authenticate_request, only: [:create]

  def create
    student = Student.new(student_params)

    if student.save
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
    student = Student.find(params[:id])

    if student.destroy
      response.delete_cookie(:jwt)
      render json: {status: :ok}
    else
      render json: {status: :unauthorized}
    end
  end

  private

  def student_params
    params.require(:student).permit(:email, :password, :password_confirmation, :token)
  end
end
