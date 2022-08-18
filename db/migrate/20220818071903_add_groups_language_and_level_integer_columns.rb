class AddGroupsLanguageAndLevelIntegerColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :groups, :language, :integer, default: 0
    add_column :groups, :level, :integer, default: 0
  end
end
