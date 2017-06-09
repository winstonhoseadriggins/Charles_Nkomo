
//Problem: User when clicking on image goes to a dead end
//Solution Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"><div></div></div>');
var $image = $("<img>");
var $caption = $("<p></p>");


//list index position to move forward and backwards by 1.
var $index = 0;

//Grabbing the list items from the imageGallery element and we are assigning the length total
//this makes it flexible to expand the gallery or take away
var $galleryLength = $(".lightbox li").length;

//2.1 An image
$overlay.children("div").append($image);


// Add some nav buttons and assign unique ids to them!
$overlay.children("div").append("<button id='btnPrev'> < </button>");
$overlay.children("div").append("<button id='btnClose'> X </button>");
$overlay.children("div").append("<button id='btnNext'> > </button>");

//2.2 add caption
$overlay.children("div").append($caption);


//2. Add overlay
$("body").append($overlay);


// Update image overlay

var updateImage = function(imageLocation, imageCaption){

  //1.2 update the overlay with the image linked in the link
  $image.attr("src", imageLocation);

  //1.3 Get child <img> data-title atrbute and set caption
  $caption.text(imageCaption);


};

//1. Click <a> event to an image
$(".lightbox a").click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  var imageCaption =  $(this).children("img").attr("data-title");

  //update index to current selected image
  $index = $(this).parent().index(); 

  //this is calling that new Update overlay function above
  updateImage(imageLocation, imageCaption);

  //1.1 Show the overlay
  $overlay.show(imageLocation);


});


//Button prev next function
var prevNext = function(prev ) {
  //set prev to true to move backwards in the index

  //if flag set move backwards, if not move forwards
  if(!prev) { $index++; }
  else { $index--; }

  //if out of index reset
  if ($index < 0) { $index = $galleryLength-1;}
  if ($index > 8) { $index = 0; }

  //Grab the element by index and then get the link
  var newImgSelected = $(".lightbox li").get($index).getElementsByTagName("a");

  //grab link information
  var imageLocation = $(newImgSelected).attr("href");
  var imageCaption =  $(newImgSelected).children("img").attr("data-title");

  //Update Overlay
  updateImage(imageLocation, imageCaption);
};


// Hide Overlay function
function hideOverlay() {
 $overlay.hide();
}


//Button events - CLICK

$("#btnPrev").click(function(event){
  prevNext(true);
});

$("#btnNext").click(function(event){
  prevNext();
});

// Exit button
$("#btnClose").click(function(){
   hideOverlay();
});


//When overlay is click
$overlay.click(function(event){
 // Hide the overlay  

   if(event.target.id == "overlay")
   $(this).slideUp("fast");
   hideOverlay;
});


/*****************************
KEYBOARD NAVIGATION
*****************************/


$(window).bind('keydown', function(e){
    if (e.keyCode == 37) {
         $('#btnPrev').click();

    } else if (e.keyCode == 39) {
         $('#btnNext').click();

    } else if (e.keyCode == 27) {
         $('#btnClose').click();

    }

});