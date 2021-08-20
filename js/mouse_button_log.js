$('body').mousedown(function(event) {
    if(event.which ==5){
        //get full domain
        //const full = location.protocol + '//' + location.host;

        //redirect to new chapter
        window.location.href = $('#btn-chapter-next').attr("href");
    }
});