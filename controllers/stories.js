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
    await Story.findOne({ _id }).populate('user').populate('comments.commentUser').then(story => {
        if(story){
            res.status(200).json(story)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
}

exports.myStories = async (req, res) => {
    const user = req.userData.id
    await Story.find({user : user}).populate('user').then(story => {
        if(story){
            res.status(200).json(story)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.updateStory = async (req, res) => {
    const _id = req.params.id
    await Story.findOne({ _id }).populate('user').then(story => {
        if(req.userData.email === story.user.google.email){
            console.log('got here')
            story.title = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowComments = req.body.allowComments;

            story.save().then(stor => {
                res.status(200).json(stor)
            })
        } else {
            res.status(401).json({message : 'unAuthorized access'}) 
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.deleteAstory = (req, res) => {
    const _id = req.params.id
    Story.deleteOne({ _id }).then(() => {
        res.status(200).json({ message: 'Story Deleted Successfully'})
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.commentOn = async (req, res) => {
    const _id = req.params.id
    await Story.findOne({ _id }).then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.userData.id
        }

        //push
        story.comments.unshift(newComment);
        story.save().then(story => {
            res.status(200).json(story)
        }).catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
    })
}

exports.getUserStory = (req, res) => {
    const _id = req.params.id
    Story.find({ user: _id, status: 'public'}).populate('user')
    .then(stories => {
        res.status(200).json(stories)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}