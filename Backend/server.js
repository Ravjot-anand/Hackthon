const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
  });

  app.post('/',(req,res)=>{
    const sql = "INSERT INTO Candidates (name, area_of_expertise, education, experience) VALUES (?)";
    const values =[
      req.body.name,
      req.body.expertise,
      req.body.education,
      req.body.experience
    ] 
    db.query(sql,[values],(err,data)=>{
      if(err){
        return res.json("ERROR");
        }
        return res.json(data);
        });
  })

  app.post('/admin-login', (req, res) => {
    const { username, pin } = req.body;
    const sql = "SELECT * FROM admin_login WHERE `username` = (?) AND `pin` = (?)";
    db.query(sql, [username, pin], (err, data) => {
      if(err){
        return res.json("Error");
      }
      if(data.length >0){
        return res.json("Success");
      }else{
        return res.json("Fail");
      }
    });
  });

  app.get('/candidates', (req,res)=>{
    const sql = "SELECT * FROM Candidates";
    db.query(sql,(err,result)=>{
      if(err) return res.json({Message:"Error inside server"});
      return res.json(result);
    })
   })
   
   app.get('/experts', (req,res)=>{
    const sql = "SELECT * FROM Experts";
    db.query(sql,(err,result)=>{
      if(err) return res.json({Message:"Error inside server"});
      return res.json(result);
    })
   })

   app.get('/expertscandidates', (req,res)=>{
    const sql = "SELECT * FROM `Candidate_Interview_Board` ";
    db.query(sql,(err,result)=>{
      if(err) return res.json({Message:"Error inside server"});
      return res.json(result);
    })
   })

  app.listen(8081,()=>{
    console.log("Server is running on port 8081");
  })