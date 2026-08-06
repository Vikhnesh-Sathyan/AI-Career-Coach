const adminOnly = (req, res, next) => {

    if (!req.user || req.user.role !== "admin") {

        return res.status(403).json({

            success: false,

            message: "Access Denied. Admin only."

        });

    }

    next();

};

export default adminOnly;