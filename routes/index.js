var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // Send Response
  responseData = {
    success: 1,
    data: {
      temp: "val"
    }
  }
  res.json(responseData);
});

router.post('/', (req, res) => {
  if (req.query.key && req.query.key == 4321) {
    // Fake storage
    let temp_obj = {
      data: req.query.data
    }
    console.log(temp_obj)

    // Send Response
    const responseData = {
      success: 1,
      message: "Post Successful",
    }
    res.json(responseData)
  } else {
    // Send Failure
    const responseData = {
      success: 0,
      message: "Post Unsuccessful",
    }
    res.json(responseData)
  }
})

module.exports = router;
