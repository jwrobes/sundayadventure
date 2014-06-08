$(document).ready(function(){
  var activityController = new ActivityController();
  activityController.bindListeners();
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

  getLocation: function() {
    navigator.geolocation.getCurrentPosition(this.checkLocation.bind(this));
  },

  checkLocation: function(position) {
    console.log(position)
    var activityLocation = this.getActivityLocation()
    this.compareLocation(position, activityLocation)
  },

  compareLocation: function(position, activityLocation) {
    if (position == activityLocation) {
      clearCookies;
      location.reload();
    }
    else {
      alert("Nice try!")
    }
  },

  getActivityLocation: function() {

  }


}