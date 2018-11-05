import _ from 'lodash';

// Common Utils
export const Utils = {
  handleErrors: function(error, customMsg){
    // Customize the errors based on your requirements
    var errors = {},
        customErrors = [];

    error = error || {}; // fallback assignment
    if(error.hasOwnProperty('errors') && error.name === 'ValidationError'){
      errors = error.errors;
    }else{
      customErrors.push({
        'field': '',
        'message': customMsg || error.message,
        'kind': error.kind || ""
      });
      return customErrors;
    }

    // we choosen this function becuase of the dynamic errors keys
    for (let key in errors) {
      let temp;
      let ctError = errors[key];
      temp = {
        'field': key,
        'message': ctError.message,
        'kind': ctError.kind
      };
      customErrors.push(temp);
    }


    return customErrors;
  }
}
