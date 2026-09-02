export const enUS = {
  common: {
    detail: 'Details',
    view: 'View',
    viewAll: 'View all',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    create: 'Create',
    signIn: 'Sign in',

    messages: {
      success: 'Success',

      validationError: {
        title: 'Validation failed',
        message: 'Please review the highlighted fields and try again.',
      },
    },
  },

  enums: {
    itemStatus: {
      analisys: 'Analysis',
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
      submit: 'Login',
      registerPrompt: "Don't have an account? Sign up",

      fields: {
        email: 'Email',
        password: 'Password',
      },
    },

    register: {
      title: 'Sign up',
      loginPrompt: 'Already have an account? Sign in',

      messages: {
        success: {
          title: 'Registration successful',
          message: 'You were registered successfully.',
        },
        error: {
          title: 'Registration error',
          message:
            'An error occurred while trying to register. Please try again later.',
        },
      },

      form: {
        name: 'Name',
        username: 'Username',
        email: 'Email',
        birthDate: 'Birth date',
        password: 'Password',
        repeatedPassword: 'Repeat password',
        submit: 'Sign up',

        validation: {
          name: {
            required: 'Name is required.',
            size: 'Name must be between 5 and 100 characters.',
          },
          username: {
            required: 'Username is required.',
          },
          email: {
            required: 'Email is required.',
            invalid_email: 'Enter a valid email address.',
          },
          birthDate: {
            required: 'Birth date is required.',
            past: 'Birth date must be before today.',
          },
          password: {
            required: 'Password is required.',
            size: 'Password must be between 8 and 100 characters.',
            password_pattern:
              'Password must contain at least one letter and one number.',
          },
          repeatedPassword: {
            required: 'Password confirmation is required.',
            password_mismatch: 'Passwords do not match.',
          },
        },
      },
    },
  },

  navbar: {
    search: 'Search...',

    dashboard: 'Dashboard',
    logout: 'Logout',
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

    form: {
      tabs: {
        details: 'Item Details',
        images: 'Images',
        address: 'Pickup Address',
      },

      fields: {
        title: 'Title',
        brand: 'Brand',
        model: 'Model',
        condition: 'Condition',
        category: 'Category',
        subcategory: 'Subcategory',
        basePrice: 'Base Price',
        description: 'Description',
      },

      prices: {
        hourly: 'Hourly',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
      },

      images: {
        title: 'Images',
        description: 'Upload up to 5 images. Drag to change the display order.',

        actions: {
          addImages: 'Add Images',
          addImage: 'Add Image',
          moveLeft: 'Move left',
          moveRight: 'Move right',
          remove: 'Remove image',
        },

        main: 'Main',
        preview: 'Preview',
        hint: 'The first image will be used as the main thumbnail.',
      },

      validation: {
        name: {
          blank: 'Title is required.',
          size: 'Title must be at least 3 characters long.',
          max_size: 'Title must be at most 100 characters long.',
        },
        model: {
          blank: 'Model is required.',
          max_size: 'Model must be at most 50 characters long.',
        },
        brand: {
          blank: 'Brand is required.',
          max_size: 'Brand must be at most 50 characters long.',
        },
        description: {
          max_size: 'Description must be at most 1000 characters long.',
        },
        basePrice: {
          required: 'Base price is required.',
          price_invalid: 'Price must be a valid value.',
        },
        itemCondition: {
          required: 'Item condition is required.',
        },
        subCategoryId: {
          blank: 'Subcategory is required.',
        },
        addressId: {
          required: 'Address is required.',
          blank: 'Address is required.',
        },

        images: {
          max_images: 'You can upload a maximum of 5 images.',
          empty: 'This image file is empty.',
          unsupported_media_type:
            'Unsupported image format. Use JPEG, PNG, or WebP.',
          duplicate_order: 'Images cannot have the same display order.',
        },
      },
    },

    messages: {
      create: {
        loading: 'Creating item...',
        uploadingImages: 'Uploading images...',
        validationFailed: {
          title: 'Validation failed',
          message: 'Please review the highlighted fields and try again.',
        },
        images: {
          title: 'Images',
          message:
            'The item was created, but the images could not be uploaded.',
        },
        success: {
          title: 'Success',
          message: 'Item created successfully.',
        },
      },
    },
  },

  rental: {
    header: {
      eyebrow: 'Rental',
      title: 'Rental',
    },

    sections: {
      item: 'Item',
      rental: 'Rental',
      location: 'Pickup Address',
      actions: 'Actions',
    },

    fields: {
      period: 'Period',
      finalPrice: 'Final price',
      startDate: 'Start date',
      endDate: 'End date',
      renter: 'Renter',
      owner: 'Owner',
      notDefined: 'Not defined',
    },

    timeline: {
      rental: 'Rental',
      preparation: 'Preparation',
      in_use: 'In use',
      return: 'Return',
    },

    actions: {
      cancel_rental: {
        button: 'Cancel rental',

        confirmation: {
          confirmed: {
            owner: {
              header: 'Confirm rental cancellation',
              message:
                'Cancelling this confirmed rental will initiate a refund to the renter. The refund may take up to 48 hours to be processed. Do you want to continue?',
            },

            renter: {
              header: 'Confirm rental cancellation',
              message:
                'Cancelling this confirmed rental will initiate a refund. The refund may take up to 48 hours to be processed. Do you want to continue?',
            },

            accept: 'Cancel rental',
            reject: 'Keep rental',
          },

          pending: {
            owner: {
              header: 'Cancel rental',
              message:
                'Are you sure you want to cancel this rental? The renter will no longer be able to proceed with the rental.',
            },

            renter: {
              header: 'Cancel rental',
              message: 'Are you sure you want to cancel this rental?',
            },

            accept: 'Cancel',
            reject: 'Keep rental',
          },
        },

        messages: {
          success: {
            title: 'Rental cancelled',

            owner: {
              cancelled: 'The rental was cancelled successfully.',
              refunded:
                'The rental was cancelled. A refund will be processed for the renter within 48 hours.',
            },

            renter: {
              cancelled: 'Your rental was cancelled successfully.',
              refunded:
                'The rental was cancelled. Your refund will be processed within 48 hours.',
            },
          },

          error: {
            title: 'Cancellation failed',
            default: 'The rental could not be cancelled.',
          },
        },
      },

      confirm_rental: {
        payment: {
          owner: {
            preparing: {
              title: 'Preparing rental',
              message: "We're preparing the rental confirmation.",
            },
            pending: {
              title: 'Waiting for payment',
              message:
                'The renter needs to complete the payment to confirm this rental.',
            },
            expired:
              'The payment checkout has expired and the rental has been cancelled.',
            error: "We couldn't prepare the rental payment.",
          },

          renter: {
            preparing: {
              title: 'Preparing payment',
              message: "We're preparing your payment checkout. Please wait.",
            },
            pending: {
              continue: 'Continue to payment',
              expiresIn: 'Checkout expires in',
            },
            expired:
              'This payment checkout has expired and the rental has been cancelled.',
            error: 'Payment could not be prepared.',
            tryAgain: 'Try again',
          },
        },

        simulation: {
          title: 'Simulated payment',
          message: 'No real charges will be made.',
          testCards: 'Test cards',
          notice:
            'This is a simulated payment environment. Never use real card information.',
          visa: '4242 4242 4242 4242 — Visa',
          mastercard: '5555 5555 5555 4444 — Mastercard',
          expiration: 'Any future expiration date and CVC can be used.',
        },

        paymentInfo: 'Payment information',
      },

      prepare_item: {
        button: 'Start preparing',

        status: {
          title: 'Preparing your rental',
          message:
            'The owner needs to prepare the item before it can be collected.',
        },

        messages: {
          success: {
            title: 'Preparation started',
            message: 'The rental item is now being prepared.',
          },

          error: {
            title: 'Unable to start preparation',
            default: 'The item could not be prepared.',
          },
        },
      },

      ship_item: {
        button: 'Mark as shipped',

        status: {
          message: 'The owner is preparing your item for shipment.',
        },

        messages: {
          success: {
            title: 'Item shipped',
            message: 'The item has been marked as shipped successfully.',
          },

          error: {
            title: 'Shipping failed',
            default: 'The item could not be marked as shipped.',
            invalidRentalStatus:
              'The item cannot be shipped in its current rental status.',
          },
        },
      },

      mark_in_use: {
        delivery: {
          title: 'Estimated delivery',
          message: 'Your item is expected to arrive around',
        },
        button: 'Simulate delivery',
        debugNotice: 'Debug only — simulates the delivery process.',
        messages: {
          error: {
            default: 'The rental could not be marked as in use.',
            invalidRentalStatus:
              'The rental cannot be marked as in use in its current status.',
          },
        },
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
