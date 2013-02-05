$(document).ready(function(){
	window.animations = {};
	window.animations[1] =  Backbone.View.extend({
		template: _.template($("#foamback-template").html()),
		className:	"intro",
		tag: 'li',
		el: ".blog-main",
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($("#foamback-template").html());

		},
		render: function(){
			var that = this;
			$(this.el).empty();
			$(this.el).append(this.template());
			var canvas = new fabric.Canvas('foambackCanvas', { width: 800, height: 500 });
			for (var i = 0; i< 100; i++){
				fabric.Image.fromURL('https://s3.amazonaws.com/tarareynvaan/gregsfoamback+(1).png', function(img) {
	    			img.set('left', fabric.util.getRandomInt(000, 800));
	    			img.set('top', fabric.util.getRandomInt(200, 500));

	    			img.xDirection = 1;
	    			img.yDirection = 1;
	    			img.setWidth(30);
	    			canvas.add(img);
	  			});
			}
			var animate = function(){
			 canvas.forEachObject(function(obj) {
			    obj.left += obj.xDirection
			    obj.top += obj.yDirection
			    if (obj.left > 800){
			    	obj.xDirection = -1;
			    }
			    else if (obj.left<0){
			    	obj.xDirection = 1;
			    };
			    if ( obj.top > 500) {
					obj.yDirection = -1;
			    }
			    else if( obj.top < 200){
			   		
			      obj.yDirection = 1;
			    };
			
			  });
			  canvas.renderAll();
			  setTimeout(animate, 20);
			}
			setTimeout(animate, 30);
			return this;
		}


	});

	window.animations[2] =  Backbone.View.extend({
		template: _.template($("#snailhouse-template").html()),
		tag: 'li',
		el: ".blog-main",
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($("#snailhouse-template").html());

		},
		render: function(){
			var bubbleCounter = 0;
			var mooCounter = 0;
			var horseCounter = 0;
			$(this.el).empty();
			$(this.el).append(this.template());
			var canvas = new fabric.Canvas('snailhouseCanvas', { width: 800, height: 1200 });
			$("canvas").css("height","1500px");
			fabric.Image.fromURL('https://s3.amazonaws.com/tarareynvaan/climber.png', function(img) {
				img.set('left', 300);
				img.set('top', 300);
				img.set('climber',true);
				img.setWidth(30);
				canvas.add(img);
	  		});
	  		var animate = function(){
	  		 bubbleCounter ++;
	  		 if(bubbleCounter === 5){
	  		 	fabric.Image.fromURL('https://s3.amazonaws.com/tarareynvaan/speech.png', function(img) {
					img.set('left', fabric.util.getRandomInt(200, 600));
					img.set('top', 370);
					img.set('scaleY', .5)
					img.set('bubble',true);
					canvas.add(img);
	  			});
	  		 }
	  		 mooCounter ++;
	  		 if(mooCounter === 10){
	  		 	fabric.Image.fromURL('https://s3.amazonaws.com/tarareynvaan/moo.png', function(img) {
					img.set('left', fabric.util.getRandomInt(000, 800));
					img.set('top', 370);
					img.set('scaleY', .5)
					img.set('moo',true);
					canvas.add(img);
	  			});
	  		 }
	  		 horseCounter ++;
	  		 if(horseCounter === 30){
	  		 	fabric.Image.fromURL('https://s3.amazonaws.com/tarareynvaan/Horse.png', function(img) {
					img.set('left', 800);
					img.set('top', 380);
					img.set('scaleY', .3)
					img.set('horse',true);
					canvas.add(img);
	  			});
	  		 }
			 canvas.forEachObject(function(obj) {
			    if(obj.get("climber")){
				    obj.top -= 1;
				    obj.setAngle(obj.getAngle() + 10);
				    console.log(obj.top);
				    if (obj.top < 100) {
	      				canvas.remove(obj);
	      				fabric.Image.fromURL('https://s3.amazonaws.com/tarareynvaan/climber.png', function(img) {
							img.set('left', fabric.util.getRandomInt(200, 500));
							img.set('top', 300);
							img.set('climber',true);
							img.set('scaleY', .7)
							img.setWidth(30);
							canvas.add(img);
		  				});
	    			}
    			}
    			else if(obj.get("bubble")){
    				if(bubbleCounter > 30){
    					canvas.remove(obj);
    					bubbleCounter = 0;
    				}
    			}
    			else if (obj.get("moo") && mooCounter > 40){
    				    canvas.remove(obj);
    					mooCounter = 0;	
    			}
    			else if (obj.get("horse")){
    					obj.left -= 10;
    					if(obj.left<100){
    						canvas.remove(obj);    						 
    						horseCounter = 0;	
    					}
    				   
    			}
			
			  });
			  canvas.renderAll();
			  setTimeout(animate, 100);
			}
			setTimeout(animate, 30);
			return this;
		}


	});
});