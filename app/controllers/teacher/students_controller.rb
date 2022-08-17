class Teacher::StudentsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_columns, only: [:index, :show]

  layout "admin"

  def index
    @students = current_teacher.students
  end

  def show
    @student = Student.find(params[:id])
    @student_group = @student.group
  end

  private

  def select_columns
    @select_columns = ["id", "email", "group_id", "created_at"]
  end
end
