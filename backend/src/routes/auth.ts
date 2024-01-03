import express from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();
router.post("/login", [
  check("email", "email is required").isEmail(),
  check("password", "password with six or more characters required").isLength({
    min: 6
  })
]);