(function ($) {

      _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
      };  

      var Feedback = Backbone.Model.extend({
        defaults: {
          id: 0,
          text: 'Empty.',
          date: 'No date.',
          satisfaction: 'No satisfaction.'
        }
      });

      var FeedbackList = Backbone.Collection.extend({
        model: Feedback,
        url: '/feedback'
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
          var feedbackList = this.collection = new FeedbackList();
          feedbackList.comparator = function(a, b) {
            if (a.get("id") > b.get("id")) return -1;
            if (a.get("id") < b.get("id")) return 1;
          };
          var self = this;
          feedbackList.fetch().complete(function(){
            self.render();
          });
    

          //this.$el.find("#filter").append(this.createSelect());
         // this.on("change:filterType", this.filterByType, this);
          //this.collection.on("reset", this.render, this);

          this.setUpSocket(feedbackList, self);
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
        },
        /*
        getTypes: function () {
            return _.uniq(this.collection.pluck("site"), false, function (site) {
                return site.toLowerCase();
            });
        },
         
        createSelect: function () {
            var filter = $.find("#filter"),
                select = $("<select/>", {
                    html: "<option>All</option>"
                });
         
            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });
            return select;
        },

        events: {
          "change #filter select": "setFilter"
        },

        setFilter: function (e) {
          this.filterType = e.currentTarget.value;
          this.trigger("change:filterType");
        },

        filterByType: function () {
          if (this.filterType === "all") {
            this.collection.reset();
          } else {
            this.collection.reset();
 
            var filterType = this.filterType,
              filtered = _.filter(this.collection.models, function (item) {
                console.log(item)
              return item.get("site").toLowerCase() === filterType;
          });
 
          this.collection.reset(filtered);
          }
        },

        */

        setUpSocket: function(feedbackList, self){
          io.set('transports', ['xhr-polling']);
          var socket = io.connect('http://feedback.psteadman.com');

          socket.on('new', function(){
            feedbackList.reset();
            feedbackList.fetch().complete(function(){
              $("#feedback").html("")
              self.render();
              console.log('new gotten');
            });
          });
        }



      });

      var listView = new ListView();


  var deleteAll = function(){
    return $.ajax({
      method: 'DELETE',
      url: 'feedback',
      dataType: 'json'
    }).done(function(){
      update();
    })
  }

  var createTable = function(){
    return $.ajax({
      method: 'POST',
      url: 'createTable',
      dataType: 'json',
      data: 'feedback'
    }).done(function(){
      update();
    })
  }

  var attachEventListeners = function(){
    $("#deleteAll").click(function(){
      deleteAll();
      console.log('deleting');
    });
    $("#createTable").click(function(){
      createTable();
      console.log('creating');
    });
  }

  attachEventListeners();

 
} (jQuery));