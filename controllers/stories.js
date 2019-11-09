const Story = require('../models/stories')

exports.postStory = (req, res) => {
    console.log(req.userData)

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: req.body.allowComments,
        user: req.userData.id
    }
    new Story(newStory).save()
    .then(story => {
        if(story) {
            res.status(200).json({
                message: "Story Added successfully",
                story
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error : err})
    })
}

exports.getStories = async (req, res) => {
    await Story.find({status: 'public'}).populate('user')
    .then(stories => {
        if(stories){
            res.status(200).json(stories)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.getStory = async (req, res) => {
    const _id = req.params.id
    await Story.findOne({ _id }).populate('user').then(story => {
        if(story){
            res.status(200).json(story)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
}