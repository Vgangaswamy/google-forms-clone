import express from "express";
const router = express.Router();

// Define routes here
router.get("/", (req, res) => {
    res.send("Form Routes Working");
});

export const formRoutes = router;
