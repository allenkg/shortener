class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :email, uniqueness: true
  validates_presence_of :name, :email, :password_digest

end
