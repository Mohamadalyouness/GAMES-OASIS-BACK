import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  }
});

const News = mongoose.model('News', newsSchema);
export default News;