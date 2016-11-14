$(function() {
  var m = {
    showResult: function(message) {
      $('#result').html("<div class='alert alert-success'>");
      $('#result > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
      $('#result > .alert-success')
        .append("<strong>"+message+"</strong>");
      $('#result > .alert-success')
        .append('</div>');
    },
    showError: function(message) {
      $('#result').html("<div class='alert alert-danger'>");
      $('#result > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#result > .alert-danger').append("<strong>"+message+"</strong>");
      $('#result > .alert-danger').append('</div>');
    }
  };
  $('#submitBtn').on('click', function() {
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();

      var error = false;
      if (! name) {
          $("#nameError").html('名前を入力してください');
          error = true;
      }
      if (! email) {
          $("#emailError").html('メールアドレスを入力してください');
          error = true;
      }
      if (! message) {
          $("#messageError").html('メッセージを入力してください');
          error = true;
      }
      if (error) {
          return false;
      }

      $("#submitBtn").attr("disabled", true);
      $("#submitBtn").html("<span class=\"loader\"></span>Sending..");
      $("#result").html('');

      $.ajax({
        url: "../mail/contact.php",
        type: "POST",
        data: {
          name: name,
          email: email,
          message: message
        },
        cache: false,
        success: function(res) {
          $("#submitBtn").attr("disabled", false);

          if (res.result) {
            m.showResult(res.message);
          } else {
            m.showError(res.message);
          }

          $("#submitBtn").html("Send");
          $('#contactForm').trigger("reset");
        },
        error: function() {
          $("#submitBtn").attr("disabled", false);

          m.showError("エラーが発生しました<br>contact"+"@"+"freks.jpまでご連絡ください");

          $("#submitBtn").html("Send");
          $('#contactForm').trigger("reset");
        },
      });
  });

  $('#name').focus(function() {
    $('#result').html('');
    $("#nameError").html('');
  });
  $('#email').focus(function() {
    $('#result').html('');
    $("#emailError").html('');
  });
  $('#message').focus(function() {
    $('#result').html('');
    $("#messageError").html('');
  });
});
