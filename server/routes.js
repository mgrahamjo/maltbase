module.exports = {
    GET: {
        '/my-brews': req => {
            
            req.send({
                brews: [{
                    recipe: 1,
                    mashPlan: 2,
                    fermentationPlan: 3,
                    equipment: 4,
                    status: 'unstarted',
                    createdDate: new Date()
                }]
            });

        }
    }
};
