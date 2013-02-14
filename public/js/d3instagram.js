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
            var svg;
            var dotCounter = 0;
            var that = this;
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
                        .attr("d", path)
                        .style("stroke", "rgb(6,120,155)");
            });
            $(".instagram-search-container .search").click(function(){
                dotCounter = 0;
                svg.selectAll("circle").remove();
                searchInstagram("https://api.instagram.com/v1/tags/"+$(".search-term").val()+"/media/recent?access_token=306225576.f59def8.ddd35b2913c945d8b6f0e88f840c9944&callback=?");
            });
            var searchInstagram = function(url){                
                $.getJSON(url, function(data){
                    for(var i = 0; i<data.data.length;i++){
                        var hashtag = data.data[i];
                        if(hashtag.location && hashtag.location.longitude && hashtag.location.latitude){
                            dotCounter++;
                            var points = d3.geo.mercator().scale(900).translate([500, 500])([hashtag.location.longitude,hashtag.location.latitude])
                            svg.append("svg:circle")
                            .attr("cx", points[0])
                            .attr("cy", points[1]).attr("r",5)
                            .style("stroke", "rgb(178,34,34)")
                            .style("fill","rgb(178,34,34)")
                            .attr("thing",hashtag.images.standard_resolution.url)
                            .on("click", function(d,i) {
                                console.log(this.attributes.thing);

                            });
                        }
                    }
                    if(dotCounter<100 && data.pagination.next_url){
                       searchInstagram(data.pagination.next_url+"&callback=?");
                    }
                });
            }
        }
    });


});