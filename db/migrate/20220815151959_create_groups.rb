class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :teacher, foreign_key: true
      t.string :name
      t.string :language
      t.string :level

      t.timestamps
    end
  end
end
