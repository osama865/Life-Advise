/**
 * Usage:
 *
 *   var db = new IDBObserver({
 *     pollFrequency: 10000
 *   });
 *   db.start();
 *   db
 *     .subscribe(function() {
 *       // return IDBRequest
 *     })
 *     .then(function(result) {
 *       console.log(result.value);
 *     });
*/

 var _ = require('underscore'),
 Q = require('q'),
 debug = require('debug')('IDBObserver');

function IDBObserver(options) {
this._poll = this._poll.bind(this);
this._subscriptions = [];

if (options) {
 for (var key in options) {
   this[key] = options[key];
 }
}
}
module.exports = IDBObserver;

IDBObserver.debug = require('debug');

IDBObserver.prototype = {
pollFrequency: 1000,

start: function() {
 this._pollId = setTimeout(this._poll, this.pollFrequency);
},

stop: function() {
 return this._pollId && clearTimeout(this._pollId);
},

subscribe: function(query) {
 return new Promise(function(resolve, reject) {
   var request = query();

   request.onsuccess = function(event) {
     // Send back the initial value.
     var result = event.target.result;
     var updateable = new Updateable();
     updateable.setValue(result);
     resolve(updateable);

     // Create a subscription.
     this._subscriptions.push({
       previousValue: result,
       query: query,
       updateable: updateable
     });
   }.bind(this);

   request.onerror = function() {
     reject(request.error);
   };
 }.bind(this));
},

unsubscribe: function(query) {
 this._subscriptions = _.reject(
   this._subscriptions,
   function(subscription) {
     return subscription.query.toString() === query.toString();
   }
 );
},

_poll: function() {
 debug('Polling subscriptions.');
 var promises = this._subscriptions.map(function(subscription, index) {
   return new Promise(function(resolve, reject) {
     var previousValue = subscription.previousValue,
         query = subscription.query,
         updateable = subscription.updateable;

     var request = query();

     request.onsuccess = function(event) {
       var result = event.target.result;
       if (!_.isEqual(result, previousValue)) {
         debug('Invalidating cached value %s', previousValue);
         subscription.previousValue = result;
         updateable.setValue(result);
       }

       this._subscriptions[index] = subscription;
       resolve();
     }.bind(this);

     request.onerror = function() {
       debug('Error executing query');
       reject(request.error);
     };
   }.bind(this));
 }.bind(this));

 Q
   .all(promises)
   .then(
     function onFulfilled() {
       this._pollId = setTimeout(this._poll, this.pollFrequency);
     }.bind(this),
     function onRejected(error) {
       // TODO(gareth)
     }
   );
},

_pollId: null
};

function Updateable() {
}

Updateable.prototype = {
value: null,

setValue: function(value) {
 this.value = value;
 return this;
}
};
