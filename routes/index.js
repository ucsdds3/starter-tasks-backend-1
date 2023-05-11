var express = require('express');
var router = express.Router();
const fs = require('fs')



/* GET request */
router.get('/', async function(req, res, next) {
  
  // Fetching from "database"
  let fetchedData = fs.readFileSync("database.json", "utf8")

  // Send Response
  const responseData = {
    success: 1,
    message: "Get Request Recieved",
    data: JSON.parse(fetchedData)
  }
  res.status(200)
  res.json(responseData);
});



/* POST request */
router.post('/', (req, res) => {
  if (req.query.key && req.query.key === "sample_key") {
    
    // Add data to "database"
    fs.readFile("database.json", (err, fetchedData) => {
      if (err) {
        console.log("Error when fetching data", err)

        // Send Failure
        const responseData = {
          success: 0,
          message: "Post Unsuccessful",
        }
        res.status(403)
        res.json(responseData)
      }
      let dbData = JSON.parse(fetchedData)
      dbData.push(req.body)
      fs.writeFile("database.json", JSON.stringify(dbData), (err) => {if (err) console.log})  

      // Send Response
      const responseData = {
        success: 1,
        message: "Post Successful",
        data: dbData
      }
      res.status(200)
      res.json(responseData)
    })
  } else {
    // Send Failure
    const responseData = {
      success: 0,
      message: "Post Unsuccessful",
    }
    res.status(403)
    res.json(responseData)
  }
})



/* DELETE request */
router.delete("/", (req, res) => {
  if (req.query.key && req.query.key == "sample_key" && req.query.title) {
    
    // Deleting with provided title
    let data = JSON.parse(fs.readFileSync("database.json", "utf8"))
    let newData = data.filter(d => d.title !== req.query.title)
    fs.writeFile("database.json", JSON.stringify(newData), (err) => {if (err) console.log})  
    
    // Send Response
    const responseData = {
      success: 1,
      message: "Delete Successful",
      data: newData
    }
    res.status(200)
    res.json(responseData)
  } else {
    // Send Failure
    const responseData = {
      success: 0,
      message: "Delete Unsuccessful",
    }
    res.status(403)
    res.json(responseData)
  }
})





module.exports = router;
