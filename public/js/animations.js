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
});