class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :latitude
      t.string :longitude
      t.string :address
      t.string :name
      t.text :url
      t.string :category
      t.timestamps
    end
  end
end
