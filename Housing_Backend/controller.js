

const { PublicUser, Worker } = require('./schema');
const fs = require('fs');
module.exports.insertUser = async (req, res) => {
    const publicUser = new PublicUser({
        name: req.body.name,
        mobno: req.body.mobno,
        password: req.body.password,
        city: req.body.city,
        area: req.body.area,
        street: req.body.street,
        state: req.body.state
    });

    try {
        await publicUser.save();
        res.send({ msg: "Public User Added Successfully!" });
    } catch (error) {
        res.status(400).send(error);
    }
};
module.exports.insertAdmin = async (req, res) => {
    const worker = new Worker({
        name: req.body.name,
        mobno: req.body.mobno,
        password: req.body.password,
        region: req.body.region,
        city: req.body.city,
        area: req.body.area,
        street: req.body.street,
        state: req.body.state,
        adharId: req.body.adharId,
        workerId: req.body.workerId,
        workType : req.body.workType
    });

    try {
        await worker.save();
        res.send({ msg: "Worker Added Successfully!" });
    } catch (error) {
        res.status(400).send(error);
    }
};


module.exports.getAllUsers = async (req, res) => {
    try {
      const users = await PublicUser.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send({ msg: "Server error" });
    }
  }
  
  module.exports.getUser = async (req, res) => {
    try {
        const user = await PublicUser.findOne({ mobno: req.params.mobno });
        console.log(user)
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ msg: "User not found!" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ msg: "Server error" });
    }
};
 module.exports.getLoc=async(req,res) =>{
    try{
        const user =await PublicUser.findOne({city:req.params.city});
        res.send(user);
    }catch(error){
        res.status(500).send({msg:'Server Error'});
    }
 }





module.exports.getallAdmin = async (req,res) => {
    const admin = await Worker.find({});
    res.send(admin)
}
module.exports.getAdmin = async (req, res) => {
    try {
        const admin = await Worker.findOne({ mobno: req.params.mobno });
        console.log(admin)
        if (admin) {
            res.send(admin);
        } else {
            res.status(404).send({ msg: "User not found!" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ msg: "Server error" });
    }
};


module.exports.updateAdmin = async (req, res) => {
    try {
      const { name, password, street, area, city, state,image } = req.body;
      const updatedFields = { name, password, street, area, city, state,image };
  
      if (req.file) {
        // Handle image upload if provided
        const imageFile = req.file.path; // Path to uploaded image file
        updatedFields.photo = imageFile;
      }
  
      const admin = await Worker.findOneAndUpdate(
        { mobno: req.params.mobno },
        { $set: updatedFields },
        { new: true }
      );
  
      if (admin) {
        res.send("Admin updated");
      } else {
        res.status(404).send("Admin not found");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      res.status(500).send("Internal Server Error");
    }
  };