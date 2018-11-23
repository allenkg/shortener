require "rails_helper"

RSpec.describe LinksController, type: :controller do
  let!(:user) { create(:user) }
  let!(:links) { create_list(:link, 10, user_id: user.id) }
  describe "GET index" do
    it "assigns @links" do
      get :index
      expect(assigns(:links)).to eq(@links)
      expect(response.content_type).to eq "application/json"
    end
  end
end