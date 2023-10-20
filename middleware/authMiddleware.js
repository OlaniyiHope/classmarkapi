// import jwt from "jsonwebtoken";

// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log("Received token:", token);

//   if (!token || !token.startsWith("Bearer ")) {
//     // Check for 'Bearer ' prefix
//     console.log("Unauthorized - Token missing or invalid format");
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decodedToken = jwt.verify(
//       token.replace("Bearer ", ""), // Remove 'Bearer ' prefix
//       process.env.JWT_SECRET
//     );
//     console.log("Decoded Token:", decodedToken);

//     req.user = decodedToken; // Make sure your token payload includes the 'user' property

//     next();
//   } catch (error) {
//     console.log("Unauthorized - Invalid token");
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// export default authenticateUser;
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

    // Check if the token payload includes the 'role' property
    const userRole = decodedToken.role;
    if (!userRole) {
      console.log("Unauthorized - Role not found in token");
      return res.status(403).json({ error: "Role not found in token" });
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log("Unauthorized - Invalid token");
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticateUser;
