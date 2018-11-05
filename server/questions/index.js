import mongoose from 'mongoose';
import QuestionModel from '../models/questions';
import { Utils } from '../common/utils';

export const Questions = {
  index: function(req, res){
    // Show all the questions
    QuestionModel.find({}, function(err, questions){
      if(err){
        let errors = Utils.handleErrors(err);
        return res.status(200).json({errors: errors});
      }

      return res.json(questions);
    });
  },
  create: function(req, res){
    // Create new Question
    const body = req.body;
    QuestionModel.create(body, function(err, question){
      if(err){
        let errors = Utils.handleErrors(err);
        return res.status(200).json({errors: errors});
      }

      return res.status(201).json(question);
    });
  },
  show: function(req, res){
    //Get Question
    QuestionModel.find({_id: req.params.id}, function(err, question){
      if(err){
        let errors = Utils.handleErrors(err, "Invalid Question Id");
        return res.status(200).json({errors: errors});
      }

      return res.json(question);
    });
  },
  update: function(req, res){
    // updation will works only provided payload using findOneAndUpdate single method
    QuestionModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true, runValidators: true,  context: 'query'}, function(err, question){
      if(err || !question){
        let errors = Utils.handleErrors(err, "Invalid Question Id");
        return res.status(200).json({errors: errors});
      }

      return res.json(question);
    });

    // updation will works only provided payload using find and save
    // QuestionModel.findOne({_id: req.params.id},function(err, question){
    //     if(err || !question){
    //       let errors = Utils.handleErrors(err, "Invalid Question Id");
    //       return res.status(200).json({errors: errors});
    //     }
    //
    //     Object.assign(question, req.body);
    //     question.save((err, ques) => {
    //       if(err){
    //         let errors = Utils.handleErrors(err, "Invalid Question Id");
    //         return res.status(200).json({errors: errors});
    //       }
    //       return res.json(ques);
    //     });
    //   });

  },
  destroy: function(req, res){
    // Remove Question from the Collection
    QuestionModel.findOneAndRemove({_id: req.params.id}, function(err, question){
      if(err || !question){
        let errors = Utils.handleErrors(err, "Invalid Question Id");
        return res.status(200).json({errors: errors});
      }

      return res.json(question);
    });
  }
};
