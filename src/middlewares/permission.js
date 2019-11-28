// Add this to the top of the file
const roles = require('../config/roles');

// The grantAccess middleware, on the other hand, allows only users with certain roles access to the route. It takes two arguments action and resource, action will be a value such as readAny, deleteAny, etc.. this indicates what action the user can perform while resource represents what resource the defined action has permission to operate on e.g profile. The roles.can(userRole)[action](resource) method determines if the user’s role has sufficient permission to perform the specified action of the provided resource. We’ll see exactly how this works next.
exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            let { role } = req.user;

            const permission = roles.can(role)[action](resource);

            if (!permission.granted) return res.status(401).json({message: "You don't have enough permission to perform this action"});

            next()
        } catch (error) {
            next(error)
        }
    }
};