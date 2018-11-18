class CreateLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :links do |t|
      t.string :orig_link
      t.string :short_link

      t.timestamps
    end
  end
end
