const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuset } = require('../middleware/auth');
const Story = require('../models/Story');

//login/landing
//*get

router.get('/', ensureGuset, (req, res) => {
  res.render('login', { layout: 'login' });
});

//dashboard page
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', { name: req.user.displayName, stories });
  } catch (error) {
    console.error(error);
    res.render('/error/404');
  }
});

module.exports = router;
