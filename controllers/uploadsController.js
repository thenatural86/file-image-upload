const path = require('path')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')

const uploadProductImageLocal = async (req, res) => {
  // check if file exist
  if (!req.files) {
    throw new CustomError.BadRequestError('No file Uploaded')
  }

  const productImage = req.files.image
  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image')
  }

  // check size
  const maxSize = 1024 * 1024
  if (productImage.maxSize > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    )
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )
  await productImage.mv(imagePath)
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  )
  // console.log(result)
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json({
    image: { src: result.secure_url },
  })
}
module.exports = { uploadProductImage }
