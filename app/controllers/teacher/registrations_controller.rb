class Teacher::RegistrationsController < Devise::RegistrationsController
  layout "devise"

  def after_sign_up_path_for(resource)
    teacher_dashboard_path
  end
end
