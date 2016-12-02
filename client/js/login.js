$(document).ready(() => {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }

    const sendAjax = (action, data) => {
      console.log(data);
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
              console.log(result);
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
              const messageObj = JSON.parse(xhr.responseText);
              handleError(messageObj.error);
              console.log(xhr.resonseText);
              console.log(status);
              console.log(error);
            }
        });
    }

    $("#signupSubmit").on("click", (e) => {
        e.preventDefault();

        $("#domoMessage").animate({width:'hide'},350);

        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }

        if($("#pass").val() !== $("#pass2").val()) {
            handleError("RAWR! Passwords do not match");
            return false;
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

        return false;
    });

    $("#loginSubmit").on("click", (e) => {
        e.preventDefault();

        $("#domoMessage").animate({width:'hide'},350);

        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("RAWR! Username or password is empty");
            return false;
        }

        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
});
