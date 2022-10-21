const uuid = require("uuid");
const path = require("path");
const Device = require("../models/Device");
const DeviceInfo = require("../models/DeviceInfo");
const ApiError = require("../error/ApiError");



class DeviceController {
  async create(req, res, next) {
    try {
      //       let { name, price, brand_id, type_id, info } = req.body;
      //       const { img } = req.files;
      //       let fileName = uuid.v4() + ".jpg";
      //       img.mv(path.resolve(__dirname, "..", "static", fileName));

      //  const device = await Device.create({
      //    name,
      //    price,
      //    brand_id,
      //    type_id,
      //    img: fileName,
      //  });

      //  let id = device._id;
      //  console.log(id);

      //     if (info) {
      //         info = JSON.parse(info);
      //         info.forEach((i) =>
      //           DeviceInfo.create({
      //             title: i.title,
      //             description: i.description,
      //             device_id: id,
      //           })
      //         );}

      //       return res.json(device);

      let { name, price, brand_id, type_id, info } = req.body;

       const { img } = req.files;
       let fileName = uuid.v4() + ".jpg";
       img.mv(path.resolve(__dirname, "..", "static", fileName));

     
let infoId = [];
      info = JSON.parse(info);
              info.forEach((i) =>
                DeviceInfo.create({
                  title: i.title,
                  description: i.description,
               
                }).then((info) => {
                  infoId.push(info._id);
                })
              );

     let device = [];

setTimeout(() => {
   device = Device.create({
    name,
    price,
    brand_id,
    type_id,
    img: fileName,
    info: infoId,
  });
}, 1000);

      

      return res.json(device);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {

    let { brand_id, type_id, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    let devices;
    let count;
    
    if (!brand_id && !type_id) {
      devices = await Device.find({})
        .populate("brand_id")
        .populate("type_id")
        .limit(limit)
        .skip(offset);
        
       
       
        console.log(devices);
      count = await Device.find({}).count();
    }


    if (brand_id && !type_id) {
      devices = await Device.find({ brand_id})
        .populate("brand_id")
        .populate("type_id")
        .limit(limit)
        .skip(offset);
        count = await Device.find({}).count();
    }



    if (!brand_id && type_id) {
      devices = await Device.find({type_id})
        .populate("brand_id")
        .populate("type_id")
        .limit(limit)
        .skip(offset);
      
       console.log(devices);
       count = await Device.find({}).count();
    }


    if (brand_id && type_id) {
      devices = await Device.find({
        type_id, 
        brand_id,
        
      })
        .populate("brand_id")
        .populate("type_id");
         console.log(devices);
         count = await Device.find({}).count();
    }

  
    return res.json(devices);
    
  }

  async getOne(req, res) {

    const {id} = req.params;

    const device = await Device.findById(id).populate("info").exec(function(err, device) {
      if (err) {
        console.log(err);

      } else {
        console.log(device);
        
         return res.json(device);
         
      }
      
  });
 
}


}
module.exports = new DeviceController();
