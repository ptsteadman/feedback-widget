window.onload = function() {

// TODO: add support for "attachEvent"
window.addEventListener('message', function (event) {
   if (event.origin == "http://localhost:8090") {
      xhr = new XMLHttpRequest();
      xhr.open('POST', '/', true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(event.data);
   }
}, false);

}