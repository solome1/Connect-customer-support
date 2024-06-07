// Utility function to format responses
exports.formatResponse = (statusCode, data, message) => {
    const response = { status: statusCode };
  
    if (data) {
      response.data = data;
    }
  
    if (message) {
      response.message = message;
    }
  
    return response;
  };