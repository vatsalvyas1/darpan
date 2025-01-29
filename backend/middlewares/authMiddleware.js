const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
};

const ensureRoleSelected = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.role) {
    return res.redirect("/select-role");
  }
  next();
};

module.exports = { ensureAuthenticated, ensureRoleSelected };
