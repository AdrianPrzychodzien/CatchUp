class Teacher::StudentsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_columns, only: [:index, :show]
  before_action :set_student, only: [:show, :edit, :update, :destroy]

  layout "admin"

  def index
    @students = current_teacher.students
  end

  def show
    @student_group = @student.group
  end

  def edit
  end

  def update
    if @student.update(create_student_params)
      redirect_to [:teacher, @student], notice: t(".success_msg")
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_student
    @student = Student.find(params[:id])
  end

  def select_columns
    @select_columns = ["id", "email", "group_id", "created_at"]
  end

  def create_student_params
    params.require(:student).permit(:group_id)
  end
end
