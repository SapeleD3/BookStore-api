const express = require('express')
const AuthRoute = require('../config/AuthRoute')
const router = express.Router()

const storyController = require('../controllers/stories')

router.get('/', storyController.getStories)
router.get('/:id', storyController.getStory)
router.post('/', AuthRoute, storyController.postStory)

module.exports = router