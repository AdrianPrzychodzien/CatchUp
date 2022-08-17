class Manager::RegistrationsController < Devise::RegistrationsController
  layout "devise"

  def after_sign_up_path_for(resource)
    manager_dashboard_path
  end

  private

  def sign_up_params
    params.require(:manager).permit(:name, :email, :password, :password_confirmation, :organization_id)
  end
end
