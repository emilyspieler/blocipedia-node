const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  create() {
    return this.new();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

  show() {
  if (user.currentUser || user.collaborator) {
    return true;
  }
  else {
    return false;
  }
}
}
