import Email from '../model/email.js';


export const saveSentEmails = async (request, response) => {
    try {
        const email = await new Email(request.body);
        email.save();

        response.status(200).json(`email saved successfully`);
    } catch (error) {
        response.status(500).json(error.message);
    }

}

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({
                starred: true,
                bin: false,
                $or: [{
                    to: request.query.to
                }, {
                    from: request.query.to
                }]
            });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({
                bin: true,
                $or: [{
                    to: request.query.to
                }, {
                    from: request.query.to
                }]
            })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({
                $or: [{
                    to: request.query.to
                }, {
                    from: request.query.to
                }]
            });
        } else if (request.params.type === 'inbox') {
            emails = await Email.find({
                to: request.query.to
            });
        } else if (request.params.type === 'sent') {
            emails = await Email.find({
                from: request.query.to
            });
        } else {
            emails = await Email.find({
                type: request.params.type,
                $or: [{
                    to: request.query.to
                }, {
                    from: request.query.to
                }]
            });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({
            _id: {
                $in: request.body
            }
        }, {
            $set: {
                bin: true,
                starred: false,
                type: ''
            }
        });

        return response.status(200).json(`emails deleted successfully`);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmails = async (request, response) => {
    try {
        await Email.updateOne({
            _id: request.body.id
        }, {
            $set: {
                starred: request.body.value
            }
        })
        return response.status(200).json("email is starred")
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({
            _id: {
                $in: request.body
            }
        });
        return response.status(200).json('emails deleted sucessfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const returnStatus = (request, response) => {
    return response.status(200).json({"Status":"Online"});
}