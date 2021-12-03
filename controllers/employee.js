const express = require("express");
const { check, validationResult } = require("express-validator");

const Employee = require("../models/employee");
const responseBuilder = require("../utils/response-builder");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Employee.find();
    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Employee.findById(id);

    if (result === null) {
      return responseBuilder.BAD_REQUEST(res, {
        message: "Employee doesn't exist!",
      });
    }
    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
});

router.post("/", async (req, res) => {
  await check("firstName").notEmpty().run(req);
  await check("lastName").notEmpty().run(req);
  await check("emailId").isEmail().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return responseBuilder.BAD_REQUEST(res, result.array());
  }

  const { firstName, lastName, emailId } = req.body;

  const employee = new Employee({
    firstName,
    lastName,
    emailId,
  });

  try {
    const result = await employee.save();
    return responseBuilder.CREATED(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
});

router.put("/:id", async (req, res) => {
  await check("id").notEmpty().run(req);
  await check("firstName").notEmpty().run(req);
  await check("lastName").notEmpty().run(req);
  await check("emailId").isEmail().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return responseBuilder.BAD_REQUEST(res, result.array());
  }

  const { id: bodyId, firstName, lastName, emailId } = req.body;
  const { id: paramsId } = req.params;

  if (paramsId !== bodyId) {
    return responseBuilder.BAD_REQUEST(res, {
      message: "Invalid Employee ID",
    });
  }

  try {
    if (!(await Employee.findOne({ _id: bodyId }))) {
      return responseBuilder.BAD_REQUEST(res, {
        message: "Employee doesn't exist!",
      });
    }

    const result = await Employee.findOneAndUpdate(
      { _id: bodyId },
      {
        firstName,
        lastName,
        emailId,
      },
      { new: true }
    );
    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return responseBuilder.BAD_REQUEST(res, {
        message: "Employee ID doesn't exist",
      });
    }
    return responseBuilder.NO_CONTENT(res);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
});

module.exports = router;
