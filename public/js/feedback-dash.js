(function ($) {
  $.ajax({
    url: 'feedback',
    type: 'GET',
    dataType: 'json'
  }).done(function(data){

    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };  

    var Feedback = Backbone.Model.extend({
      defaults: {
        ID: 0,
        fbText: 'Empty.'
      }
    });

    var FeedbackList = Backbone.Collection.extend({
      model: Feedback
    });

    var FeedbackView = Backbone.View.extend({
      tagName: 'article',
      className: 'feedback-container',
      template: $("#feedbackTemplate").html(),

      render: function(){
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        return this;
      }
    });

    var ListView = Backbone.View.extend({
      el: $("#feedback"),

      initialize: function(){
        this.collection = new FeedbackList(data);
        this.render();
      },

      render: function(){
        var that = this;
        _.each(this.collection.models, function(item){
          that.renderFeedback(item);
        }, this);
      },

      renderFeedback: function(item){
        var feedbackView = new FeedbackView({
          model: item
        });
        this.$el.append(feedbackView.render().el);
      }
    });

    var listView = new ListView();

  });
} (jQuery));