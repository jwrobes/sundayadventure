class ActivitiesController < ApplicationController

  def index

  end

  def whatever
    foursqare_api_call = Foursquare::Activitycall.new({lat_and_long: params["lat_and_long"]})
    data = foursqare_api_call.activities
    set_cookies(data)
    render :json => data
  end

  def set_cookies(data)
    cookies[:door_one_name] = data[:door_one][:name]
    cookies[:door_one_category] = data[:door_one][:category]

    cookies[:door_two_name] = data[:door_two][:name]
    cookies[:door_two_category] = data[:door_two][:category]

    cookies[:door_three_name] = data[:door_three][:name]
    cookies[:door_three_category] = data[:door_three][:category]

    # cookies[:user_name] = "Aiko"
    # cookies[:lat] = 12.23
    # cookies[:lon] = 23.44
    # cookies[:login] = { value: "YAYYYYYYYY", expires: 1.minute.from_now }
  end

end
