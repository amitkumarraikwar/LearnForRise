exports.login = (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin12345';

  if (username === validUsername && password === validPassword) {
    return res.json({
      success: true,
      token: 'learnforrise_admin_token_sec_2026',
      user: { username, role: 'admin' },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid Username or Password',
  });
};
