// Placeholder auth middleware for admin routes
// Phase 2: Implement JWT verification
const auth = (req, res, next) => {
  // For Phase 1, admin routes are open (use Postman/API client)
  // In Phase 2, this will verify JWT tokens
  next();
};

module.exports = auth;
