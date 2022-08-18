class DropGroupsLanguageAndLevelColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :groups, :language
    remove_column :groups, :level
  end
end
