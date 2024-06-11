const nodemailer = require('nodemailer');

// Create a transporter object with Gmail credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'solomeyemane53@gmail.com',
    pass: 'eukl akkm ouyr zgjv'
  }
});

// Define the sendRegistrationEmail function
function sendRegistrationEmail(toEmail, password) {
  const subject = "Registration Confirmation";
  const body = `
    <h2>Registration Confirmation</h2>
    <p>Dear ${toEmail},</p>
    <p>Your registration is complete! Your login credentials are:</p>
    <ul>
      <li>Email: ${toEmail}</li>
      <li>Password: ${password}</li>
    </ul>
    <p>Best regards,</p>
    <p>Your App Name</p>
  `;

  // Define the email options
  const mailOptions = {
    from: 'solomeyemane53@gmail.com',
    to: toEmail,
    subject: subject,
    html: body
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Email sent to ${toEmail} successfully!`);
  });
}
module.exports = sendRegistrationEmail