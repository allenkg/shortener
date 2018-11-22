class Link < ApplicationRecord
  belongs_to :user

  validates :orig_link, presence: true, on: :create
  validates_format_of :orig_link,
                      with: /\A(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@,!:%_\+.~#?&\/\/=]*)?\z/
  before_create :generate_short_link

  def generate_short_link
    chars = ['0'..'9','A'..'Z','a'..'z'].map{|range| range.to_a}.flatten
    self.short_link = 6.times.map{chars.sample}.join
    self.short_link = 6.times.map{chars.sample}.join until Link.find_by_short_link(self.short_link).nil?
  end

  def find_duplicate
    Link.find_by_orig_link(self.orig_link)
  end

  def new_url?
    find_duplicate.nil?
  end

end
