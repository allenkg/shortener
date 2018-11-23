FactoryBot.define do
  factory :link do
    orig_link Faker::Internet.url
    short_link Faker::String.random(6)
  end
end