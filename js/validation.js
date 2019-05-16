$(function()
{
    initialize();
    subscribeToEvents();
});

let emailChanged = false;
let emailValidator = /^\S+@\S+[\.][0-9a-z]+$/;

function initialize()
{
    $(".validation-warning").hide();
}

function subscribeToEvents()
{
    $("input[type='email']").on("keyup", onEmailValidation);
    $("input[type='email']").on("change", onEmailChanged);
}

function onEmailValidation()
{
    if(emailChanged)
    {
        if(emailValidator.test($(this).val()))
        {
            $(this).next(".email-validation").hide(100);
        }
        else
        {
            $(this).next(".email-validation").show(100);
        }
    }
}

function onEmailChanged()
{
    if(!emailChanged)
    {
        emailChanged = true;

        if(emailValidator.test($(this).val()))
        {
            $(this).next(".email-validation").hide(100);
        }
        else
        {
            $(this).next(".email-validation").show(100);
        }
    }
}