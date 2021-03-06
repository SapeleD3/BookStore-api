const express = require('express')
const AuthRoute = require('../config/AuthRoute')
const router = express.Router()

const storyController = require('../controllers/stories')

router.get('/', storyController.getStories)
router.get('/new', AuthRoute, storyController.myStories)
router.get('/user/:id', storyController.getUserStory)
router.get('/:id', storyController.getStory)
router.put('/:id', AuthRoute, storyController.updateStory)
router.delete('/:id', AuthRoute, storyController.deleteAstory)
router.post('/', AuthRoute, storyController.postStory)
router.post('/comment/:id', AuthRoute, storyController.commentOn)


module.exports = router