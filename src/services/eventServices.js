const eventModel = require("../model/EventModel");
let currentDate = new Date();
let start = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  0,
  0,
  0
);
let end = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  23,
  59,
  59
);
var seats=[];
const eventHandler = {
  PostData: async function (data) {
    try {
      return eventModel
        .create({
          ...data,
        })
        .then((res) => res)
        .catch((err) =>{return {err:0,message:err}});
    } catch (error) {
      return {err:1,message:error}
    }
  },
  getAlldata: async function (data) {
    const filterObjname={};
    const {name=""} =data;
    if(name!==""){
      {filterObjname.name=name}
    }
    try {
      let dataEvent = await eventModel.find({...filterObjname});
      return dataEvent;
    } catch (error) {
      return {err:1,message:error}
    }
  },
  deleteEvent: async function (id) {
    try {
      const dataEvent = await eventModel.findByIdAndDelete(id);
      if (!dataEvent) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }

      return { err: 0, msg: "Event deleted" };
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  updateEvent: async function (id, requestbody) {
    try {
      const dataEvent = await eventModel.findByIdAndUpdate(id, requestbody);
      if (!dataEvent) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }
      return { err: 0, msg: "Event updated" };
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  getByid: async function (id) {
    try {
      let dataEvent = await eventModel.findById(id);
      if (!dataEvent) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }
      return dataEvent;
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  ongoingEvent: async function (data) {
    let { filterlocation, filterartist, filterprice, filterLanguage, page ,name=""} =
      data;
    const filterObj = {};
    // console.log("name"+name)
    const perPage = 10;
    console.log(filterLanguage);
    if (filterLanguage.length > 0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length > 0) {
      {
        filterObj.artist = filterartist;
      }
    }
    if (filterlocation.length > 0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if (filterprice.length > 0) {
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
    if(name.length>0){
      {filterObj.name=name}
    } 
    // createdAt: { $gte: start },
    // future: false,
    console.log(filterObj);
    var total = await eventModel
    .find({
      future:false,
      ...filterObj,
      name:name
    }).count();
    try {
      var pages = Math.ceil(total / perPage);
      var pageNumber = (page == null) ? 1 : page;
      var startFrom = (pageNumber - 1) * perPage;
      let data = await eventModel
        .find({
          future:false,
          ...filterObj,
        })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      return {data,pages:pages};
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  futureEvent: async function (data) {
    let { filterlocation, filterartist, filterprice, filterLanguage, page ,name="" } =
      data;
    const perPage = 10;
    const filterObj = {};
    if (filterLanguage.length > 0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length > 0) {
      {
        filterObj.artist = filterartist;
      }
    }
    if (filterlocation.length > 0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if (filterprice.length > 0) {
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
    if(name!==""){
      {filterObj.name=name}
    }
    var total = await eventModel
    .find({
      future:false,
      ...filterObj,
    }).count();
    console.log(filterObj);
    try {
      var pages = Math.ceil(total / perPage);
      var pageNumber = (page == null) ? 1 : page;
      var startFrom = (pageNumber - 1) * perPage;
      let data = await eventModel
        .find({
          future: true,
          ...filterObj,
        })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      console.log(data);
      return {data,pages:pages};
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  pastEvent: async function (data) {
    let { filterlocation, filterartist, filterprice, filterLanguage, page ,name=""} =
      data;
    const perPage = 10;
    const filterObj = {};
    if (filterLanguage.length > 0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length > 0) {
      {
        filterObj.artist = filterartist;
      }
    }
    if (filterlocation.length > 0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if (filterprice.length > 0) {
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
    if(name!==""){
      {filterObj.name=name}
    }
    var total = await eventModel
    .find({
      future:false,
      ...filterObj,
    }).count();
    try {
      var pages = Math.ceil(total / perPage);
      var pageNumber = (page == null) ? 1 : page;
      var startFrom = (pageNumber - 1) * perPage;
      let data = await eventModel
        .find({ createdAt: { $lt: start }, ...filterObj })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      console.log(data);
      return {data,pages:pages};
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
};
//  CreatedAt:{gts:start,$lt:end}
{
}
module.exports = { eventHandler };
