// Model for Qustions
import mongoose, {Schema} from 'mongoose';

const questionSchema = new Schema({
  description: {type: String, required: [true, "Question cannot be blank"]},
  options: {type: Array, required: true},
  answer: {type: Number, required: true},
  choiceType: {type: String, enum: ['Multiple', 'Drag and Drop']}
});

// Instance Methods for Documents
questionSchema.methods = {

}

// Static Methods for Model
questionSchema.statics = {
  load: function(_id){
    return this.findOne({ _id });
  }
}

// export the question model
export default mongoose.model('Question', questionSchema);
