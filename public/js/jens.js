window.JensCounter = Backbone.Model.extend({

});
window.Jenses = Backbone.Collection.extend({
    model: JensCounter,
    url: "/jenscounter"
});
window.jenses = new Jenses();
jenses.fetch();

$(document).ready(function(){
    window.JensView = Backbone.View.extend({
        el: "#main",
        collection: window.jens,
        initialize: function(){
            _.bindAll(this, 'render');
            this.template = _.template($("#jens-template").html());
            this.render();
        },
        render: function(){
            var x, y, width, height, data;
            $(this.el).empty();
            $(this.el).append(this.template());

            var data = [{count_date: "2013-02-19", count: "17"},
            {count_date: "2013-02-20", count: "18"},
            {count_date: "2013-02-21", count: "15"},
            {count_date: "2013-02-22", count: "20"},
            {count_date: "2013-02-23", count: "22"},
            {count_date: "2013-02-24", count: "45"}];

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 700 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var svg = d3.select(".ondra-counter").append("svg")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .attr("color","black");
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            var yAxis = d3.svg.axis().scale(y).orient("left");

            var parseDate = d3.time.format("%Y-%m-%d").parse;

            data.forEach(function(d) {
                d.date = parseDate(d.count_date);
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));          
            y.domain(d3.extent(data, function(d) { return d.count; }));

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.count); });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Count");

            svg.append("path")
                .datum(data)
                .attr("class", "line")
               .attr("d", line);
            return this;
        }
    });
});