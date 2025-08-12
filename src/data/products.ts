// import tshirtImage from "@/assets/tshirt-aiden.jpg";
import tshirtImage from "@/assets/Aiden AI T- Shirt.png";
// import capImage from "@/assets/cap-aiden.jpg";
import capImage from "@/assets/Aiden AI Baseball Cap.png";

// import bottleImage from "@/assets/bottle-aiden.jpg";
// import bottleImage from "@/assets/Aiden AI Bottle.png";
import bottleImage from "@/assets/bottle1536.jpg";
// import penImage from "@/assets/pen-aiden.jpg";
import penImage from "@/assets/Aiden AI Pen.png";
// import diaryImage from "@/assets/diary-aiden.jpg";
import diaryImage from "@/assets/AidenAI Diary.jpg";
import headphonesImage from "@/assets/headphones-aiden.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aiden AI Polo T-Shirt",
    price: 599,
    originalPrice: 999,
    discount: 40,
    // image: tshirtVideo,
    image: tshirtImage,
    description: "Premium cotton polo t-shirt with embroidered Aiden AI logo. Comfortable and professional for office wear.",
    category: "Apparel"
  },
  {
    id: "2",
    name: "Aiden AI Baseball Cap",
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: capImage,
    description: "Stylish black baseball cap with Aiden AI logo. Perfect for casual outings and team events.",
    category: "Accessories"
  },
  {
    id: "3",
    name: "Aiden AI Water Bottle",
    price: 299,
    image: bottleImage,
    description: "Stainless steel insulated water bottle with Aiden AI branding. Keeps drinks hot or cold for hours.",
    category: "Lifestyle"
  },
  {
    id: "4",
    name: "Aiden AI Premium Pen",
    price: 49,
    originalPrice: 99,
    discount: 50,
    image: penImage,
    description: "Elegant business pen with engraved Aiden AI logo. Perfect for meetings and professional use.",
    category: "Office"
  },
  {
    id: "5",
    name: "Aiden AI Executive Diary",
    price: 199,
    image: diaryImage,
    description: "Premium leather-bound diary with gold embossed Aiden AI logo. Perfect for planning and note-taking.",
    category: "Office"
  },
  {
    id: "6",
    name: "Aiden AI Wireless Headphones",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: headphonesImage,
    description: "High-quality wireless headphones with Aiden AI branding. Premium sound quality for work and leisure.",
    category: "Tech"
  }
];