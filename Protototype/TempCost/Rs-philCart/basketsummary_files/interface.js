Seam.Remoting.type.ServerSideStateChecker = function() {
  this.__callback = new Object();
  Seam.Remoting.type.ServerSideStateChecker.prototype.sessionOk = function(p0, callback, exceptionHandler) {
    return Seam.Remoting.execute(this, "sessionOk", [p0], callback, exceptionHandler);
  }
  Seam.Remoting.type.ServerSideStateChecker.prototype.longRunningConversationOk = function(p0, p1, callback, exceptionHandler) {
    return Seam.Remoting.execute(this, "longRunningConversationOk", [p0, p1], callback, exceptionHandler);
  }
}
Seam.Remoting.type.ServerSideStateChecker.__name = "ServerSideStateChecker";

Seam.Component.register(Seam.Remoting.type.ServerSideStateChecker);

