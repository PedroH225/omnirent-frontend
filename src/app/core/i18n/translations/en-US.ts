export const enUS = {
  enums: {
    itemStatus: {
      analysis: 'Analysis',
      available: 'Available',
      rented: 'Rented',
      unavailable: 'Unavailable',
      blocked: 'Blocked',
    },

    itemCondition: {
      new: 'New',
      like_new: 'Like new',
      good: 'Good',
      used: 'Used',
      heavily_used: 'Heavily used',
    },

    paymentStatus: {
      pending: 'Pending',
      paid: 'Paid',
      failed: 'Failed',
      expired: 'Expired',
      cancelled: 'Cancelled',
      refund_requested: 'Refund requested',
      refunded: 'Refunded',
    },

    rentalStatus: {
      created: 'Created',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      shipped: 'Shipped',
      in_use: 'In use',
      return_requested: 'Return requested',
      return_shipped: 'Return shipped',
      returned: 'Returned',
      cancelled: 'Cancelled',
      expired: 'Expired',
      late: 'Late',
    },

    rentalPeriod: {
      hourly: 'Hourly',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
    },

    userStatus: {
      active: 'Active',
      inactive: 'Inactive',
      banned: 'Banned',
    },
  },

  category: {
    audiovisual: 'Audiovisual',
    construction: 'Construction',
    it: 'IT',
    events: 'Events',
  },

  subcategory: {
    tripod: 'Tripod',
    camera: 'Camera',
    soundsystem: 'Sound system',
    laptop: 'Laptop',
    drone: 'Drone',
    lens: 'Lens',
    microphone: 'Microphone',
    lighting: 'Lighting',
    projector: 'Projector',
    stage: 'Stage',
    tent: 'Tent',
    chair: 'Chair',
    monitor: 'Monitor',
    server: 'Server',
    tablet: 'Tablet',
    networking: 'Networking',
    drill: 'Drill',
    cement_mixer: 'Cement mixer',
    generator: 'Generator',
    ladder: 'Ladder',
    pressure_washer: 'Pressure washer',
  },

  auth: {
    login: {
      title: 'Sign in',
      email: 'Email',
      password: 'Password',
      submit: 'Login',
    },
  },

  navbar: {
    search: 'Search...',
  },

  home: {
    audiovisual: {
      title: 'Capture every moment',
      description: 'Professional cameras, lighting and audio equipment.',
      viewAll: 'View all',
    },

    construction: {
      title: 'Build with the right tools',
      description: 'Construction equipment for projects of any size.',
      viewAll: 'View all',
    },

    events: {
      title: 'Create unforgettable events',
      description: 'Everything you need to organize and power your next event.',
      viewAll: 'View all',
    },

    empty: 'No items available',

    howItWorks: {
      title: 'How it works',
      description:
        'Find the equipment you need, choose your dates, and start your rental.',

      steps: {
        browse: {
          title: 'Browse',
          description: 'Explore equipment available for rent.',
        },

        book: {
          title: 'Book',
          description: 'Choose your rental period.',
        },

        confirm: {
          title: 'Confirm',
          description: 'Wait for the owner approval.',
        },

        rent: {
          title: 'Rent',
          description: 'Pick up the equipment and enjoy.',
        },
      },
    },
  },

  footer: {
    description: 'Your marketplace for equipment rentals.',

    company: {
      title: 'Company',
      about: 'About us',
      contact: 'Contact',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
    },

    social: {
      title: 'Follow us',
    },
  },

  catalog: {
    category: 'Category',
    subcategory: 'Subcategory',
    condition: 'Condition',
    sortBy: 'Sort by',
    clear: 'Clear',

    sort: {
      newest: 'Newest',
      price_asc: 'Price: low to high',
      price_desc: 'Price: high to low',
    },
  },

  item: {
    day: 'day',
    view: 'View',
  },
} as const;
