require 'rails_helper'

RSpec.describe LinkProceed, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:link) }
end
