class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :answer_group, index: true
      t.string :answer_text

      t.timestamps null: false
    end
    add_foreign_key :answers, :answer_groups
  end
end
