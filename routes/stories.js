const express = require('express')
const AuthRoute = require('../config/AuthRoute')
const router = express.Router()

const storyController = require('../controllers/stories')

router.get('/', storyController.getStories)
router.get('/new', AuthRoute, storyController.myStories)
router.put('/:id', AuthRoute, storyController.updateStory)
router.delete('/:id', AuthRoute, storyController.deleteAstory)
router.get('/:id', storyController.getStory)
router.post('/', AuthRoute, storyController.postStory)

module.exports = router