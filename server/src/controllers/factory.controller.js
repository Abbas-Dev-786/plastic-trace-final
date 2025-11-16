const { catchAsync } = require("./../utils/catchAsync");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");

// handle get all docs function with API features
const getAllDocs = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .search();

    const docs = await Model.paginate(features.query, {
      page: req.query.page || 1,
      limit: req.query.limit || 20,
    });

    res
      .status(200)
      .json({ status: "success", results: docs.length, data: docs });
  });

// get a single doc function
const getDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError(404, "Document does not exists"));
    }

    res.status(200).json({ status: "success", data: doc });
  });

// create doc function
const createDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({ status: "success", data: doc });
  });

// update doc function
const updateDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedDoc) {
      return next(new AppError(404, "Document does not exists"));
    }

    res.status(200).json({ status: "success", data: updatedDoc });
  });

// delete doc functions
const deleteDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(404, "Document does not exists"));
    }

    res.status(204).json({ status: "success" });
  });

module.exports = {
  getAllDocs,
  getDoc,
  createDoc,
  updateDoc,
  deleteDoc,
};
