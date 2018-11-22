class LinksController < ApplicationController
  before_action :authorize_request
  before_action :set_link, only: [:update, :destroy]

  def index
    @links = Link.all
    json_response(@links)
  end

  def create
    @link = current_user.links.new(link_params)
    if @link.save
      json_response(@link, :created)
    else
      json_response({error: 'Error check'})
    end
  end

  def update
    @link.update(link_params)
    head :no_content
  end

  def destroy
    @link.destroy
    head :no_content
  end

  private

  def link_params
    params.permit(:orig_link, :short_link)
  end

  def set_link
    @link = Link.find(params[:id])
  end

end
