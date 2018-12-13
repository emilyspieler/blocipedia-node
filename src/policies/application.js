module.exports = class ApplicationPolicy {

      constructor(user, record, collaborators) {
         this.user = user;
         this.record = record;
         this.collaborators = collaborators;
      }

      _isOwner() {
         return this.record && (this.record.userId == this.user.id);
      }

      _isAdmin() {
         return this.user && this.user.role == 2;
      }

      _isPremium() {
          return this.user && this.user.role === 1;
        }

      _isStandard() {
          return this.user && this.user.role === 0;
        }

      new() {
         return this.user != null;
      }

      show() {
         return true;
      }

      edit() {
        return this.user != null;
      }

      update() {
      return this.edit();
      }

      destroy() {
      return this.update();
      }

      showCollaborators() {
        return this.edit();
    }
   }
