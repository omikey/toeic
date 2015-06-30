class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.string :identifier
      t.text :html

      t.timestamps null: false
    end
  end
end
