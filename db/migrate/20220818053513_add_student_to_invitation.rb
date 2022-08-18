class AddStudentToInvitation < ActiveRecord::Migration[7.0]
  def change
    add_column :invitations, :student_id, :bigint
    add_index :invitations, :student_id
  end
end
