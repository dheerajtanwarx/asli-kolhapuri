import { connectDB } from "@/lib/db";
import Product from "@/models/Product.model";
import { NextRequest, NextResponse } from "next/server";

//add products
export async function POST(req: NextRequest) {
    try {
        //db connection
        await connectDB();
    
        const body = await req.json()

        const { name, price, image, category, description} = body;

        if( !name || !price ||   !image ||    !category ||    !description){
            return NextResponse.json(
                {
                    success:false,
                    message: "All fields are required"
                },
                {status:400}
            )
        }

        //create product
        const product = await Product.create({
             name,
             price,
             image,
             category,
             description,
        })

        return NextResponse.json(
            {
            success: true,
            message:"Product added successfully",
            product,
        },
        {
            status:201
        }
    )
        
    } catch (error) {
         console.log(error);

    return NextResponse.json(

      {

        success: false,

        message: "Server Error",

      },

      { status: 500 }

    );
    }
}

//GET products
export async function GET(req: NextRequest) {
  try {
    // connect database
    await connectDB();

    // get query params from URL
    const searchParams = req.nextUrl.searchParams;

    // pagination params
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    // search query
    const query = searchParams.get("query") || "";

    // create base query
    let productsQuery = Product.find({
      name: {
        // regex search
        $regex: query,

        // case insensitive search
        $options: "i",
      },
    });

    // apply pagination only if limit exists
    if (limit) {
      // default page = 1
      const currentPage = page || 1;

      productsQuery = productsQuery
        // skip previous products
        .skip((currentPage - 1) * limit)

        // limit products per page
        .limit(limit);
    }

    // execute query
    const products = await productsQuery;

    // send response
    return NextResponse.json({
      success: true,

      // total fetched products
      count: products.length,

      products,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching products",
      },
      {
        status: 500,
      }
    );
  }
}

