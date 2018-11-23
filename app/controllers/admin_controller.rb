class AdminController < ApplicationController
  before_action :authorize_request
  before_action :set_link_proceed

  def index
    @link_proceeds != []
    if params[:search_query].present?
      @link_proceeds = LinkProceed.where('location like ?', "%#{params[:search_query]}%")
    else
      @link_proceeds = LinkProceed.limit("#{params[:per_page]}").offset("#{params[:offset]}")
    end
    if current_user.staff && @link_proceeds
      @response = []
      @all = LinkProceed.count
      @link_proceeds.each do |tracker|
        @response.push(
            {
                id: tracker.id,
                location: tracker.location,
                short_link: Link.find(tracker.link_id).short_link,
                user_email: User.find(tracker.user_id).email,
                user_id: tracker.user_id,
                link_id: tracker.link_id,
                created_at: tracker.created_at,
                total: @all,
                page_number: params[:page_number]
            })
      end
      json_response(@response)
    else
      json_response({error: 'You do not have permission for this page'})
    end
  end

  private

  def set_link_proceed
    params.permit(:page_number, :offset, :start_id, :search_query, :per_page)
  end

end
