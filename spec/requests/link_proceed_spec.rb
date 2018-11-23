require 'rails_helper'

RSpec.describe 'Link Proceed API', type: :request do
  let!(:user) {create(:user)}
  let!(:link) {create(:link, user_id: user.id)}
  let!(:link_proceeds) {create_list(:link_proceed, 10, user_id: user.id, link_id: 1)}
  let(:headers) {valid_headers}


  describe 'GET /api/link_proceeds' do
    before {get '/api/link_proceeds', params: {}, headers: headers}
    it 'returns link proceed' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/link_proceed/:id' do

    context 'when the request is valid' do
      before {get "/api/link_proceeds/#{link.id}", params: {}, headers: headers}

      it 'create a link proceed' do
        expect(json['redirect_link']).to eq(link.orig_link)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

end