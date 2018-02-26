const express = require("express");
const request = require("request");

const router = express.Router();

router.route("/status")
    .get((req, res) => res.send("UI MIcrservice running"))

router.route("/users")
    .get((req, res) => {
        request({
            uri: process.env.USER_SERVICE_URL,
            method: "GET",
            followRedirect: true,
            maxRedirects: 10
        }, function(error, response, body) {
            if(error) return res.status(500).send(error.message)
            res.render("userList", { users: JSON.parse(body) });
        });
    });

router.route("/users/create/form")
    .get((req, res) => {
        res.render("userCreateForm", {})
    });

router.route("/users/save")
    .post((req, res) => {
        request({
            uri: process.env.USER_SERVICE_URL+"/create",
            method: "POST",
            "content-type": "multipart/form-data",
            followRedirect: true,
            form: req.body
        }, function(error, response, body) {
            if(error) return res.status(500).send(error.message)
            res.status(200).send(body)
        });
    });
module.exports = router;