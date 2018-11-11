var min_date= new Date();  
min_date.setMinutes(min_date.getMinutes()-0.5); 
var errc=0; 

var auklandBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-37.186146, 174.382554),//southwest
    new google.maps.LatLng(-36.553339, 175.251847));//north east
 
  $(document).ready(function() {
    
   
        var options = {
          componentRestrictions: {
		  country: 'nz'},
			bounds: auklandBounds,
          strictBounds: true
          
        };
        var original = document.getElementById('Origin');
        var destiny = document.getElementById('Destination');
        var from_places = new google.maps.places.Autocomplete(original, options);
        var to_places = new google.maps.places.Autocomplete(destiny, options);
        google.maps.event.addListener(from_places, 'place_changed', function() {
            
           // var from_place = from_places.getPlace();
          //  var from_address = from_place.formatted_address;
           // $('#Origin').val(from_address);
          });
          google.maps.event.addListener(to_places, 'place_changed', function() {
            
           // var to_place = to_places.getPlace();
           // var to_address = to_place.formatted_address;
           // $('#Destination').val(to_address);
          });
   
          $('#DisatnceFare').on('click', function() { 

                
                var origin1 = $('#Origin').val();
                var destination1 = $('#Destination').val();
                var service = new google.maps.DistanceMatrixService();
                
                service.getDistanceMatrix({
                    origins: [origin1],
                    destinations: [destination1],
                    travelMode: google.maps.TravelMode.DRIVING,
                    // unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
                    unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                    avoidHighways: false,
                    avoidTolls: false
                  },callback);
                  

                  function callback(response, status) {
                   
                    if (status != google.maps.DistanceMatrixStatus.OK) {
                      $('#result').html(err);
                    } else {
                      var origin = response.originAddresses[0];
                      var destination = response.destinationAddresses[0];
                     
                      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                        $('#result').html("Better get on a plane. There are no roads between " + origin + " and " + destination);
                      } else {
						  var phno=$('#phno').val();
						if (origin.length ==0){alert ("Enter Valid Origin "); }
						else if (destination.length == 0){alert ("Enter Valid Destination ");}
						else if (phno.length == 0){alert ("Enter contact number ");}
						else {
						  
                        var distance = response.rows[0].elements[0].distance;
                        var duration = response.rows[0].elements[0].duration;
                        var fare_calc = (distance.value / 1000) * 3; // the mile

                        console.log(response.rows[0].elements[0].distance);
                        var distance_in_kilo = Math.ceil(distance.value / 1000); // the kilometers
                        
                        fare = distance_in_kilo * 3 ;
                        distanceKM = distance_in_kilo.toFixed(0);
                        var duration_text = duration.text;
                        var duration_value = duration.value;
                        trip_duration = duration.text;
                        var dttm_val=$('#dttm').val();
						
                        //alert ("distance :"+ distance_in_kilo +" kms " + "fare: "+ fare )
						
                        $('#ticket').text('From :'+origin1+
                        " \nTo :" + destination1 +"\nDistance :"+ distance_in_kilo +" kms " + "\nFare: "+ fare + "\nDate-Time:"+ dttm_val+ "\nContact Phone Number:"+ phno);
                       $('#Buyticket').data('item-quantity', distance_in_kilo);
			 $('#Buyticket').data('item-name',phno+" / "+dttm_val+" / "+ origin1 +"::to::" +destination1);
					   
						document.getElementById('welcomeDiv').style.display = "block";
						}
                      }
                    }
                  }
           });

  })
  
 
