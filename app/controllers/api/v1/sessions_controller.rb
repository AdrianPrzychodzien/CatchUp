class Api::V1::SessionsController < ApiController
  skip_before_action :authenticate_request

  def create
    student = Student.find_by(email: params[:email])

    # authenticate
    if student&.valid_password?(params[:password])
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
  end
end
