
    $(document).ready(function(){
        var bobina =  $('#bobina').show();
        var motor = $('#motor').hide();
        var titulo =  $('#titulo')
       
        $('#menu-toggle').click(function(e){
            e.preventDefault();
            $('#wrapper').toggleClass('toggled')
        })
        $('#siguiente').click(function(){
            bobina.hide();
            titulo.text('Informacion del motor');
            motor.show();
        });
        $('#atras').click(function(){
            bobina.show();
            titulo.text('Informacion de embobinado');
            motor.hide();
        })
            
        
    })