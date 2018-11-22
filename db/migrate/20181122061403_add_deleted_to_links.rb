class AddDeletedToLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :links, :deleted, :boolean, :default => false
  end
end
