class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.references :user, index: true
      t.string :identifier
      t.text :html

      t.timestamps null: false
    end
    add_foreign_key :details, :users
  end
end
