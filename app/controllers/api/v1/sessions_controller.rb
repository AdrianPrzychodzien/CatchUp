class Api::V1::SessionsController < ApiController
  skip_before_action :authenticate_request

  def create
    student = Student.find_by(email: params[:email])

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
    current_student.update(auth_token: nil)

    # logout
    # reset_session
    # redirect_to root_path
    render json: {status: 200}
  end
end
