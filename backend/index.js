const dotenv = require("dotenv").config();
const Port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Admin = require("./invihelpmodel");
const Event = require("./models");
const User = require("./users_invictus");
const Team = require("./teamsmodel");
const excelJs = require("exceljs");
var MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();
app.use(
  cors({
    origin: [`${process.env.REACT_APP_BACKEND}`, `${process.env.REACT_APP_FRONTEND}`, "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.REACT_APP_MONGO}`);

var store = new MongoDBStore(
  {
    uri: `${process.env.REACT_APP_MONGO}`,
    collection: "mySession",
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
const marr = [
  {
    "name": "CAT-Talk",
    "type": "speaker session",
    "tag": "#speaker session"
  },
  {
    "name": "BioInsight Forum",
    "type": "speaker session",
    "tag": "#speaker session"
  },
  {
    "name": "Civil Connect 2024",
    "type": "speaker session",
    "tag": "#speaker session"
  },
  {
    "name": "MATHLETICS",
    "type": "Quiz Competions",
    "tag": "#Quiz Competions"
  },
  {
    "name": "Anime Decoder",
    "type": "Quiz Competions",
    "tag": "#Quiz Competions"
  },
  {
    "name": "Automotive Odyssey Quiz",
    "type": "Quiz Competions",
    "tag": "#Quiz Competions"
  },
  {
    "name": "LabRats Quiz 2.0",
    "type": "Quiz Competions",
    "tag": "#Quiz Competions"
  },
  {
    "name": "CryptAI",
    "type": "Quiz Competions",
    "tag": "#Quiz Competions"
  },
  {
    "name": "Workshop",
    "type": "speaker session",
    "tag": "#speaker session"
  },
  {
    "name": "Paper plane Flying",
    "type": "Field Events",
    "tag": "#Field Events"
  },
  {
    "name": "Bridge-O-Mania",
    "type": "Field Events",
    "tag": "#Field Events"
  },
  {
    "name": "Pressure Pulse",
    "type": "Field Events",
    "tag": "#Field Events"
  },
  {
    "name": "Aeroglide",
    "type": "Field Events",
    "tag": "#Field Events"
  },
  {
    "name": "Launch Craft",
    "type": "Field Events",
    "tag": "#Field Events"
  },
  {
    "name": "Seismic",
    "type": "Field Events",
    "tag": "#Field Events"
  },
  {
    "name": "Adobe DevCraft",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "MLcodecrunch",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "Pitchfork",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "Chemodelessay",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "BioTech Venture Pitch Challenge",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "Research hackathon",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "and all type",
    "type": "Hackathon",
    "tag": "#Hackathon"
  },
  {
    "name": "Robo War",
    "type": "Robotics",
    "tag": "#Robotics"
  },
  {
    "name": "LFR",
    "type": "Robotics",
    "tag": "#Robotics"
  },
  {
    "name": "Robo Race",
    "type": "Robotics",
    "tag": "#Robotics"
  },
  {
    "name": "Cat Talk",
    "type": "speaker session"
  },
  {
    "name": "BioInsight Forum",
    "type": "speaker session"
  },
  {
    "name": "Civil Connect 2024",
    "type": "speaker session"
  },
  {
    "name": "Mathelatics",
    "type": "Quiz Competions"
  },
  {
    "name": "Anime Decoder",
    "type": "Quiz Competions"
  },
  {
    "name": "Automotive Odyssey",
    "type": "Quiz Competions"
  },
  {
    "name": "LabRats Quiz 2.0",
    "type": "Quiz Competions"
  },
  {
    "name": "CryptAI",
    "type": "Quiz Competions"
  },
  {
    "name": "Workshop",
    "type": "speaker session"
  },
  {
    "name": "Paper plane Flying",
    "type": "Field Events"
  },
  {
    "name": "Bridge-O-Mania",
    "type": "Field Events"
  },
  {
    "name": "Pressure Pulse",
    "type": "Field Events"
  },
  {
    "name": "Aeroglide",
    "type": "Field Events"
  },
  {
    "name": "Launch Craft",
    "type": "Field Events"
  },
  {
    "name": "Seismic",
    "type": "Field Events"
  },
  {
    "name": "Adobe DevCraft",
    "type": "Hackathon"
  },
  {
    "name": "MLcodecrunch",
    "type": "Hackathon"
  },
  {
    "name": "Pitchfork",
    "type": "Hackathon"
  },
  {
    "name": "Chemodelessay",
    "type": "Hackathon"
  },
  {
    "name": "BioTech Venture Pitch Challenge",
    "type": "Hackathon"
  },
  {
    "name": "Research hackathon",
    "type": "Hackathon"
  },
  {
    "name": "and all type",
    "type": "Hackathon"
  },
  {
    "name": "Robo War",
    "type": "Robotics"
  },
  {
    "name": "LFR",
    "type": "Robotics"
  },
  {
    "name": "Robo Race",
    "type": "Robotics"
  },
  {
    "name": "Quidditch",
    "type": "Robotics"
  },
  {
    "name": "Robo Soccer",
    "type": "Robotics"
  },
  {
    "name": "Kaun Banega Chemopati",
    "type": "Quiz Competions"
  },
  {
    "name": "TechLoop",
    "type": "Quiz Competions"
  },
  {
    "name": "Trivium:- The General Quiz",
    "type": "Quiz Competions"
  },
  {
    "name": "The Demystification (Quiz)",
    "type": "Quiz Competions"
  },
  {
    "name": "Workshop",
    "type": "speaker session"
  },
  {
    "name": "Paper plane Flying",
    "type": "Field Events"
  },
  {
    "name": "Bridge-O-Mania",
    "type": "Field Events"
  },
  {
    "name": "Pressure Pulse",
    "type": "Field Events"
  },
  {
    "name": "AeroGlide",
    "type": "Field Events"
  },
  {
    "name": "LaunchCraft",
    "type": "Field Events"
  },
  {
    "name": "Seismic",
    "type": "Field Events"
  },
  {
    "name": "Devcraft",
    "type": "Hackathon"
  },
  {
    "name": "MLcodecrunch",
    "type": "Hackathon"
  },
  {
    "name": "Pitchfork",
    "type": "Hackathon"
  },
  {
    "name": "Chemodelessay",
    "type": "Hackathon"
  },
  {
    "name": "BioTech Venture Pitch Challenge",
    "type": "Hackathon"
  },
  {
    "name": "Resarch Hackathon",
    "type": "Hackathon"
  },
  {
    "name": "and all type",
    "type": "Hackathon"
  },
  {
    "name": "Robo war",
    "type": "Robotics"
  },
  {
    "name": "LFR",
    "type": "Robotics"
  },
  {
    "name": "Robo race",
    "type": "Robotics"
  },
  {
    "name": "Quiditch",
    "type": "Robotics"
  },
  {
    "name": "Robo soccer",
    "type": "Robotics"
  },
  {
    "name": "CaseQuest",
    "type": "Non Tech"
  },
  {
    "name": "Guessapalooza",
    "type": "Non Tech"
  },
  {
    "name": "Ecoprenieurs",
    "type": "Non Tech"
  },
  {
    "name": "Greensteel",
    "type": "Non Tech"
  },
  {
    "name": "Demystification",
    "type": "Quiz Competions"
  },
  {
    "name": "Workshop",
    "type": "speaker session"
  },
  {
    "name": "Paper Flying",
    "type": "Field Events"
  },
  {
    "name": "Bridge-o-mania",
    "type": "Field Events"
  },
  {
    "name": "Pressure Pulse",
    "type": "Field Events"
  },
  {
    "name": "AeroGlide",
    "type": "Field Events"
  },
  {
    "name": "LaunchCraft",
    "type": "Field Events"
  },
  {
    "name": "Seismic",
    "type": "Field Events"
  },
  {
    "name": "Devcraft",
    "type": "Hackathon"
  },
  {
    "name": "MLcodecrunch",
    "type": "Hackathon"
  },
  {
    "name": "pitchfork",
    "type": "Hackathon"
  },
  {
    "name": "chemodelessay",
    "type": "Hackathon"
  },
  {
    "name": "biotech venture",
    "type": "Hackathon"
  },
  {
    "name": "resarch hackathon",
    "type": "Hackathon"
  },
  {
    "name": "and all type",
    "type": "Hackathon"
  },
  {
    "name": "Robo war",
    "type": "Robotics"
  },
  {
    "name": "LFR",
    "type": "Robotics"
  },
  {
    "name": "Robo race",
    "type": "Robotics"
  },
  {
    "name": "Quiditch",
    "type": "Robotics"
  },
  {
    "name": "Robo soccer",
    "type": "Robotics"
  },
  {
    "name": "CaseQuest",
    "type": "Non Tech"
  },
  {
    "name": "Guessapalooza",
    "type": "Non Tech"
  }, {
    "name": "Ecopreneurs 3.0: Case study competition",
    "type": "Non Tech"
  },
  {
    "name": "GreenSteel Symposium",
    "type": "Non Tech"
  },
  {
    "name": "Bits",
    "type": "Programming"
  },
  {
    "name": "CodeKaze",
    "type": "Programming"
  },
  {
    "name": "ERROR 404",
    "type": "Programming"
  },
  {
    "name": "Promptify",
    "type": "Programming"
  },
  {
    "name": "Code Script 2.0",
    "type": "Programming"
  },
  {
    "name": "Codelocks",
    "type": "Programming"
  },
  {
    "name": "Reverse Engineering",
    "type": "Programming"
  },
  {
    "name": "Bulls and Bears",
    "type": "Finance"
  },
  {
    "name": "Financial Cricket",
    "type": "Finance"
  },
  {
    "name": "Mock Stocks",
    "type": "Finance"
  },
  {
    "name": "Chess Warfare",
    "type": "Miscellaneous"
  },
  {
    "name": "Tech Cosplay",
    "type": "Miscellaneous"
  },
  {
    "name": "Desmos Dali",
    "type": "Miscellaneous"
  },
  {
    "name": "Jenga Snag",
    "type": "Miscellaneous"
  },
  {
    "name": "Tazer Hunt CTF",
    "type": "Arcade"
  },
  {
    "name": "Grand Nashify Tournament",
    "type": "Arcade"
  },
  {
    "name": "DeCyber",
    "type": "Arcade"
  },
  {
    "name": "Stratezenith",
    "type": "Arcade"
  },
  {
    "name": "Creative Canvas",
    "type": "Design"
  },
  {
    "name": "ILUX",
    "type": "Design"
  },
  {
    "name": "Sketch it",
    "type": "Design"
  },
  {
    "name": "Cad Battle",
    "type": "Design"
  }
]
const dddd = [
  "MATHLETICS",
  "Automotive Odyssey Quiz",
  "LabRats Quiz 2.0",
  "CryptAI",
  "Paper plane Flying",
  "Bridge-O-Mania",
  "Aeroglide",
  "Launch Craft",
  "Seismic",
  "Adobe DevCraft",
  "Pitchfork",
  "Chemodelessay",
  "BioTech Venture Pitch Challenge",
  "LFR",
  "Guessapalooza",
  "Ecopreneurs 3.0: Case study competition",
  "GreenSteel Symposium",
  "Bits",
  "CodeKaze",
  "ERROR 404",
  "Promptify",
  "Code Script 2.0",
  "Codelocks",
  "Reverse Engineering",
  "Bulls and Bears",
  "Financial Cricket",
  "Mock Stocks",
  "Chess Warfare",
  "Tech Cosplay",
  "Desmos Dali",
  "Jenga Snag",
  "Tazer Hunt CTF",
  "Grand Nashify Tournament",
  "DeCyber",
  "Stratezenith",
  "Creative Canvas",
  "ILUX",
  "Sketch it",
  "BioInsight Forum",
  "bioinsight forum",
  "mathletics",
  "automotive odyssey quiz",
  "labrats quiz 2.0",
  "cryptai",
  "paper plane flying",
  "bridge-o-mania",
  "aeroglide",
  "launch craft",
  "seismic",
  "adobe devcraft",
  "pitchfork",
  "chemodelessay",
  "biotech venture pitch challenge",
  "robo war",
  "lfr",
  "robo race",
  "quidditch",
  "techloop",
  "trivium:- the general quiz",
  "the demystification (quiz)",
  "guessapalooza",
  "ecopreneurs 3.0: case study competition",
  "greensteel symposium",
  "bits",
  "codekaze",
  "error 404",
  "promptify",
  "code script 2.0",
  "codelocks",
  "reverse engineering",
  "bulls and bears",
  "financial cricket",
  "mock stocks",
  "chess warfare",
  "tech cosplay",
  "desmos dali",
  "jenga snag",
  "tazer hunt ctf",
  "grand nashify tournament",
  "decyber",
  "stratezenith",
  "creative canvas",
  "ilux",
  "sketch it",
]
// app.get("/critical", async (req, res, next) => {
//   var arr1 = [];
//   var arr2 = [];
//   const st = new Set();
//   const st2 = new Set();
//   try {
//     for (var i = 0; i < marr.length; i++) {
//       const data = await Event.find({ name: marr[i].name });
//       if (st.has(marr[i].name.toLowerCase())) { 
//         continue; 
//       }
//       if (!data || !data[0]) {
//         st2.add(marr[i].name.toLowerCase());
//         continue;
//       }
//       var fdff=0;
//       for (var j = 0; j < dddd.length; j++) {
//         if (data[0].name.toLowerCase() === dddd[j].toLowerCase()) {
//           st.add(marr[i].name.toLowerCase());
//           fdff=1
//           continue;
//         }
//       }
//       if(fdff===1){
//         continue;
//       }
//       if (!data[0].description || data[0].type === "Workshops" || data[0].name === "Anime Decoder" || data[0].name === "Pressure Pulse") {
//         console.log(marr[i].name);
//         st2.add(marr[i].name.toLowerCase());
//         continue;
//         // break;
//       }
//       var desc = data[0].description;
//       desc += `  <br/><span style='visibility:hidden;>#${marr[i].type}</span>`;
//       data[0].description = desc;
//       await data[0].save();
//       console.log("marr[i].name",marr[i].name);
//       st.add(marr[i].name.toLowerCase());
//       // break;
//     }
//     for (const item of st2) {
//       arr1.push(item);
//     }
//     for (const item of st) {
//       arr2.push(item);
//     }
//     return res.status(200).json({ data: arr1, data2: arr2 });
//   } catch (error) {
//     console.log(error);
//   } 
// })

app.post("/adminadd", async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    // console.log(mail,password);
    const data = new Admin({
      mail: mail,
      password: password
    })
    await data.save();
    // console.log("done");
    return res.status(200).json({ data: "done" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ error: "Data Already Exists, Choose new unique id and password" })
    }
    // console.log(error.code);
    return res.status(400).json({ error: error })
  }
});

app.post("/checkifadmin", async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    // console.log(mail,password)
    const data = await Admin.find({ mail: mail, password: password });
    if (!data || data.length == 0) {
      return res.status(404).json({ error: "Sign up First" });
    }
    // console.log(data[0].verified)
    if (data[0].verified === false) {
      return res.status(403).json({ error: "Not Verified" });
    }
    return res.status(200).json({ data: "done" });
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

// app.get("/setunstop", async (req, res, next) => {
//   try {
//     const data = await Event.find({});
//     for (var i = 0; i < data.length; i++) {
//       if(data && !data[i].unstop){
//         data[i].unstop = "";
//         await data[i].save();
//       }
//     }
//     return res.status(200).json({ data: "done" });
//   } catch (error) {
//     return res.status(400).json({ error: error })
//   }
// }
// )
app.get("/coer", async (req, res, next) => {
  try {
    const datae = await User.find({});
    const event = await Event.find({});
    const mp = new Map();
    for (var i = 0; i < datae.length; i++) {
      for (var j = 0; j < datae[i].eventList.length; j++) {
        const ename = await Event.find({ _id: datae[i].eventList[j] });
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


app.get("/critical", async (req, res, next) => {
  try {
    const data = await User.findById("65ae3dbf71cfd65a20d0056b");
    var desc = data.description;
    console.log(desc);
    desc += "<br/><span style='color:ffffff00'>#miscellaneous</span> ";
    data.description = desc;
    data.save();
    return res.status(200).json({ data: "done" });
  } catch (error) {
    console.log(error);
  }
})
app.get("/eventday/:id", async (req, res, next) => {
  try {
    const event = await Event.find({});
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
    const byid = await Event.findById(id);
    return res.status(200).json({ data: byid })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error })
  }
})
app.get("/usersid/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const byid = await User.findById(id);
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
      const ed = await Event.findById(datae[i].eventName);
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
    const datae = await Event.find({});
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
        "websitelink": `${datae[i].type === "Events" ? ("https://www.invictusdtu.in/Events?name=" + String(datae[i].name)) : ("https://www.invictusdtu.in/Workshops?name=" + String(datae[i].name))}`
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
    const event = await Event.find({});
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
    console.log("00000000");
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

app.post("/download", async (req, res) => {
  try {
    const { name } = req.body;
    var teams;
    if (name === "") {
      console.log("here999dn");
      teams = await Team.find({}).populate('teamLeader').populate('eventName').populate('member').populate("teamname");
    }
    else {
      const event = await Event.findOne({ name });
      // console.log(event)

      if (event) {
        try {
          teams = await Team.find({ eventName: event._id })
            .populate("teamname")
            .populate('teamLeader')
            .populate('eventName')
            .populate('member')
            ;
          // console.log(teams);
        }
        catch (err) {
          console.log(err);
        }
        // return res.json({}); 
      }
      else {
        return res.json({
          error: "event not found"
        })
      }
    }
    if (teams.length === 0) {
      return res.json({
        error: "teams not found!"
      })
    }

    let workbook = new excelJs.Workbook();
    const sheets = workbook.addWorksheet("teams");

    sheets.columns = [
      { header: "Event", key: "event", width: 30 },
      { header: "Prize", key: "prize", width: 30 },
      { header: "Venue", key: "venue", width: 50 },
      { header: "Time", key: "time", width: 30 },
      { header: "Society Name", key: "soc", width: 50 },
      { header: "Registeration Starts", key: "reg_start", width: 30 },
      { header: "Registeration Ends", key: "reg_end", width: 30 },
      { header: "Team Name_", key: "teamname", width: 30 },
      { header: "Team Id", key: "teamid", width: 30 },
      { header: "Team Leader", key: "leader", width: 30 },
      { header: "member1", key: "member1", width: 30 },
      { header: "member1 email", key: "email1", width: 30 },
      { header: "member1 phone", key: "phone1", width: 30 },
      { header: "member1 college", key: "college1", width: 30 },
      { header: "member2", key: "member2", width: 30 },
      { header: "member2 email", key: "email2", width: 30 },
      { header: "member2 phone", key: "phone2", width: 30 },
      { header: "member2 college", key: "college2", width: 30 },
      { header: "member3", key: "member3", width: 30 },
      { header: "member3 email", key: "email3", width: 30 },
      { header: "member3 phone", key: "phone3", width: 30 },
      { header: "member3 college", key: "college3", width: 30 },
      { header: "member4", key: "member4", width: 30 },
      { header: "member4 email", key: "email4", width: 30 },
      { header: "member4 phone", key: "phone4", width: 30 },
      { header: "member4 college", key: "college4", width: 30 },
      { header: "member5", key: "member5", width: 30 },
      { header: "member5 email", key: "email5", width: 30 },
      { header: "member5 phone", key: "phone5", width: 30 },
      { header: "member5 college", key: "college5", width: 30 },
    ];

    for (const value of teams) {
      // console.log(value?.teamname)
      sheets.addRow({
        event: value.eventName?.name,
        prize: value.eventName?.prize,
        venue: value.eventName?.venue,
        time: value.eventName?.time,
        soc: value.eventName?.societyName,
        reg_start: value.eventName?.date,
        reg_end: value.eventName?.registrationEndDate,
        teamname: value?.teamname,
        leader: value.teamLeader?.username,
        member1: value.member[0]?.username,
        email1: value.member[0]?.email,
        phone1: value.member[0]?.phone,
        college1: value.member[0]?.college,
        member2: value.member[1]?.username,
        email2: value.member[1]?.email,
        phone2: value.member[1]?.phone,
        college2: value.member[1]?.college,
        member3: value.member[2]?.username,
        email3: value.member[2]?.email,
        phone3: value.member[2]?.phone,
        college3: value.member[2]?.college,
        member4: value.member[3]?.username,
        email4: value.member[3]?.email,
        phone4: value.member[3]?.phone,
        college4: value.member[3]?.college,
        member5: value.member[4]?.username,
        email5: value.member[4]?.email,
        phone5: value.member[4]?.phone,
        college5: value.member[4]?.college,
      });
      // break;
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return res.json({
      message: "download successful!",
      buffer
    })

  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal Server Error" }, { status: 500 });
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
