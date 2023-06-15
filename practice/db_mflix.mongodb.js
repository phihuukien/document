/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'sample_mflix';
const collection = 'NEW_COLLECTION_NAME';

// The current database to use.
use(database);

// db.movies.find().limit(1)
// db.movies.find({
//     year: {
//         $gte: 2016, //greater than or equals
//         $lte: 2018, //less than or equals 
//     }
// }, {
//     plot: 1,
//     year: 1,    
// })
// db.movies.distinct("type")
// db.movies.find({"tomatoes.viewer.rating":5}, {
//     tomatoes: 1
// }).count()
// db.movies.find().count()
// db.movies.aggregate().toArray().length
db.comments.aggregate([
    {
        $group: {
            _id: "$movie_id",
            numberOfComments: {
                $count: {}
            }
        }
    },  
    {
        $lookup: {
            from: "movies",
            localField: "_id",
            foreignField: "_id",
            as: "detailMovie"
        },
       
    },
    { 
        $project: {
        "detailMovie.title":1
    } 
    },
    {
        $limit:  3
    } 

])