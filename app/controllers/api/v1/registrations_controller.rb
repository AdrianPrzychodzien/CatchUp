class Api::V1::RegistrationsController < ApiController
  skip_before_action :authenticate_request, only: [:create]

  def create
    student = Student.new(student_params)

    if student.save
      render json: {
        status: :created,
        user: student.as_json(only: [:id, :email]),
        token: jwt_encode(student_id: student.id)
      }
    else
      render json: {status: 401}
    end
  end

  def destroy
    student = Student.find(params[:id])

    if student.destroy
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
