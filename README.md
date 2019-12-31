# mesan-nodejs-auth-crud-api
Node.js Authentication API with Email Verification, Image Upload and Password Reset Using JWT, Passport.js and Sendgrid.

**This Branch** <br/>
Email Verification

**Other Branch** <br/>
<a href="https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/tree/auth_no_verification" target="_blank">No Email Verification</a>

## Testing
Use <a href="https://www.getpostman.com" target="_blank">Postman</a> to test.<br/>

**Try accessing the user index route without token [GET]**<br/>

https://mesannodejsapiwithverification.herokuapp.com/api/user<br/>

**Register and Login** <br/>
Create a POST request to /api/auth/register .
Create a POST request to /api/auth/login .

**Make sure to enter a valid email address so you can receive the verification email.**<br/>

https://mesannodejsapiwithverification.herokuapp.com/api/auth/register
https://mesannodejsapiwithverification.herokuapp.com/api/auth/login

**Update User Info** <br/>
Try updating the user information using endpoint/api/user/update passing the token.

https://mesannodejsapiwithverification.herokuapp.com/api/user/update

**Upload Profile Image** <br/>
Try uploading a profile image using endpoint/api/user/upload passing the token.

https://mesannodejsapiwithverification.herokuapp.com/api/user/upload

**Login and Recover Password** <br/>
Create a POST request to /api/auth/recover to recover your password. An email will be sent to you.

https://mesannodejsapiwithverification.herokuapp.com/api/auth/recover

**Reset Password and Login with new Password** <br/>
Click the link in the email to reset your password. 
Reset the password then attempt to login with your old password. This should fail. Login with your new password
