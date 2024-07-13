const generateToken = (user, message, statusCode, res) => {
    let cookieName;
    // Determine the cookie name based on the user role
    if (user.role === "Admin") {
        cookieName = "adminToken";
    } else if (user.role === "Driver") {
        cookieName = "driverToken";
    } else {
        cookieName = "userToken";
    }

    // Generate the token
    const token = user.generateJsonWebToken();
    
    // Set the cookie with the appropriate name and send the response
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).json({
        success: true,
        message,
        user,
        token,
    });
};

module.exports = { generateToken };


