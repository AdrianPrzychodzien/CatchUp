class AddTeacherToStudent < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :teacher_id, :integer
  end
end
