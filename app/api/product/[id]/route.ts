import { connectDB } from "@/lib/db";
import Product from "@/models/Product.model";

import { NextRequest, NextResponse } from "next/server";



// GET SINGLE PRODUCT

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // connect database
    await connectDB();

    // get dynamic product id
    const { id } = await params;

    // find product
    const product = await Product.findById(id);

    // check product exists
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    // success response
    return NextResponse.json(
      {
        success: true,
        product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching product",
      },
      {
        status: 500,
      }
    );
  }
}




// UPDATE PRODUCT

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // connect database
    await connectDB();

    // get product id
    const { id } = await params;

    // get request body
    const body = await req.json();

    const {
      name,
      price,
      image,
      category,
      description,
    } = body;

    // check product exists
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        image,
        category,
        description,
      },
      {
        new: true,
      }
    );

    // success response
    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        updatedProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error updating product",
      },
      {
        status: 500,
      }
    );
  }
}




// DELETE PRODUCT

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // connect database
    await connectDB();

    // get product id
    const { id } = await params;

    // check product exists
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    // delete product
    await Product.findByIdAndDelete(id);

    // success response
    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error deleting product",
      },
      {
        status: 500,
      }
    );
  }
}