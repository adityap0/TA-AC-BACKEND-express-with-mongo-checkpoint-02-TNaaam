var express = require("express");
var router = express.Router();
let Remark = require("../models/remark");
let Events = require("../models/events");

//EDIT
router.get("/:id/edit", (req, res, next) => {
  let remarkid = req.params.id;
  Remark.findById(remarkid, (error, remark) => {
    if (error) return next(error);
    Events.findById(remark.eventId)
      .populate("remarks")
      .exec((error, event) => {
        if (error) return next(error);
        res.render("eventDetailsEditRemark", { event, remarkid });
      });
  });
});

//LIKE / DISLIKE
router.get("/:id/like/:opr", (req, res, next) => {
  let remarkid = req.params.id;
  let opr = req.params.opr;
  if (opr === "+") {
    Remark.findByIdAndUpdate(
      remarkid,
      { $inc: { likes: 1 } },
      (error, remark) => {
        res.redirect("/events/" + remark.eventId);
      }
    );
  } else {
    Remark.findByIdAndUpdate(
      remarkid,
      { $inc: { likes: -1 } },
      (error, remark) => {
        res.redirect("/events/" + remark.eventId);
      }
    );
  }
});

router.get("/:id/delete", (req, res, next) => {
  let remarkid = req.params.id;
  Remark.findByIdAndDelete(remarkid, (error, remark) => {
    Events.findByIdAndUpdate(
      remark.eventId,
      { $pull: { remarks: remark._id } },
      (error, event) => {
        res.redirect("/events/" + event._id);
      }
    );
  });
});
module.exports = router;
