
Array.prototype.where = function(predicate) {
    return this.filter(predicate);
  };
  
  // Método firstOrDefault
  Array.prototype.firstOrDefault = function(predicate) {
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        return this[i];
      }
    }
    return null;
  };
  