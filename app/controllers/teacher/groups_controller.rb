class Teacher::GroupsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_columns, only: [:index, :show]

  layout "admin"

  def new
    @group = current_teacher.groups.new
  end

  def index
    @groups = current_teacher.groups
  end

  def show
    @group = Group.find(params[:id])
  end

  def create
    @group = current_teacher.groups.build(create_group_params)
    @group.organization = current_teacher.organization

    if @group.save
      redirect_to [:teacher, @group], notice: t(".success_msg")
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def select_columns
    @select_columns = ["id", "name", "language", "level", "students", "created_at"]
  end

  def create_group_params
    params.require(:group).permit(:name, :language, :level)
  end
end
