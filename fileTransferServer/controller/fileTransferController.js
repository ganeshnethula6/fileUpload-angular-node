const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json());
const multer = require("multer");
const Applicant = require("../model/applicant");

var userFolder;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var userPath;
    if (!fs.existsSync("./Uploads")) {
      fs.mkdirSync("./Uploads",{recursive:true});
    }
    var dirArray = fs.readdirSync("./Uploads");
    if (dirArray.length === 0) {
      userFolder="/USER" + 1;
      userPath = "./Uploads" + userFolder;
    } else if(dirArray.length != 0 && file.mimetype==="image/png") {
      userFolder="/USER"+Number(dirArray.length + 1);
      userPath = "./Uploads" + userFolder;
    }
    else{
      userPath = "./Uploads" + userFolder;
    }
    var filePath;
    if (
      file.mimetype === "image/png"
    ) {
        filePath = "/Images";
        userPath+=filePath;
    } else {
     
      filePath = "/Documents";
      userPath+=filePath;
    }
    fs.mkdirSync(userPath,{recursive:true});
    cb(null, userPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "profileImage") {``
      if (file.mimetype.toLowerCase() != "image/png") {
        cb(new Error("Please upload the profile image in .PNG!"), false);
      } else if (file.size > 10000) {
        cb(new Error("Please upload the profile image size below 1mb!"), false);
      } else {
        cb(null, true);
      }
    } else if (
      file.fieldname === "resume" &&
      file.originalname.toLowerCase().split(".")[1] != "docx" &&  file.originalname.toLowerCase().split(".")[1] != "pdf"
    ) {
      console.log(file.mimetype);
      cb(new Error("Please upload the resume in .docx!"), false);
    } else {
      cb(null, true);
    }
  },
});
const cpUpload = upload.fields([{ name: "profileImage" }, { name: "resume" }]);
router.post("/postData",cpUpload, function (req, res, next) {
  const applicant=new Applicant(req.body.firstName,req.body.lastName,req.body.dob,req.body.gender,req.body.email,req.body.phoneNumber,req.body.city,req.body.address,req.body.pincode,req.body.passoutYear,req.body.primarySkill,req.body.policyAgree);
  applicant.save();
 Applicant.fetchAll((applicants)=>{
  console.log(applicants);
  });
  try {
    res.json({
      status: "ok",
      message: "Files Successfully uploaded..",
      data:req.body
    });
  } catch (error) {
    res.json({
      status: "ok",
      error: error,
    });
  }
});

module.exports = router;
