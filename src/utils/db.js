const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODBCON);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // process.exit(1);
  }
};

module.exports = connectDB;

// env secrets -Please update your env var here
// PORT=7899
// SECRET_KEY='12@456urlqwery'
// CLIENTID='Af9lM61lhr_IIovVYIZbr2g3dNvw3_xPqtL6LlFVcgUK8wOGN8QFuWBlT06S76UvOgg3UOaIRwAppB9Y'
// PAYPAL_SECRET='EIQIxEBlMMNIAAAOqyNiyR84-DSS5DJ3i7HHYlo7VAGYxwnWxpd0FoAWm04XWTQtZSEbkusbBgq5TWXP'
