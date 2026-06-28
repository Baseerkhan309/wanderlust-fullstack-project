const sampleListings = [
  {
    title: "Mountain Cottage in Swat",
    description:
      "Enjoy peaceful mountain views and cool weather in this cozy cottage surrounded by nature.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1680020009117-911d3d3b4927?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3dhdCUyMHZhbGxleXxlbnwwfHwwfHx8Mg%3D%3D",
        filename: "listingimage",
      },
    ],
    price: 7000,
    location: "Swat",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [72.4258, 35.2227],
    },
  },

  {
    title: "Riverside Retreat in Kalam",
    description:
      "Relax beside the river with beautiful scenery and fresh mountain air.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1634288495081-d62e486e88ba?q=80&w=735&auto=format&fit=crop",
        filename: "listingimage",
      },
    ],
    price: 8500,
    location: "Kalam",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [72.5856, 35.4907],
    },
  },

  {
    title: "Luxury Stay in Abbottabad",
    description:
      "Modern accommodation with peaceful surroundings and easy access to tourist spots.",
    images: [
      {
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/60/ae/b5/caption.jpg?w=1100&h=600&s=1",
        filename: "listingimage",
      },
    ],
    price: 9000,
    location: "Abbottabad",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [73.2215, 34.1688],
    },
  },

  {
    title: "Lake View Cabin in Naran",
    description:
      "Beautiful cabin near lakes and mountains perfect for family vacations.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573143686363-30560f0abc1d?q=80&w=783&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage",
      },
    ],
    price: 11000,
    location: "Naran",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [73.6500, 34.9083],
    },
  },

  {
    title: "Adventure Camp in Kaghan",
    description:
      "Stay close to nature with hiking and outdoor activities nearby.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1694327454162-bd320f1538fd?q=80&w=1358&auto=format&fit=crop",
        filename: "listingimage",
      },
    ],
    price: 6000,
    location: "Kaghan",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [73.5790, 34.7930],
    },
  },

  {
    title: "Hilltop Guest House in Chitral",
    description:
      "Experience traditional culture and stunning mountain landscapes.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingimage",
      },
    ],
    price: 9500,
    location: "Chitral",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [71.7864, 35.8510],
    },
  },

  {
    title: "Nature Lodge in Dir",
    description:
      "Quiet lodge surrounded by forests and scenic valleys.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingimage",
      },
    ],
    price: 6500,
    location: "Dir",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [71.8400, 35.2070],
    },
  },

  {
    title: "Family Resort in Malam Jabba",
    description:
      "Perfect destination for skiing and mountain adventures.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingimage",
      },
    ],
    price: 12000,
    location: "Malam Jabba",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [72.5710, 34.7990],
    },
  },

  {
    title: "Peaceful Cottage in Upper Dir",
    description:
      "Escape city life and enjoy the calm atmosphere of Upper Dir.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingimage",
      },
    ],
    price: 7500,
    location: "Upper Dir",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [71.8500, 35.5500],
    },
  },

  {
    title: "Valley Resort in Shangla",
    description:
      "Stay in the heart of green valleys with breathtaking views.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingimage",
      },
    ],
    price: 8000,
    location: "Shangla",
    country: "Pakistan",
    geometry: {
      type: "Point",
      coordinates: [72.6200, 34.9300],
    },
  },
];

module.exports = { data: sampleListings };