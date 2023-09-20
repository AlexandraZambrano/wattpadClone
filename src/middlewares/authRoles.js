import User from "../Models/user.model.js";

export const verifyRole = async (req, res, next) => {

    const id = req.user._id

    const UserDbRole = await User.findById(id)
    console.log(UserDbRole)
    console.log(id)
    
    if (UserDbRole.role !== req.user.role) {
        res.status(403).json({ message: 'Permission denied' });
    } 

    console.log(UserDbRole.role)
    console.log(req.user.role)

    next()
  };



//VERIFIES THE ROLE OF THE USER IS ADMIN SO IF IT ABLE TO ACCESS INFORMATION
export const verifyAdminRole = (req, res, next) => {

    const userRole = [req.user.role]

    console.log(userRole)

    // Check if the user role is 'admin' (you can adjust this logic as needed)
    if (req.user && userRole.includes('admin')) { 
      next(); // User is an admin, proceed to the next middleware/route handler
    } else {
      res.status(403).json({ message: 'Permission denied' }); // User does not have admin role
    }
  };