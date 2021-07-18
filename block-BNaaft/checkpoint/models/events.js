let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let eventSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    host: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    event_category: [{ type: String, required: true }],
    location: { type: String, required: true },
    likes: { type: Number, default: 0 },
    remarks: [{ type: Schema.Types.ObjectId, ref: "Remark" }],
  },
  { timestamps: true }
);
let Events = mongoose.model("Events", eventSchema);
module.exports = Events;
