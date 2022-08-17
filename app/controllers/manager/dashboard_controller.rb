class Manager::DashboardController < ApplicationController
  before_action :authenticate_manager!

  layout "teacher"

  def index
  end
end
