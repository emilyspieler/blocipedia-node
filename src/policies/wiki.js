const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

 // #2
  new() {
    return this._isAdmin();
    return this._isPremium();
  }

  create() {
    return this.new();
  }

 // #3
  edit() {
    return this._isOwner();
    return this._isAdmin();
    return this._isPremium();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this._isAdmin();
  }
}
