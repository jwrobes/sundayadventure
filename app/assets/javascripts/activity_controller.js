$(document).ready(function(){
  var activityController = new ActivityController();
  activityController.bindListeners();
  // debugger
  navigator.geolocation.getCurrentPosition(function(position){activityController.getAPI(position);})
  // activityController.getAPI();

});

var ActivityController = function(){

}

ActivityController.prototype = {
  bindListeners: function(){
    $('.container').on('click', '.door', this.newActivity.bind(this))
    $('.container').on('click', '.complete', this.getLocation.bind(this))
  },
  newActivity: function(e) {
    var target = $(e.currentTarget)
    var doorId = target.attr('data-id')

    if (target.hasClass('alert-success')) {
      this.selectActivity(doorId)
    }
    else if ($('.alert-danger').length === 1&&target.hasClass('alert-warning')) {
      this.selectActivity(doorId)
    }
    else if (target.hasClass('alert-warning')) {
      this.disableShownDoor();
      this.setCurrentActivity(target);
      var activity = this.getNewActivity(doorId);
      this.showNewActivity(target, activity);
    }
  },
  selectActivity: function(doorId) {
    $('.activity-detail[data-id='+doorId+']').show()
    $('.door').hide()
  },
  disableShownDoor: function(){
    previousActivity = $('.alert-success')
    previousActivity.removeClass('alert-success')
    previousActivity.addClass('alert-danger')
  },
  setCurrentActivity: function(target) {
    target.removeClass('alert-warning')
    target.addClass('alert-success')
  },
  showNewActivity: function(target, activity) {
    target.text(activity)
  },

  getNewActivity: function(doorId) {
    return $('.activity-detail[data-id='+doorId+'] .hint').text()
  },

  getAPI: function (position) {

    var lat_and_long = position.coords.latitude + "," + position.coords.longitude
    var jhqxr = $.ajax({
      url: "activities/whatever",
      type: 'get',
      data: {lat_and_long: "37.784440499,-122.39697729"}
    }).done(this.renderActivities.bind(this))
  },

  renderActivities: function(data) {
    $('.door').show()
    $('.loading').hide()
    $('.activity-detail[data-id=1] .activity-name').text(data.door_one.name)
    $('.activity-detail[data-id=2] .activity-name').text(data.door_two.name)
    $('.activity-detail[data-id=3] .activity-name').text(data.door_three.name)
  },

  getLocation: function() {
    navigator.geolocation.getCurrentPosition(this.checkLocation.bind(this));
  },

  checkLocation: function(position) {
    console.log(position)
    var activityLocation = this.getActivityLocation()
    this.compareLocation(position, activityLocation)
  },

  compareLocation: function(position, activityLocation) {
    var distance=this.distanceBetween(position, activityLocation)
    console.log(distance);
    if (distance < 0.0025) {
      this.clearCookies;
      location.reload();
    }
    else {
      alert("Nice try!")
    }
  },

  getActivityLocation: function() {
    return {
      latitude:37.783644, longitude:-122.398855
    }
  },

  clearCookies: function() {
    document.cookie="";
  },

  distanceBetween: function(position, activityLocation) {
    var squared_lat=Math.pow((position.coords.latitude-activityLocation.latitude), 2);
    var squared_lng=Math.pow((position.coords.longitude-activityLocation.longitude), 2);
    return Math.sqrt(squared_lat+squared_lng);
  }

}
