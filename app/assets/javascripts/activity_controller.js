$(document).ready(function(){
  var activityController = new ActivityController();
  activityController.bindListeners();
});

var ActivityController = function(){

}

ActivityController.prototype = {
  bindListeners: function(){
    $('.door').click(this.newActivity.bind(this))
  },
  newActivity: function(e) {
    // grey out "shown" doors
    var target = $(e.currentTarget)
    this.disableShownDoor();
    this.setCurrentActivity(target);
    // get new activity from server
    var activity = this.getNewActivity();
    // show new activity
    this.showNewActivity(target, activity)
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
  getNewActivity: function() {
    return "Go for a walk in an unknown place..."
  }
}