let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let remarkSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    eventId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);
let Remark = mongoose.model("Remark", remarkSchema);
module.exports = Remark;
