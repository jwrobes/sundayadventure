class ActivitiesController < ApplicationController

  def index

  end

  def whatever
    foursqare_api_call = Foursquare::Activitycall.new({lat_and_long: params["lat_and_long"]})
    data = foursqare_api_call.activities
    render :json => data
  end

end
