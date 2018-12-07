const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  create() {
    return this.new();
  }

  createPrivate() {
    return this.newPrivate();
  }

  createCollaboration() {
    return this.newCollaboration();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
