export const GetAllPost = async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const {  user_id,color_code } = req.query;
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / pageSize);
        const skip = (Number(page) - 1) * pageSize;
        console.log(skip,color_code);
        // Fetch posts sorted by updatedAt in descending order with selected fields
        // const posts = await Post.find({color_code:color_code||"red"}, 'post_title textstyle username color_code createdAt user_id post_img')
        //     .sort({ createdAt: -1 })
        //     .skip(skip)
        //     .limit(pageSize)
        //     .lean(); 
        const posts = await Post.aggregate([
            { 
              $match: { 
                
                 color_code: color_code ||"red"
              
              }
            },
            { 
              $sort: { createdAt: -1 }
            },
            { 
              $project: { 
                post_title: 1, 
                textstyle: 1, 
                username: 1, 
                color_code: 1, 
                createdAt: 1, 
                user_id: 1, 
                post_img: 1
              } 
            },
            { 
              $skip: skip 
            },
            { 
              $limit: pageSize 
            }
          ]).allowDiskUse(true).exec();
           
        // Get unique user IDs from posts
        const userIds = [...new Set(posts.map((post) => post.user_id))];
        const userMap = await Userdetail(userIds);

        //total like and user like or not 
        const post_Ids = [...new Set(posts.map((post) => post._id))];
        const post_LikeMap = await PostTotalLike(post_Ids,user_id);
        // const sortedPosts = posts.sort((a, b) => {
        //     const colorOrder = { red: 1, blue: 2, black: 3 };
        //     return colorOrder[a.color_code] - colorOrder[b.color_code];
        // });


        const userdata = await Promise.all(posts.filter((item)=>item.user_id!==user_id).map(async (post) => {
            const userProfilePic = await UserProfilePic(post.user_id,userMap[post.user_id] ? userMap[post.user_id].sex : "1");
            return {
                Title: post.post_title, 
                Textstyle: post.textstyle,
                Username: post.username,
                Postimage: post.post_img,
                Color: post.color_code,
                createdAt: post.createdAt,
                user_id: post.user_id,
                post_id: post._id,
                user_name: userMap[post.user_id] ? userMap[post.user_id].name : 'Unknown User',
                user_pic: userProfilePic,
                user_post_or_not:false,
                user_present:true,
                total_like: post_LikeMap[post._id]?.total_like || 0, // Ensure to handle cases where post_LikeMap[post._id] is undefined
                user_like: post_LikeMap[post._id]?.user_like || false, 
            }
        }))
        // userdata.sort((a, b) => colorOrder[a.Color] - colorOrder[b.Color]);

        res.status(200).send({ data: userdata, totalPages: totalPages });
    } catch (error) {
        res.status(400).send({ message: `Error fetching data: ${error}` });
    }
};