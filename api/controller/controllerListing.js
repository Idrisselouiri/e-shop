import Listing from "../model/model.listing.js";
import { errorHandler } from "../utils/error.js";

export const CreateListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const GetListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(201).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "You can only get your listing for your account"));
  }
};

export const DeleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "listing not exist"));

  if (req.user.id !== listing.userRef)
    return next(
      errorHandler(401, "You can only delete your listing for your account")
    );
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const UpdateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "listing not exist"));
  if (req.user.id !== listing.userRef)
    return next(
      errorHandler(401, "You can only delete your listing for your account")
    );
  try {
    const UpdatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(UpdatedListing);
  } catch (error) {
    next(error);
  }
};

export const GetListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "listing not exist"));
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
