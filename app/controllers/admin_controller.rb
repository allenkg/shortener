class AdminController < ApplicationController
  before_action :authorize_request

  def index
    @link_proceeds = LinkProceed.all
    if current_user.staff
      json_response(@link_proceeds)
    else
      json_response({error: 'You do not have permission for this page'})
    end
  end

end
