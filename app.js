var app = angular.module('myApp',[]);

app.run([function () { }]);

app.controller('MainController', ['$scope', function ($scope){
  $scope.image = null;
  $scope.imageFileName = '';
  
  $scope.uploadme = {};
  $scope.uploadme.src = '';
}]);

app.directive('fileDropzone', function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },
    link: function(scope, element, attrs) {
      var checkSize,
          isTypeValid,
          processDragOverOrEnter,
          validMimeTypes;
      
      processDragOverOrEnter = function (event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      
      validMimeTypes = attrs.fileDropzone;
      
      checkSize = function(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };

      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);

      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function(evt) {
          if (checkSize(size) && isTypeValid(type)) {
            return scope.$apply(function() {
              scope.file = evt.target.result;
              if (angular.isString(scope.fileName)) {
                return scope.fileName = name;
              }
            });
          }
        };
        file = event.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        return false;
      });
    }
  };
})


.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

$(function() {
  $('#new').click(function() {
      var new_offset = {top:100, left:400};
    var new_width = 128;
    var new_height = 38;
    var newElement$ = $('<div>Drag Here<button class=btn btn-success onclick=fun(this)>X</button><textarea id="textarea" placeholder="Point something and write about it."></textarea></div>')
     .width(new_width)
     .height(new_height)
     .draggable({
        //cancel: "text",
        start: function (){
            $('#textarea').focus();
         },
        stop: function (){
            $('#textarea').focus();
         } 
     })
     
.css({
'position': 'absolute'
})
.offset(new_offset)
.appendTo('body');
});

// //REPLACE 'container' WITH THE ID OF ELEMENT WHERE TO DRAW ARROWS
// var elm_container = document.querySelector('#container');

// //Draw arrows with SVG in the $parent element between the click coords
// function drawArrowSVG(parent){
// //From: http://coursesweb.net/javascript/
//  var me = this;
//  var x, y = 0;  //contain the coordinates
//  var drawarrow =0;  //if 2, draw the arrow
//  var c_e1 ={};  // x,y coords for base line
//  var c_e2 ={};  // x,y coords for arrow
//  var container = parent;
//  me.draw =-1;  //if 1 allow to draw the arrow

//  // Get X and Y position of the elm (from: vishalsays.wordpress.com)
//  function getXYpos(elm) {
//    x = elm.offsetLeft;        // set x to elm’s offsetLeft
//    y = elm.offsetTop;         // set y to elm’s offsetTop

//    elm = elm.offsetParent;    // set elm to its offsetParent

//    //use while loop to check if elm is null
//    // if not then add current elm’s offsetLeft to x
//    //offsetTop to y and set elm to its offsetParent
//    while(elm != null) {
//      x = parseInt(x) + parseInt(elm.offsetLeft);
//      y = parseInt(y) + parseInt(elm.offsetTop);
//      elm = elm.offsetParent;
//    }

//    // returns an object with "xp" (Left), "=yp" (Top) position
//    return {'xp':x, 'yp':y};
//  }

//  // Get X, Y coords
//  function getCoords(e){
//    //if $draw is 1, get the coords and draw arrow
//    if(me.draw ==1){
//      var xy_pos = getXYpos(this);

//      // if IE
//      if(navigator.appVersion.indexOf("MSIE") != -1) {
//        // in IE scrolling page affects mouse coordinates into an element
//        // This gets the page element that will be used to add scrolling value to correct mouse coords
//        var standardBody = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

//        x = event.clientX + standardBody.scrollLeft;
//        y = event.clientY + standardBody.scrollTop;
//      }
//      else {
//        x = e.pageX;
//        y = e.pageY;
//      }

//      x = x - xy_pos['xp'];
//      y = y - xy_pos['yp'];

//      //set coords in c_e2 and c_e1; if drawarrow is 2 draw the arrow
//      drawarrow++;
//      if(drawarrow ==2){
//        c_e2 = {x:x, y:y};
//        drawarrow =0;
//        drawArrow(c_e1, c_e2);
//      }
//      else c_e1 = {x:x, y:y};
//    }
//  }

//  //append in #container SVG arrow with base in $c_e1 and the arrow in $c_e2 coords
//  function drawArrow(c_e1, c_e2){
//    var arrsvg = '<div><button class=btn btn-success onclick=fun(this)>X<svg class="arrsvg" style="position:absolute; top:0; left:0; margin:0; width:99.8%; height:99.9%;"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refx="3" refy="4" orient="auto"><path d="M1,1 L1,7 L7,4 L1,1" style="fill:black;" /></marker></defs><path d="M'+ c_e1.x +','+ c_e1.y +' L'+ c_e2.x +','+ c_e2.y +'" style="stroke:red; stroke-width: 2.3px; fill: none; marker-end: url('+ location.href.replace(/[#]*$/ig, '') +'#arrow);"/></svg></button></div>';
//    container.insertAdjacentHTML('beforeend', arrsvg);  //add the arrow to the end in #container
//  }

//  //register click on $container to get the coords
//  container.addEventListener('click', getCoords);
// }

// //draw arrow with SVG between the clicks coords in $elm_container
// var drawAr = new drawArrowSVG(elm_container);

// //register click on #btn_drawar to enable /disable drawing action
// var btn_drawar = document.getElementById('btn_drawar');
// if(btn_drawar) btn_drawar.addEventListener('click', function(e){
//  drawAr.draw *=-1;
//  e.target.style.background = (drawAr.draw ==1) ? '#f00' :'#014c8c';
//  e.target.innerHTML = (drawAr.draw ==1) ? 'Disable Drawing' :'Draw Aroow Here';
// });

// //register click on #btn_delar to delete arrows
// var btn_delar = document.getElementById('btn_delar');
// if(btn_delar) btn_delar.addEventListener('click', function(e){
//  var arrsvg = document.querySelector('.arrsvg').remove();
// //for(var i=0; i<arrsvg.length; i++) arrsvg[i].outerHTML ='';
// });
// if(btn_delar) btn_delar1.addEventListener('click', function(e){
//   var arrsvg = document.querySelectorAll('.arrsvg');
// for(var i=0; i<arrsvg.length; i++) arrsvg[i].outerHTML ='';

// });
});
$(document).ready(function(){
  $('#mybtn').click(function(){
      $('#container').append("<div class=window id=bar1><div class=bar><button style=margin-left:10px; onclick=fun(this)>X</button></div><div contentEditable=true class=textbox placeholder=type..></div></div>");
      $(".window").draggable();
  });

 $('#mybtn2').click(function(){
      $('#container2').append("<div class=row12><div class=row1><button style=margin-left:-115px onclick=funct(this)>X</button></div><div id=rowid><div class=triangle-left id=part1></div><div id=part2></div><div class=triangle-right id=part3></div></div><div>");
      $(".row12").draggable({handle:".row1"});
  });
 
 $('#mybtn3').click(function(){
      $('#container3').append("<div class=row112><div class=row1><button style=margin-left:-115px onclick=funct(this)>X</button></div><div id=rowid><div class=triangle-left id=part1></div><div id=part2></div><div class=triangle-right id=part3></div></div><div>");
      $(".row112").draggable({handle:".row1"});
  });

  $(".textbox").on("click", function(e) {
      $(".window").draggable('disable');
      $(this).find(".textbox").focus();
  });
  $(".textbox").on("blur", function(){
      $(".window").draggable('enable');
  });

}); 

  function fun(elemObj)
  {
  $(elemObj).parent().remove();
  }
  function funct(elemObj)
  {
    $(elemObj).parent().parent().remove();
  }
  