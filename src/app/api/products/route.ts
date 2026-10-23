import { NextRequest, NextResponse } from "next/server";
import { INITIAL_PRODUCTS, Product } from "@/lib/data";

// In-memory collection for demo purposes
let products: Product[] = [...INITIAL_PRODUCTS];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category");

  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    count: filtered.length,
    total: products.length,
    data: filtered,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Validation failed: 'title', 'price', and 'category' are required." },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: body.title,
      description: body.description || "Demo product created via Next.js Route Handler.",
      category: body.category,
      price: Number(body.price),
      rating: 5.0,
      inStock: true,
      image:
        body.image ||
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=60",
      features: body.features || ["New release", "Instant shipping"],
      specs: body.specs || { Type: "Hardware / Software" },
    };

    products.unshift(newProduct);

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}
