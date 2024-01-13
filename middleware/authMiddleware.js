import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  console.log("Received token:", token);

  if (!token || !token.startsWith("Bearer ")) {
    // Check for 'Bearer ' prefix
    console.log("Unauthorized - Token missing or invalid format");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decodedToken);

    // Set decodedToken on the request object
    req.decodedToken = decodedToken;

    // Check if the token payload includes the 'sub' property (user ID)
    const userId = decodedToken.user && decodedToken.user._id;

    if (!userId) {
      console.log("Unauthorized - User ID not found in token");
      return res.status(403).json({ error: "User ID not found in token" });
    }

    req.user = { id: userId };
    console.log("Authenticated user:", req.user);

    next();
  } catch (error) {
    console.log("Unauthorized - Invalid token");
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticateUser;
