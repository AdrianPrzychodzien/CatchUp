class AddOrganizationToTeachers < ActiveRecord::Migration[7.0]
  def change
    add_reference :teachers, :organization, foreign_key: true
  end
end
