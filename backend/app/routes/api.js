var User = require('../models/user');
var Order =  require('../models/orders');
var jwt = require('jsonwebtoken');
var secret = 'jsonsecretebuddy'; 

module.exports = function(router) {

    router.post('/signup',(req,res)=>{    
        User.findOne({username:req.body.username},{$exists: true})
        .select('username').exec((err,exist)=>{
            if(!err && exist){
                    res.json({success:false, message:"Username already exist!"});            
            }else{
                var user = new User();
                user.username = req.body.username,
                user.password = req.body.password;  
                user.save((err,user)=>{
                    if(!err && user){
                        res.json({success:true, message:"Signup successful!"});
                    }else{
                        res.json({success:false, message:"Please provide all details!"});
                    }
                });
            }
        });
    });

    router.post('/login',(req,res)=>{
        User.findOne({username:req.body.username}).select('_id username password role').exec((err,user)=>{
            if(!err && user){
                if(!req.body.password){
                    res.json({success:false, message:'Password not Provided!'});
                }else{
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({ success: false, message: 'Could not authenticate password' });
                    }else {
                        var token = jwt.sign({ username: user.username, _id:user._id }, secret, { expiresIn: '24h' });
                        res.json({ success: true, message: user, token: token });
                    }  
                }
            }else{
                res.json({success:false, message:'Invalid username'});
            }
        })
    });

    // Middleware for Routes that checks for token authentication
    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' }); 
                } else {
                    req.decoded = decoded; 
                    next(); 
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' }); 
        }
    });
   
    router.post('/usertoken', function(req, res) {
        res.send(req.decoded); 
    });

    //Route to add Orders
    router.post('/addorders',(req,res)=>{
        User.findOne({_id:req.decoded._id}).select()
        .exec((err,user)=>{
            if(!err && user){
                Order.find({},(err,orders)=>{
                    if(!err && orders){
                        // res.json(orders[orders.length-1].orderNumber+1)
                        let order = new Order();
                        order.orderNumber = orders[orders.length-1].orderNumber+1;
                        order.userId = req.decoded._id;
                        order.orderDueDate = new Date(req.body.orderDueDate);
                        order.customerBuyerName = req.body.customerBuyerName;
                        order.customeAddress = req.body.customeAddress;
                        order.customerPhone = req.body.customerPhone;
                        order.orderTotal = req.body.orderTotal;
                        order.save((error,ordr)=>{
                            if(!error){
                                res.json({success:true, message:ordr});
                            }else{
                                res.json({success:false, message:error});
                            }
                        });
                    }else{
                       res.json({success:false, message:'Cannot add order'});
                    }
                });               
            }else{
                res.json({success:false, message:'Please login to add orders'});
            }
        });
    });

    //Route to get all the Orders of Single User
    router.post('/getorders',(req,res)=>{
        User.findOne({_id:req.decoded._id}).select().exec((err,user)=>{
            if(!err && user){
                Order.find({userId:req.decoded._id}).select().exec((error,orders)=>{
                    if(!error && orders){
                        res.json({success:true, message:orders});
                    }else{
                        res.json({success:false, message:'No orders found'});
                    }
                })
            }else{
                res.json({success:false, message:'Invalid user, Please login to continue'});
            }
        })
    });

    //Route to get all the Orders of Single User
    router.post('/getorder',(req,res)=>{
        User.findOne({_id:req.decoded._id}).select().exec((err,user)=>{
            if(!err && user){
                Order.find({_id:req.body._id}).select().exec((error,orders)=>{
                    if(!error && orders){
                        res.json({success:true, message:orders});
                    }else{
                        res.json({success:false, message:'No orders found'});
                    }
                })
            }else{
                res.json({success:false, message:'Invalid user, Please login to continue'});
            }
        })
    });
    
    //Route to update order
    router.put('/updateorder',(req,res)=>{
        User.findOne({_id:req.decoded._id}).select().exec((err,user)=>{
            if(!err && user){
                Order.findOne({_id:req.body._id}).select().exec((error, order)=>{
                   if(!error && order){
                        order.orderDueDate = req.body.orderDueDate;
                        order.customerBuyerName = req.body.customerBuyerName;
                        order.customeAddress = req.body.customeAddress;
                        order.customerPhone = req.body.customerPhone;
                        order.orderTotal = req.body.orderTotal;
                        order.save((errr,ordr)=>{
                            if(!errr){
                                res.json({success:true, message:ordr});
                            }else{
                                res.json({success:false, message:'Cannot update order'})
                            }
                        })
                   }else{
                       res.json({success:false, message:'Order not found'});
                   }
                })
            }else{
                res.json({success:false, message:'Please login to update orders'});
            }
        })
    });

    //Route to delete order
    router.post('/deleteorder',(req,res)=>{
        User.findOne({_id:req.decoded._id}).select().exec((err,user)=>{
            if(!err && user){
                Order.findOneAndDelete({_id:req.body._id}).select('_id').exec((error,order)=>{
                    if(!error && order){
                        res.json({success:true, message:'Order deleted successfully'});
                    }else{
                        res.json({success:false, message:'Order not found'});
                    }
                });
            }else{
                res.json({success:false, message:'Please login to continue'});
            }
        })
    });

    return router;
};
