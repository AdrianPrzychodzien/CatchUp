class Teachers::RegistrationsController < Devise::RegistrationsController
  layout "devise"

  def after_sign_up_path_for(resource)
    teachers_dashboard_path
  end
end
