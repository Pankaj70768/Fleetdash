const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        token = req.headers.authorization.split(" ")[1];

        try {

            const decoded = jwt.verify(
                token,
                "fleetdash_secret_key"
            );

            req.user = decoded;

            next();

        } catch (error) {

            return res.status(401).json({

                success: false,

                message: "Invalid Token"

            });

        }

    }

    else {

        return res.status(401).json({

            success: false,

            message: "No Token Provided"

        });

    }

};

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message: "Access Denied"

            });

        }

        next();

    };

};

module.exports = {

    protect,

    authorize

};