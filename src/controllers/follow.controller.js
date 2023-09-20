import User from "../Models/user.model.js";
import Follow from "../Models/follow.model.js";


//FOLLOWS USER
export const followsUser = async (req, res) => {

    const { id } = req.params
    const userId = req.user._id

    try {
        const userToFollow = User.findById(id)

        if(!userToFollow) {
            return res.status(404).json({ message: "User not found" })
        }

        // Create a new instance of Follow
        const follow = new Follow({
          followers: [id],
          following: [userId],
        });

        // Save the follow instance
        await follow.save();

        // Add the follow instance to the user's "follows" array
        await User.findByIdAndUpdate(userId, { $push: { "follows": follow } });

        res.status(200).json({ message: 'User followed successfully' });
        
    } catch (error) {
        res.json(error)
    }

}


  
//UNFOLLOWS USER
export const unFollowsUser = async (req, res) => {

  const { id } = req.params
  const userId = req.user._id

  try {
      const userToUnFollow = User.findById(id)

      if(!userToUnFollow) {
          return res.status(404).json({ message: "User not found" })
      }

      await User.findByIdAndUpdate(userId, { $pull: { "follows.following": id} })

      await User.findByIdAndUpdate(id, { $pull: { "follows.followers": userId} })

      res.status(200).json({ message: 'User Unfollowed successfully' });
      
  } catch (error) {
      res.json(error)
  }

}

