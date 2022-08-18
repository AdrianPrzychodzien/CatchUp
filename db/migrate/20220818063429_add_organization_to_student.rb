class AddOrganizationToStudent < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :organization_id, :integer, foreign_key: true
  end
end
