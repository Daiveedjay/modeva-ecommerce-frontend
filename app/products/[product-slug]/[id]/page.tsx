import ProductClient from "@/app/products/[product-slug]/[id]/_components/product-client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string; "product-slug": string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await props.params;
    const apiUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiUrl) {
      console.error("API_BASE_URL is not defined");
      return {
        title: "Product",
        description: "View product details",
      };
    }

    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return {
        title: "Product not found",
        description: "This product could not be found.",
      };
    }

    const json = await res.json();
    const product = json?.data;

    if (!product) {
      return {
        title: "Product not found",
        description: "This product could not be found.",
      };
    }

    const imageUrl = product.media.primary.url;

    return {
      title: product.name,
      description: product.description,
      openGraph: {
        type: "website",
        title: product.name,
        description: product.description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product",
      description: "View product details",
    };
  }
}

export default function Page() {
  return <ProductClient />;
}
