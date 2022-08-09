import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxLength: [100, 'Product Name can not be more than 100']
    },
    price: {
        type: Number,
        required: [5, 'Price of the product must be entered'],
        default: 0.0,
        maxLength: [10, 'Price of the product must not exceed 10 characters.']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    rating  : {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true , 'Category field is required.'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                "Clothes",
                "Shoes",
                "Health",
                "Sports",
                "Outdoor",
                "Home"
            ],
            message: 'Category entered is incorrect'
        },
    },
    seller: {
        type: String,
        required: [true, 'Seller field is required.'],
    },
    stock: {
        type: Number,
        required: [5, 'Stock must not be greater than 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: 
        [
            {
                name: {
                    type: String,
                    // required: true
                },
                rating: {
                    type: Number,
                    // required: true
                },
                comment: {
                    type: String,
                    // required: true
                }
            }
        ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', productSchema);