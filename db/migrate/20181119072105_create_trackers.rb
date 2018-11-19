class CreateTrackers < ActiveRecord::Migration[5.2]
  def change
    create_table :trackers do |t|
      t.string :location
      t.references :user, foreign_key: true
      t.references :link, foreign_key: true

      t.timestamps
    end
  end
end
