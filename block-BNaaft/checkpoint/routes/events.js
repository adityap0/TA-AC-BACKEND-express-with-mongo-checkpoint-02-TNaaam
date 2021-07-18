var express = require("express");
var router = express.Router();
let Events = require("../models/events.js");
let Remarks = require("../models/remark");

/* GET home page. */
// /events/
// list all events
router.get("/", (req, res, next) => {
  Events.find({}, (error, events) => {
    if (error) return next(error);
    console.log(events);
    res.render("eventsPage", { events });
  });
});
//add new Event
router.get("/new", (req, res, next) => {
  res.render("addEvent");
});
router.post("/new", (req, res, next) => {
  Events.create(req.body, (error, createdEvent) => {
    if (error) return next(error);
    res.redirect("/events");
  });
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Events.findById(id)
    .populate("remarks")
    .exec((error, event) => {
      console.log(event);
      if (error) return next(error);
      res.render("eventDetails", { event });
    });
});
//likes/dislikes
router.get("/:id/likes/:opr", (req, res, next) => {
  let id = req.params.id;
  let opr = req.params.opr;
  if (opr === "+") {
    Events.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (error, event) => {
      if (error) return next(error);
      res.redirect("/events/" + id);
    });
  } else {
    Events.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (error, event) => {
      if (error) return next(error);
      res.redirect("/events/" + id);
    });
  }
});
router.get("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Events.findById(id, (error, event) => {
    if (error) return next(error);
    res.render("eventEdit", { event });
  });
});
router.post("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Events.findByIdAndUpdate(id, req.body, (error, event) => {
    if (error) return next(error);
    res.redirect("/events/" + id);
  });
});
router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Events.findByIdAndDelete(id, (error, deletedEvent) => {
    if (error) return next(error);
    res.redirect("/events");
  });
});
router.post("/:id/remarks", (req, res, next) => {
  let id = req.params.id;
  req.body.eventId = id;
  Remarks.create(req.body, (error, remark) => {
    Events.findByIdAndUpdate(
      id,
      { $push: { remarks: remark._id } },
      (error, event) => {
        if (error) return next(error);
        res.redirect("/events/" + id);
      }
    );
  });
});

module.exports = router;
