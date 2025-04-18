// import jwt from "jsonwebtoken";

// const authenticateUser = (req, res, next) => {
//   console.log("AuthenticateUser middleware executed");

//   // Extract token from Authorization header
//   const authHeader = req.headers.authorization;
//   console.log("Authorization header:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("Unauthorized - Token missing or invalid format");
//     return res
//       .status(401)
//       .json({ error: "Unauthorized - Token missing or invalid format" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("Token:", token);

//   try {
//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decodedToken);

//     // Attach user information to the request object
//     req.user = decodedToken.user;

//     if (!req.user || !req.user._id) {
//       console.log("Unauthorized - User ID not found in token");
//       return res
//         .status(403)
//         .json({ error: "Unauthorized - User ID not found in token" });
//     }

//     next();
//   } catch (error) {
//     console.log("Unauthorized - Invalid token", error);
//     return res.status(401).json({ error: "Unauthorized - Invalid token" });
//   }
// };

// export default authenticateUser;
import jwt from "jsonwebtoken";

// const authenticateUser = (req, res, next) => {
//   console.log("AuthenticateUser middleware executed");

//   // Extract token from Authorization header
//   const authHeader = req.headers.authorization;
//   console.log("Authorization header:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("Unauthorized - Token missing or invalid format");
//     return res
//       .status(401)
//       .json({ error: "Unauthorized - Token missing or invalid format" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("Token:", token);

//   try {
//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decodedToken);

//     // Correctly attach user ID to request object
//     req.user = { _id: decodedToken._id };

//     if (!req.user._id) {
//       console.log("Unauthorized - User ID not found in token");
//       return res
//         .status(403)
//         .json({ error: "Unauthorized - User ID not found in token" });
//     }

//     next();
//   } catch (error) {
//     console.log("Unauthorized - Invalid token", error);
//     return res.status(401).json({ error: "Unauthorized - Invalid token" });
//   }
// };
const authenticateUser = (req, res, next) => {
  console.log("AuthenticateUser middleware executed");

  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Unauthorized - Token missing or invalid format");
    return res
      .status(401)
      .json({ error: "Unauthorized - Token missing or invalid format" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    // ✅ Corrected line
    req.user = decodedToken.user; // attach the whole user object

    if (!req.user || !req.user._id) {
      console.log("Unauthorized - User ID not found in token");
      return res
        .status(403)
        .json({ error: "Unauthorized - User ID not found in token" });
    }

    next();
  } catch (error) {
    console.log("Unauthorized - Invalid token", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default authenticateUser;
