
import { Advert } from "../models/advert_model.js"
import { advertSchema } from "../schemas/advert_schema.js"


export const createAdvert = async (req, res) => {
    try {
        const { error, value } = advertSchema.validate(req.body)
        console.log('value', value)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const advert = await Advert.create(value)
        res.status(201).json({ message: 'advert has been created succesfully', advert });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const getallAdverts = async (req, res) => {

    try {
        const adverts = await Advert.find().populate('user')
        return res.status(200).json({ message: 'all adverts', adverts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getalluserAdverts = async (req, res) => {

    try {
        const userId = req.user.id;
        const adverts = await Advert.find({ user: userId }).populate('user')
        return res.status(200).json({ message: 'all adverts', adverts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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
        const advertId = req.params.id
        const userId = req.user.id;

        const advert = await Advert.findById(advertId)
        if (!advertId) {
            return res.status(400).json({ message: 'Advert ID is required or does not exist' })
        }

        if (advert.user.toString() !== userId) {
            return res.status(403).json({ message: 'you are not authorize to delete this advert' })
        }

        await Advert.findByIdAndDelete(advertId);
        return res.status(200).json({ message: 'advert deleted', Advert })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}