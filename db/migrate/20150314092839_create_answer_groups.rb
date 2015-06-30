class CreateAnswerGroups < ActiveRecord::Migration
  def change
    create_table :answer_groups do |t|
      t.references :test, index: true
      t.boolean :blank

      t.timestamps null: false
    end
    add_foreign_key :answer_groups, :tests
  end
end
