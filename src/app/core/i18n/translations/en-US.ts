export const enUS = {
  common: {
    detail: 'Details',
    view: 'View',
    viewAll: 'View all',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',

    messages: {
      success: 'Success',
    },
  },

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
    },

    construction: {
      title: 'Build with the right tools',
      description: 'Construction equipment for projects of any size.',
    },

    events: {
      title: 'Create unforgettable events',
      description: 'Everything you need to organize and power your next event.',
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

    loading: 'Loading...',
    rentNow: 'Rent now',
    rentalPeriod: 'Rental period',

    description: {
      title: 'Description',
      empty: 'No description provided.',
    },

    details: {
      title: 'Product details',
      brand: 'Brand',
      model: 'Model',
      condition: 'Condition',
      category: 'Category',
      subcategory: 'Subcategory',
      status: 'Status',

      actions: {
        makeUnavailable: 'Make unavailable',
        makeAvailable: 'Make available',
      },
    },

    availability: {
      updated: 'Availability updated',
      available: 'Item is now available.',
      unavailable: 'Item is now unavailable.',
    },

    rental: {
      confirmTitle: 'Confirm rental',
      confirmMessage:
        'You are about to rent "{{name}}" at R$ {{price}}/{{period}}. Do you want to continue?',
      rent: 'Rent',
      cancel: 'Cancel',
      createdTitle: 'Rental created',
      createdMessage: 'Rental created successfully.',
    },

    address: {
      title: 'Address',
    },

    gallery: {
      imageNotFound: 'Image not found',
    },

    edit: {
      title: 'Edit item',

      dialog: {
        updateSuccess: 'Item updated successfully.',
        validationFailed: 'Validation failed',
        reviewFields: 'Please review the highlighted fields and try again.',
        updateError: 'Failed to update item.',
      },
    },
  },

  feed: {
    title: 'Explore items',

    empty: {
      title: 'No items found',
      description: 'There are no items matching the current filters.',
    },

    filters: {
      title: 'FILTERS',
      refine: 'Refine results',
      clear: 'Clear filters',

      category: 'Category',
      allCategories: 'All categories',

      subcategory: 'Subcategory',
      allSubcategories: 'All subcategories',

      condition: 'Condition',
      anyCondition: 'Any condition',

      sort: 'Sort by',
      recommended: 'Recommended',

      apply: 'Apply filters',

      clearCategory: 'Clear category',
      clearSubcategory: 'Clear subcategory',
      clearCondition: 'Clear condition',
      clearSort: 'Clear sort',
    },
  },

  account: {
    sidebar: {
      title: 'My Account',
      openMenu: 'Open menu',

      dashboard: 'Dashboard',

      listings: {
        title: 'Listings',
        myListings: 'My Listings',
        create: 'Create Listing',
      },

      rentals: {
        title: 'Rentals',
        renting: 'Renting',
        rentingOut: 'Renting Out',
      },

      account: {
        title: 'Account',
        profile: 'Profile',
        addresses: 'Addresses',
        security: 'Security',
        settings: 'Settings',
      },

      favorites: 'Favorites',
    },

    rentals: {
      loading: 'Loading Rentals...',
      empty: {
        title: 'No rentals yet',
        message: 'You are not currently renting any items.',

        rentingOut: {
          title: 'No rentals yet',
          message: 'None of your listings are currently being rented.',
        },
      },
    },

    listings: {
      loading: 'Loading listings...',

      empty: {
        title: 'No listings yet',
        message: 'You do not have any listings yet.',
      },
    },

    addresses: {
      title: 'My Addresses',
      description: 'Manage your saved addresses',
      add: 'Add Address',
      loading: 'Loading addresses...',

      dialog: {
        title: 'Address',
      },

      empty: {
        title: 'No addresses yet',
        message: 'You do not have any saved addresses yet.',
      },

      messages: {
        added: 'Address added successfully',
        updated: 'Address updated successfully',

        confirmDelete: {
          title: 'Delete address',
          message: 'Are you sure you want to delete this address?',
        },

        create: {
          loading: 'Creating listing...',
          uploadingImages: 'Uploading images...',

          validationFailed: {
            title: 'Validation failed',
            message: 'Please review the highlighted fields and try again.',
          },

          images: {
            title: 'Images',
            message:
              'The listing was created, but the images could not be uploaded.',
          },

          success: {
            title: 'Success',
            message: 'Listing created successfully.',
          },
        },
      },

      form: {
        street: 'Street',
        number: 'Number',
        complement: 'Complement',
        district: 'District',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: 'ZIP Code',
      },

      validation: {
        street: {
          blank: 'Street is required.',
          size: 'Street must be between 3 and 120 characters.',
        },
        number: {
          blank: 'Number is required.',
          max_size: 'Number must have at most 20 characters.',
        },
        complement: {
          max_size: 'Complement must have at most 80 characters.',
        },
        district: {
          blank: 'District is required.',
          max_size: 'District must have at most 80 characters.',
        },
        city: {
          blank: 'City is required.',
          max_size: 'City must have at most 80 characters.',
        },
        state: {
          blank: 'State is required.',
          max_size: 'State must have at most 40 characters.',
        },
        country: {
          blank: 'Country is required.',
          max_size: 'Country must have at most 40 characters.',
        },
        zipCode: {
          blank: 'ZIP code is required.',
          max_size: 'ZIP code must have at most 20 characters.',
        },
      },
    },
  },
} as const;
