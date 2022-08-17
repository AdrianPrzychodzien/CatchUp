class AddOrganizationToManager < ActiveRecord::Migration[7.0]
  def change
    add_reference :managers, :organization, foreign_key: true
  end
end
