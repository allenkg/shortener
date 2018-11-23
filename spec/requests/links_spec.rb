require 'rails_helper'

RSpec.describe 'Links API', type: :request do
  let!(:user) { create(:user) }
  let(:headers) { valid_headers }
  let!(:links) {create_list(:link, 10, user_id: user.id)}
  let(:link_id) {links.first.id}

  describe 'GET /api/links' do
    before {get '/api/links', params: {}, headers: headers}
    it 'returns links' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /api/links' do
    let(:valid_attributes) do
      {
          orig_link: 'https://www.google.ru/',
          short_link: 'vBiIbB',
          user_id: user.id
      }.to_json
    end

    context 'when the request is valid' do
      before {post '/api/links', params: valid_attributes, headers: headers}

      it 'create a link' do
        expect(json['orig_link']).to eq('https://www.google.ru/')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before {post '/api/links', params: {orig_link: 'bad_link'}.to_json, headers: headers}

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
            .to match("{\"error\":\"Error check\"}")
      end
    end
  end

  describe 'PUT /api/links/:id' do
    let(:valid_attributes) { { orig_link: 'https://www.example.com' }.to_json }

    context 'when the record exists' do
      before { put "/api/links/#{link_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /api/links/:id' do
    before { delete "/api/links/#{link_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end

end