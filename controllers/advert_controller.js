
import { Advert } from "../models/advert_model.js"
import { advertSchema } from "../schemas/advert_schema.js"
import { buildAdvertFilter } from "../utils/help.js"


export const createAdvert = async (req, res) => {
  try {
    const { error, value } = advertSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // ✅ Extract image URLs from Cloudinary upload (via Multer)
    const imageUrls = req.files?.map(file => file.path) || [];

    // ✅ Add imageUrls to validated data
    value.images = imageUrls;

    const advert = await (
      await Advert.create({
        ...value,
        user: req.user.id, // Make sure you're including the user here
      })
    ).populate("user", "-password -otp");

    res.status(201).json({ message: "advert has been created succesfully", advert });
  } catch (error) {
    console.error("Create Advert Error:", error);
    res.status(500).json({ message: error.message });
  }
};




export const getallAdverts = async (req, res) => {

    try {
        const adverts = await Advert.find().populate('user', '-password -otp') // exclude password, otp field
        return res.status(200).json({ message: 'all adverts', adverts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getalluserAdverts = async (req, res) => {

    try {
        const userId = req.user.id;
        const adverts = await Advert.find({ user: userId }).populate('user', '-password -otp') // exclude password, otp field
        return res.status(200).json({ message: 'all adverts', adverts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAuserAdverts = async (req, res) => {
    try {
        const filter = buildAdvertFilter(req.user.id, req.params.id, req.query.category,req.query.subCategory,req.query.name,req.query.price);
        const adverts = await Advert.find(filter).populate('user', '-password -otp');

        if (!adverts.length) {
            return res.status(404).json({ message: 'No matching adverts found' });
        }

        return res.status(200).json({ message: 'Matching adverts found', adverts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// export const updateUserAdverts = async (req, res) => {

//     try {
//         const userId = req.user.id;
//         const advertId = req.params.id;
//         const advert = await Advert.findById(advertId)
//         if (!advertId) {
//             return res.status(400).json({ message: 'Advert ID is required or does not exist' })
//         }

//         if (advert.user.toString() !== userId) {
//             return res.status(403).json({ message: 'you are not authorize to Edit this advert' })
//         }
//         const updatedAdvert = await Advert.findOneAndUpdate(
//             { id: advertId, user: userId },
//             req.body,
//             { new: true } // return the updated document
//         );
//         return res.status(200).json({ message: 'Updated', updatedAdvert })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const updateUserAdverts = async (req, res) => {
  try {
    const userId = req.user.id;
    const advertId = req.params.id;

    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: 'Advert not found' });
    }

    if (advert.user.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this advert' });
    }

    const updatedAdvert = await Advert.findOneAndUpdate(
      { _id: advertId, user: userId }, // ✅ use 'user', not 'userId'
      req.body,
      { new: true }
    );

    if (!updatedAdvert) {
      return res.status(400).json({ message: 'Update failed' });
    }

    return res.status(200).json({ message: 'Updated', updatedAdvert });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deluserAdverts = async (req, res) => {
    try {
        const advertId = req.params.id;
        const userId = req.user.id;

        if (!advertId) {
            return res.status(400).json({ message: 'Advert ID is required' });
        }

        const advert = await Advert.findById(advertId);

        if (!advert) {
            return res.status(404).json({ message: 'Advert not found' });
        }

        if (advert.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this advert' });
        }

        await Advert.findByIdAndDelete(advertId);
        return res.status(200).json({ message: 'Advert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
