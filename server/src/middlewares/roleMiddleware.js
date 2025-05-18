

exports.AuthrizedRoles = (...allowedRoles) => {

    // ...allowedRoles is the rest parameter, which allows passing in one or more roles like this: AuthrizedRoles("admin", "manager")
    return (req, res, next) => {

        const userRole = req.userInformation?.role; //  req.userInformation --> comes from verifyToken.js

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied: unauthorized role" });
        }
        //In JavaScript, Array.prototype.includes() checks if an array contains a specific value.
        next();
    };


}