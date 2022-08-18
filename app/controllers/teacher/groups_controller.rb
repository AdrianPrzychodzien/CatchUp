class Teacher::GroupsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_columns, only: [:index, :show]
  before_action :set_group, only: [:show, :edit, :update, :destroy]

  layout "admin"

  def new
    @group = current_teacher.groups.new
  end

  def index
    @groups = current_teacher.groups
  end

  def show
  end

  def edit
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

  def update
    if @group.update(create_group_params)
      redirect_to [:teacher, @group], notice: t(".success_msg")
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @group.destroy
    redirect_to [:teacher, :groups], status: :see_other, notice: t(".success_msg")
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def select_columns
    @select_columns = ["id", "name", "language", "level", "students", "created_at"]
  end

  def create_group_params
    params.require(:group).permit(:name, :language, :level)
  end
end
