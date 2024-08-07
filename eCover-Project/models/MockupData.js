import mongoose from 'mongoose';

const rectTransformSchema = new mongoose.Schema({
  transform: [Number],
  perTransform: [Number],
  layerWidth: Number,
  layerHeight: Number,
});


const dataSchema = new mongoose.Schema({
  success: Boolean,
  width: Number,
  height: Number,
  psdWidth: Number,
  psdHeight: Number,
  ifMug:Boolean,
  ifSpin: Boolean,
  mugTransform: {
    width: Number,
    height: Number,
    xOffset: Number,
    yOffset: Number,
    aRadius: Number,
    bRadius: Number,
    scaleFactor: Number,
    parameterY: Number
  },
  spinWidth: Number,
  ifSpinSplite: Boolean,
  ifRectSplite: Boolean,
  spinSpliteWidth: Number,
  spinSpliteHeight: Number,
  rectSpliteWidth: Number,
  rectSpliteHeight: Number,
  rectTransform: [rectTransformSchema],
  spineTransform: rectTransformSchema,
  spinSpliteTransform: rectTransformSchema,
  rectSpliteTransform: rectTransformSchema
});

const groupSchema = new mongoose.Schema({
  group: String,
  mockups: [String],
  data: [dataSchema],
});

export default mongoose.model('MockupData', groupSchema);
