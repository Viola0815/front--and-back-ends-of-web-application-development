const products = [
  { 
    id: 1, 
    name: "Dog Bed", 
    price: 12.99,
    imageUrl: "/image/dogBed.jpg" 
  },
  { 
    id: 2, 
    name: "Dog Hoodie", 
    price: 10.99,
    imageUrl: "/image/dogClothing.jpg" 
  },
  { 
    id: 3, 
    name: "Dog Toy", 
    price: 8.99,
    imageUrl: "/image/dogToy.jpg"
  },
  { 
    id: 4, 
    name: "Dog Vitamin Pill", 
    price: 15.99,
    imageUrl: "/image/dogVitaminPill.jpg"
  },

];


function getAllProducts() {
  return products;
}

module.exports = getAllProducts
