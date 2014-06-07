
require 'pry'
require 'httparty'

module Foursquare
  class Activitycall
    include HTTParty
    def initialize(search_params ={})
      @long_and_lat = search_params[:long_and_lat]
      @section = 'outdoors'
      ## hardcoded v for date need make updatable
      @options =  {:query => {v: "20131016", ll:@long_and_lat, section: @section,
                      "client_id" =>"A0HOXGS3TDR3NVABD1Q2LGQ5WDGN4USBKPVUHDMHMCOHSZQ4",
                      "client_secret" => "MU3RCF4YXGVELYX5FNTPTYUIMI1DRIPU2O11CN5UQ1VY1HE2"}}
    end

    def activities
      response = self.class.get('https://api.foursquare.com/v2/venues/explore', @options)
      parseForActivities(response.body)
    end

    def parseForActivities(response)
      parsed_data = JSON.parse(response)
      choices = {door_one:{}, door_two: {}, door_three: {}}
      choices[:door_one] = return_activity(rand(1..10), parsed_data)
      choices[:door_two] = return_activity(rand(1..10), parsed_data)
      choices[:door_three] = return_activity(rand(1..10), parsed_data)
      choices
    end

    def return_activity(activity_number,parsed_data)
      name = parsed_data["response"]["groups"][0]["items"][activity_number]["venue"]["name"]
      category = parsed_data["response"]["groups"][0]["items"][activity_number]["venue"]["categories"][0]["name"]
      location = parsed_data["response"]["groups"][0]["items"][activity_number]["venue"]["location"]
      url = parsed_data["response"]["groups"][0]["items"][activity_number]["venue"]["url"]
      {name: name, category: category, location: location, url: url}
    end
  end
end

test = Foursquare::Activitycall.new({long_and_lat: '37.7871067,-122.399357'})

p test.activities

