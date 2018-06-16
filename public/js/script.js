$(document).ready(function(){
    fillNews();
    $(".createForm").hide();
    $(".buttonCreate").find(".fa-plus-square").click(function(){
        $(".createForm").slideToggle();
    });
});

let fillNews = () => {
    let template = document.getElementById("news-template").innerHTML;
    $.get( "http://localhost:8090/api/events", function( data ) {
        let renderedHTML = Mustache.render(template, { news: data });
        $(".news-container").html(renderedHTML);
        $(".singleNewsForm").hide();
        $(".singleNews").find(".fa-pencil-square").click(function(){
            $(this).parent().parent().parent().find(".singleNewsForm").slideToggle();
        });
        $('.fa-window-close').click(function(){
            let btn = $(this);
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8090/api/remove',
                data: {tagName:btn.attr('name')}
            }).done(function(data) {
                fillNews();
            }).fail(function(data) {
                // Optionally alert the user of an error here...
            });
        });
    });
}

$(function() {
    $('#addNewsForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize()
        }).done(function(data) {
            fillNews();
            $('.createForm').find('input:text, textarea').val('');
            $('.createForm').find('select').val('Новости');
            $(".createForm").hide();
        }).fail(function(data) {
            // Optionally alert the user of an error here...
        });
    });
});



