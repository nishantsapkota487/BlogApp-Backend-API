const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
  res.send('helo workld');
});
module.exports = router;
