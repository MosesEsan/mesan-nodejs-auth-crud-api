# Node.js Authentication and CRUD API
Node.js Authentication and CRUD API with Email Verification, Image Upload and Password Reset Using JWT, Passport.js and Sendgrid.

**This Branch** <br/>
Email Verification

**Other Branch** <br/>
<a href="https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/tree/auth_no_verification" target="_blank">No Email Verification</a>

**Tutorial** <br/>
Tutorial available <a href="https://medium.com/swlh/how-to-build-a-node-js-authentication-api-with-email-verification-image-upload-and-password-reset-95e35fd46be1" target="_blank">here</a>.

## Testing
Use <a href="https://www.getpostman.com" target="_blank">Postman</a> to test.<br/>

**Try accessing the user index route without token [GET]**<br/>

https://mesannodejsapiwithverification.herokuapp.com/api/user<br/>

![User Index](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/master/demo/UserIndex.gif "User Index")

**Register and Login** <br/>
Create a POST request to /api/auth/register <br/>
Create a POST request to /api/auth/login

**Make sure to enter a valid email address so you can receive the verification email.**<br/>

https://mesannodejsapiwithverification.herokuapp.com/api/auth/register
https://mesannodejsapiwithverification.herokuapp.com/api/auth/login

![Register And Login](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/master/demo/RegisterandLogin.gif "Register And Login")

![Verification Email](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/master/demo/VerificationEmail.png "Verification Email")

**Update User Info and Upload Profile Image** <br/>
Try updating the user information and uploading a profile image using endpoint/api/user/[your_user_id] passing the token.

https://mesannodejsapiwithverification.herokuapp.com/api/user/[user_id]

**Login and Recover Password** <br/>
Create a POST request to /api/auth/recover to recover your password. An email will be sent to you.

https://mesannodejsapiwithverification.herokuapp.com/api/auth/recover

![Password Recovery](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/master/demo/PasswordRecovery.gif "Password Recovery")

**Reset Password and Login with new Password** <br/>
Click the link in the email to reset your password. 
Reset the password then attempt to login with your old password. This should fail. Login with your new password

![Password Reset](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/master/demo/PasswordReset.gif "Password Reset")
