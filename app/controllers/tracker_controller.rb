class TrackerController < ApplicationController
  before_action :authorize_request
  before_action :tracker_params, only: [:show, :update, :destroy]


  def index
    @trackers = Tracker.all
    json_response(@trackers)
  end

  def show
    Tracker.create(tracker_params)
    json_response({status: 302, redirect_link: @link.orig_link})
  end

  def create
    @tracker = Tracker.create(tracker_params)
    if @tracker.save
      json_response(@tracker, :created)
    else
      json_response({error: 'Error check'})
    end
  end

  def update
  end

  def destroy
  end

  private

  def tracker_params
    @link = Link.find(params[:id])
    @geoip ||= GeoIP.new("#{Rails.root}/db/GeoIP.dat")
    remote_ip = request.remote_ip
    if remote_ip != "127.0.0.1"
      location_location = @geoip.country("#{remote_ip}")
      if location_location != nil
        @location = location_location[:country_name]
      end
    else
      location_location = @geoip.country('158.181.18.130')
      if location_location != nil
        @location = location_location[:country_name]
      end
    end
    return {
        user: current_user, link: @link, location: @location
    }
  end

end
