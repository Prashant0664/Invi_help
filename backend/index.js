const dotenv = require("dotenv").config();
const Port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Admin = require("./invihelpmodel");
const events = require("./models");
const User = require("./users_invictus");
const Team = require("./teamsmodel");
var MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();
app.use(
  cors({
    origin: [`${process.env.REACT_APP_BACKEND}`, `${process.env.REACT_APP_FRONTEND}`],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.REACT_APP_MONGO}`);

var store = new MongoDBStore(
  {
    uri: `${process.env.REACT_APP_MONGO}`,
    collection: "mySessions",
  },
  function (error) {
    if (error) {
      // console.log("err", error);
    }
  }
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', "Backend url"); 
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); 
//   next();
// });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.set("trust proxy", 1)
app.use(
  session({
    name: "sessionId",
    secret: `${process.env.REACT_APP_CSECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
    },
    store: store,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.post("/adminadd", async (req, res, next) => { 
  try {
    const { mail, password } = req.body;
    // console.log(mail,password);
    const data=new Admin({
      mail:mail,
      password:password
    })
    await data.save();
    // console.log("done");
    return res.status(200).json({ data: "done" });
  } catch (error) {
    if(error.code===11000){
      return res.status(403).json({ error: "Data Already Exists, Choose new unique id and password"})
    }
    // console.log(error.code);
    return res.status(400).json({ error: error })
  }
 });

 app.post("/checkifadmin", async (req, res, next) => {
  try {
    const {mail,password}=req.body;
    // console.log(mail,password)
    const data=await Admin.find({mail:mail,password:password});
    if(!data || data.length==0){
      return res.status(404).json({ error: "Sign up First" });
    }
    // console.log(data[0].verified)
    if(data[0].verified===false){
      return res.status(403).json({ error: "Not Verified" });
    }
    return res.status(200).json({ data: "done" });
  } catch (error) {
    return res.status(400).json({ error: error })
  }
 })


app.get("/coer", async (req, res, next) => {
  try {
    const datae = await User.find({});
    const event = await events.find({});
    const mp = new Map();
    for (var i = 0; i < datae.length; i++) {
      for (var j = 0; j < datae[i].eventList.length; j++) {
        const ename = await events.find({ _id: datae[i].eventList[j] });
        if (!ename[0]) {
          // console.log(ename[0], " ", datae[i].eventList[j], " ", datae[i].username);
          continue;
        }
        if (mp.has(ename[0].name)) {
          mp.set(ename[0].name, mp.get(ename[0].name) + 1);
        }
        else {
          mp.set(ename[0].name, 1);
        }
      }
    }

    for (let i = 0; i < event.length; i++) {
      if (!mp.has(event[i].name)) {
        mp.set(event[i].name, 0);
      }
    }
    var d = [];
    for (const [key, value] of mp) {
      d.push({ name: `${key}`, cnt: `${value}` })
    }
    return res.status(200).json({ data: d })
  }
  catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})

app.get("/mnum", async (req, res, next) => {
  try {
    const numbers = await User.find({});
    var data = [];
    for (var i = 0; i < numbers.length; i++) {
      data.push(numbers[i].phone);
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})

app.get("/pgmail", async (req, res, next) => {
  try {
    const mail = await User.find({});
    var data = [];
    for (var i = 0; i < mail.length; i++) {
      data.push(mail[i].email);
    }
    return res.status(200).json({ siz: data.length, data: data });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})
app.get("/mnumwithname", async (req, res, next) => {
  try {
    const numbers = await User.find({});
    var data = [];
    for (var i = 0; i < numbers.length; i++) {
      data.push({ name: numbers[i].username, phone: numbers[i].phone });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})
app.get("/pgmailwithname", async (req, res, next) => {
  try {
    const mail = await User.find({});
    var data = [];
    for (var i = 0; i < mail.length; i++) {
      data.push({ name: mail[i].username, email: mail[i].email });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})
app.get("/pgmailwithnameclg", async (req, res, next) => {
  try {
    const mail = await User.find({});
    var data = [];
    for (var i = 0; i < mail.length; i++) {
      data.push({ name: mail[i].username, email: mail[i].email, college: mail[i].college });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})
app.get("/mailandnumwithname", async (req, res, next) => {
  try {
    const mail = await User.find({});
    var data = [];
    for (var i = 0; i < mail.length; i++) {
      data.push({ name: mail[i].username, email: mail[i].email, phone: mail[i].phone });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})



app.get("/eventday/:id", async (req, res, next) => {
  try {
    const event = await events.find({});
    const id = req.params.id;
    var list = [];
    for (let i = 0; i < event.length; i++) {
      if (!event[i] || !event[i].date) {
        continue;
      }
      const date = event[i].date;
      if (date.getDate() == id) {
        list.push(event[i].name);
      }
    }
    if (list.length === 0) {
      return res.status(200).json({ data: "No events on this day" })
    }
    return res.status(200).json({ data: list })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ "error": error })
  }
})
app.get("/bid/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const byid = await events.findById(id);
    return res.status(200).json({ data: byid })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})
app.get("/noat", async (req, res, next) => {
  try {
    const datae = await Team.find({});
    var data = [];
    for (var i = 0; i < datae.length; i++) {
      const tl = await User.findById(datae[i].teamLeader);
      const ed = await events.findById(datae[i].eventName);
      if (!tl || !ed) {
        continue;
      }
      var ae = [];
      for (let o = 0; o < datae[i].member.length; o++) {
        const mname = await User.findById(datae[i].member[o]);
        ae.push(mname.username);
      }
      var jsonf = {
        "teamname": datae[i].teamname,
        "teamLeader": tl.username,
        "eventName": ed.name,
        "status": datae[i].status,
        "member": ae
      }
      data.push(jsonf)
    }
    return res.status(200).json({ data: data })
  }
  catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})


//done

app.get("/adoe", async (req, res, next) => {
  try {
    const datae = await events.find({});
    var data = [];
    for (var i = 0; i < datae.length; i++) {
      var jsonf = {
        "name": datae[i].name,
        "societyName": datae[i].societyName,
        "description": datae[i].description,
        "date": datae[i].date,
        "type": datae[i].type,
        "unstop": datae[i].unstop,
        "teamSizeMIN": datae[i].teamSizeMIN,
        "teamSizeMax": datae[i].teamSizeMax,
        "prize": datae[i].prize,
        "venue": datae[i].venue,
        "registrationEndDate": datae[i].registrationEndDate,
        "location": datae[i].location,
        "image": datae[i].image,
        "readmore": datae[i].readmore,
        "websitelink":`${datae[i].type==="Events"?("https://www.invictusdtu.in/Events?name="+String(datae[i].name)):("https://www.invictusdtu.in/Workshops?name="+String(datae[i].name))}`
      }
      data.push(jsonf)
    }
    return res.status(200).json({ data: data })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})

app.get("/stats", async (req, res, next) => {
  try {
    const datae = await User.find({});
    const teamsiz = await Team.find({});
    const event = await events.find({});
    var c = 0;
    var e0 = 0;
    var e1 = 0;
    var e2 = 0;
    var e3 = 0;
    var e4 = 0;
    var w0 = 0;
    var w1 = 0;
    var w2 = 0;
    var w3 = 0;
    var w4 = 0;
    const mp = new Map();
    const mp2 = new Map();
    for (let i = 0; i < datae.length; i++) {
      var clgsl = datae[i].college.toLowerCase();
      if (clgsl.includes("delhi technological university") || clgsl == 'delhi technological university' || clgsl === 'delhi technical university' || clgsl === 'dtu') {
        if (mp.has("dtu")) {
          mp.set("dtu", mp.get("dtu") + 1);
        }
        else {
          mp.set("dtu", 1);
        }
      }
      else {
        if (mp.has(clgsl)) {
          mp.set(clgsl, mp.get(clgsl) + 1);
        }
        else {
          mp.set(clgsl, 1);
        }

      }
    }
    var tcc = mp.length;
    var cd = [];
    for (const [key, value] of mp) {
      cd.push({ name: `${key}`, cnt: `${value}` })
    }
    for (let i = 0; i < event.length; i++) {
      const date = event[i].date;
      if (event[i].type === "Workshops") {
        c++;
        if (date.getDate() == 9) {
          w0++;
        }
        else if (date.getDate() == 10) {
          w1++;
        }
        else if (date.getDate() == 11) {
          w2++;
        }
        else if (date.getDate() == 12) {
          w3++;
        }
        else if (date.getDate() == 13) {
          w4++;
        }
      }
      else {
        if (date.getDate() == 9) {
          e0++;
        }
        else if (date.getDate() == 10) {
          e1++;
        }
        else if (date.getDate() == 11) {
          e2++;
        }
        else if (date.getDate() == 12) {
          e3++;
        }
        else if (date.getDate() == 13) {
          e4++;
        }
      }

    }
    var d = 0;
    var usi = 0;
    for (let i = 0; i < teamsiz.length; i++) {
      if (mp2.has(teamsiz[i].teamLeader)) {

      }
      else {
        usi++;
        mp2.set(teamsiz[i].teamLeader, 1);
      }
      if (teamsiz[i].status == "not-submitted") {
        d++;
      }
    }
    return res.status(200).json({
      "Total Events+Workshops": event.length,
      "Total Events": event.length - c,
      "Total Workshops": c,
      "Total Registered on Website": datae.length,
      "Total Teams": teamsiz.length,
      "Total Teams Submitted": teamsiz.length - d,
      "Total Teams Not Submitted": d,
      "Total Unique Teams/Submission etc.": usi,
      "Overall total events and workshop on 9": e0 + w0,
      "Overall total events and workshop on 10": e1 + w1,
      "Overall total events and workshop on 11": e2 + w2,
      "Overall total events and workshop on 12": e3 + w3,
      "Overall total events and workshop on 13": e4 + w4,
      "Total Events on 9": e0,
      "Total Events on 10": e1,
      "Total Events on 11": e2,
      "Total Events on 12": e3,
      "Total Events on 13": e4,
      "Total Workshops on 9": w0,
      "Total Workshops on 10": w1,
      "Total Workshops on 11": w2,
      "Total Workshops on 12": w3,
      "Total Workshops on 13": w4,
      "Total colleges": cd.length,
      "Colleges": cd,
    })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ "error": error })
  }
})




app.get("/", async (req, res, next) => {
  return res.status(404).json({ error: "not allowed! Go back or face consequences!" });
})
app.get("*", async (req, res, next) => {
  return res.status(404).send("not allowed! Go back or face consequences!");
})
app.listen(Port, () => {
  console.log(`server running ${Port}`);
});
