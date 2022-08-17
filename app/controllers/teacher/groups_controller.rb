class Teacher::GroupsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_columns, only: [:index, :show]

  layout "admin"

  def index
    @groups = current_teacher.groups
  end

  def show
    @group = Group.find(params[:id])
  end

  private

  def select_columns
    @select_columns = ["id", "name", "language", "level", "students", "created_at"]
  end
end
