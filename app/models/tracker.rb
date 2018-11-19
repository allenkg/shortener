class Tracker < ApplicationRecord
  belongs_to :user
  belongs_to :link
  attr_accessor :remote_ip


end
