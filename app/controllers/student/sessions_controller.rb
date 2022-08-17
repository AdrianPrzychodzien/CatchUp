class Student::SessionsController < Devise::SessionsController
  layout "devise"

  # def respond_to_on_destroy
  #   redirect_to after_sign_out_path
  # end

  def after_sign_in_path_for(resource)
    student_dashboard_path
  end
end
