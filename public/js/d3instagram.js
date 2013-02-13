$(document).ready(function(){

    window.animations[2] =  Backbone.View.extend({
        template: _.template($("#instagram-map-template").html()),
        className:  "intro",
        tag: 'li',
        el: ".blog-main",
        initialize: function(){
            _.bindAll(this, 'render');
            this.template = _.template($("#instagram-map-template").html());

        },
        render: function(){
            var that = this;
            //var countriesData =  var path = d3.geo.path().projection(countriesData);
            $(this.el).empty();
            $(this.el).append(this.template());
            d3.json(
            "/countries",
            function (json) {
                var width = 960,height = 1160;
                svg = d3.select(".blog-main").append("svg")
                .attr("width", width)
                .attr("height", height);
                var path = d3.geo.path()
                    .projection(d3.geo.mercator()
                    .scale(900).translate([500, 500])
                    );
                svg.append("g")
                    .attr("class", "black")
                        .selectAll("path")
                        .data(json.features)
                        .enter()
                        .append("path")
                        .attr("d", path);
            });
            var doStuff = function(){
                var points = d3.geo.mercator().scale(900).translate([500, 500])([-120.665606609,37.961217383])
                svg.append("svg:circle")
                .attr("cx", points[0])
                .attr("cy", points[1]).attr("r",2)
                .style("stroke", "rgb(6,120,155)");
            }
            setTimeout(doStuff,300);
       


        }


    });


});