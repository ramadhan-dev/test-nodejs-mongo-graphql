module.exports = function() {
  var module = {};

  module.auth = function(string) {
    return string
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
      .replace(/^./, function(str) {
        return str.toUpperCase();
      });
  };

  return module;
};
