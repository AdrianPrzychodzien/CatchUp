class Teacher::RegistrationsController < Devise::RegistrationsController
  layout "devise"

  def after_sign_up_path_for(resource)
    teacher_dashboard_path
  end

  private

  def sign_up_params
    params.require(:teacher).permit(:name, :email, :password, :password_confirmation, :organization_id)
  end
end
