import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";



const addressOptions = {
  pune: "3rd Floor,S No 52, Baner Business Bay,Baner-Sus Road,Behind Audi, Off Mumbai Banglore Highway,Baner Pune 411045",
  hyderabad: "Urban Desk, 3rd Floor,Gowra Palladium,Raidurg,Hyderabad - 500081",
                        
};

// const [selectedAddressOption, setSelectedAddressOption] = useState("pune"); // default


const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedAddressOption, setSelectedAddressOption] = useState("pune"); // default


  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleCheckout = () => {
    if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
      toast.error("Please fill in all customer details.");
      return;
    }

    const orderId = Math.floor(Math.random() * 1000000).toString();
    const orderDate = new Date().toLocaleString();
    const totalPrice = getTotalPrice();

    const orderData = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      customer_address: customerAddress,
      order_id: orderId,
      order_date: orderDate,
      shipping: 0,
      tax: Math.round(getTotalPrice() * 0.18).toLocaleString(),
      total: totalPrice,
      items: items,
    };

    emailjs
      .send("service_31acjwn", "template_yfjs8us", orderData, "tc2xACodijJuF6Xcf")
      .then(() => {
        toast.success("Order placed successfully! Confirmation email sent.");
        clearCart();
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        toast.error("Failed to send order email.");
      });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="hero" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full md:w-24 h-32 md:h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="bg-gradient-card border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}</span>
                </div>

                <Button onClick={() => setIsModalOpen(true)} variant="hero" className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <Button onClick={clearCart} variant="outline" className="w-full">
                  Clear Cart
                </Button>

                <div className="text-center">
                  <Link to="/products" className="text-primary hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Enter Contact Details</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block mb-1 text-sm font-medium text-black">
                  Full Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded text-black"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block mb-1 text-sm font-medium text-black">
                  Email
                </label>
                <input
                  id="customerEmail"
                  type="email"
                  placeholder="Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded text-black"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block mb-1 text-sm font-medium text-black">
                  Phone
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  placeholder="Phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">Select Address</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address"
                      value="pune"
                      checked={selectedAddressOption === "pune"}
                      onChange={(e) => {
                        setSelectedAddressOption(e.target.value);
                        setCustomerAddress(addressOptions.pune);
                      }}
                    />
                    <span className="text-black">Pune Office</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address"
                      value="hyderabad"
                      checked={selectedAddressOption === "hyderabad"}
                      onChange={(e) => {
                        setSelectedAddressOption(e.target.value);
                        setCustomerAddress(addressOptions.hyderabad);
                      }}
                    />
                    <span className="text-black">Hyderabad Office</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address"
                      value="other"
                      checked={selectedAddressOption === "other"}
                      onChange={(e) => {
                        setSelectedAddressOption(e.target.value);
                        setCustomerAddress(""); // clear input for custom address
                      }}
                    />
                    <span className="text-black">Other</span>
                  </label>
                </div>
              </div>

              {selectedAddressOption === "other" && (
                <div>
                  <label htmlFor="customerAddress" className="block mt-4 mb-1 text-sm font-medium text-black">
                    Enter Address
                  </label>
                  <textarea
                    id="customerAddress"
                    placeholder="Enter your full address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded text-black"
                  />
                </div>
              )}


              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCheckout} variant="hero">
                  Confirm & Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
