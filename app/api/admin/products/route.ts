import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product.model";
import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}

// GET all products (admin)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// POST create product (admin)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  try {
    await connectDB();
    const body = await req.json();
    const { name, price, image, category, description } = body;

    if (!name || !price || !image || !category || !description) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await Product.create({ name, price, image, category, description });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// DELETE product by id (admin) — pass ?id=xxx in query string
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
