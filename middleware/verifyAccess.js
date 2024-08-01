exports.verifyAccess = (permission) => {
  return async (req, res, next) => {
    if (permission.roles.includes(req.user?.role)) {
      return next();
    }
    // else if (!permission.roles.includes(req.user?.role)) {
    //     return res
    //       .status(401)
    //       .json({ success: false, message: 'Access denied!' });
    //   }
    if (!permission?.owner)
      return res
        .status(401)
        .json({ success: false, message: "Access denied!" });
    const isOwner = await permission.owner(req);
    if (isOwner === true) return next();
    if (isOwner === false)
      return res
        .status(401)
        .json({ success: false, message: "Access denied!" });
    res.status(500).json({
      success: false,
      message: "Something went wrong! try again later",
    });
  };
};
