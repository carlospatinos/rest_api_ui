$(document).ready(function() {
    $.ajax({
        url: "https://say-my-name-carlos.herokuapp.com/showmyname"
    }).then(function(data, status, jqxhr) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
       console.log(jqxhr);
    });
});