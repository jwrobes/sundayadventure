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
    }).done(function(data){  })
    //WE NEED TO DO SOMETHING WITH THE DATA
  }
}
