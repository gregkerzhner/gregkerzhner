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
            $(this.el).empty();
            $(this.el).append(this.template());
            return this;
        }
    });
});