// App functions!

function goToToday() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  window.location = "/day/" + year + "/" + month + "/" + day;
  return false;
}
