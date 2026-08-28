export const ptBR = {
  common: {
    detail: 'Detalhes',
    view: 'Ver',
    viewAll: 'Ver tudo',
    edit: 'Editar',
    delete: 'Deletar',
    cancel: 'Cancelar',
    save: 'Salvar',
    create: 'Criar',
    signIn: 'Entrar',

    messages: {
      success: 'Sucesso',
    },
  },

  enums: {
    itemStatus: {
      analisys: 'Em análise',
      available: 'Disponível',
      rented: 'Alugado',
      unavailable: 'Indisponível',
      blocked: 'Bloqueado',
    },

    itemCondition: {
      new: 'Novo',
      like_new: 'Seminovo',
      good: 'Bom',
      used: 'Usado',
      heavily_used: 'Muito usado',
    },

    paymentStatus: {
      pending: 'Pendente',
      paid: 'Pago',
      failed: 'Falhou',
      expired: 'Expirado',
      cancelled: 'Cancelado',
      refund_requested: 'Reembolso solicitado',
      refunded: 'Reembolsado',
    },

    rentalStatus: {
      created: 'Criado',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      shipped: 'Enviado',
      in_use: 'Em uso',
      return_requested: 'Devolução solicitada',
      return_shipped: 'Devolução enviada',
      returned: 'Devolvido',
      cancelled: 'Cancelado',
      expired: 'Expirado',
      late: 'Atrasado',
    },

    rentalPeriod: {
      hourly: 'Por hora',
      daily: 'Diário',
      weekly: 'Semanal',
      monthly: 'Mensal',
    },

    userStatus: {
      active: 'Ativo',
      inactive: 'Inativo',
      banned: 'Banido',
    },
  },

  category: {
    audiovisual: 'Audiovisual',
    construction: 'Construção',
    it: 'Informática',
    events: 'Eventos',
  },

  subcategory: {
    tripod: 'Tripé',
    camera: 'Câmera',
    soundsystem: 'Sistema de som',
    laptop: 'Notebook',
    drone: 'Drone',
    lens: 'Lente',
    microphone: 'Microfone',
    lighting: 'Iluminação',
    projector: 'Projetor',
    stage: 'Palco',
    tent: 'Tenda',
    chair: 'Cadeira',
    monitor: 'Monitor',
    server: 'Servidor',
    tablet: 'Tablet',
    networking: 'Rede',
    drill: 'Furadeira',
    cement_mixer: 'Betoneira',
    generator: 'Gerador',
    ladder: 'Escada',
    pressure_washer: 'Lava Jato',
  },

  auth: {
    login: {
      title: 'Entrar',
      submit: 'Entrar',
      registerPrompt: 'Não tem uma conta? Cadastre-se',

      fields: {
        email: 'E-mail',
        password: 'Senha',
      },
    },

    register: {
      title: 'Cadastre-se',
      loginPrompt: 'Já tem uma conta? Entre',

      form: {
        name: 'Nome',
        username: 'Nome de usuário',
        email: 'E-mail',
        birthDate: 'Data de nascimento',
        password: 'Senha',
        repeatedPassword: 'Repita a senha',
        submit: 'Cadastrar',
      },
    },
  },

  navbar: {
    search: 'Pesquisar...',
  },

  home: {
    audiovisual: {
      title: 'Capture cada momento',
      description: 'Câmeras profissionais, iluminação e equipamentos de áudio.',
    },

    construction: {
      title: 'Construa com as ferramentas certas',
      description:
        'Equipamentos para construção de projetos de qualquer tamanho.',
    },

    events: {
      title: 'Crie eventos inesquecíveis',
      description:
        'Tudo o que você precisa para organizar e realizar seu próximo evento.',
    },

    empty: 'Nenhum item disponível',

    howItWorks: {
      title: 'Como funciona',
      description:
        'Encontre o equipamento que precisa, escolha as datas e comece seu aluguel.',

      steps: {
        browse: {
          title: 'Navegue',
          description: 'Explore os equipamentos disponíveis para aluguel.',
        },

        book: {
          title: 'Reserve',
          description: 'Escolha o período do seu aluguel.',
        },

        confirm: {
          title: 'Confirme',
          description: 'Aguarde a aprovação do proprietário.',
        },

        rent: {
          title: 'Alugue',
          description: 'Retire o equipamento e aproveite.',
        },
      },
    },
  },

  footer: {
    description: 'Seu marketplace de aluguel de equipamentos.',

    company: {
      title: 'Empresa',
      about: 'Sobre nós',
      contact: 'Contato',
      terms: 'Termos de Serviço',
      privacy: 'Política de Privacidade',
    },

    social: {
      title: 'Siga-nos',
    },
  },

  catalog: {
    category: 'Categoria',
    subcategory: 'Subcategoria',
    condition: 'Condição',
    sortBy: 'Ordenar por',
    clear: 'Limpar',

    sort: {
      newest: 'Mais recentes',
      price_asc: 'Preço: menor para maior',
      price_desc: 'Preço: maior para menor',
    },
  },

  item: {
    day: 'dia',

    loading: 'Carregando...',
    rentNow: 'Alugar agora',
    rentalPeriod: 'Período de aluguel',

    description: {
      title: 'Descrição',
      empty: 'Nenhuma descrição fornecida.',
    },

    details: {
      title: 'Detalhes do produto',
      brand: 'Marca',
      model: 'Modelo',
      condition: 'Condição',
      category: 'Categoria',
      subcategory: 'Subcategoria',
      status: 'Status',

      actions: {
        makeUnavailable: 'Tornar indisponível',
        makeAvailable: 'Tornar disponível',
      },
    },

    availability: {
      updated: 'Disponibilidade atualizada',
      available: 'O item está disponível.',
      unavailable: 'O item está indisponível.',
    },

    rental: {
      confirmTitle: 'Confirmar aluguel',
      confirmMessage:
        'Você está prestes a alugar "{{name}}" por R$ {{price}}/{{period}}. Deseja continuar?',
      rent: 'Alugar',
      cancel: 'Cancelar',
      createdTitle: 'Aluguel criado',
      createdMessage: 'Aluguel criado com sucesso.',
    },

    address: {
      title: 'Endereço',
    },

    gallery: {
      imageNotFound: 'Imagem não encontrada',
    },

    edit: {
      title: 'Editar item',
      label: 'Editar',

      dialog: {
        updateSuccess: 'Item atualizado com sucesso.',
        validationFailed: 'Falha na validação',
        reviewFields: 'Revise os campos destacados e tente novamente.',
        updateError: 'Falha ao atualizar o item.',
      },
    },

    form: {
      tabs: {
        details: 'Detalhes do anúncio',
        images: 'Imagens',
        address: 'Endereço de retirada',
      },

      fields: {
        title: 'Título',
        brand: 'Marca',
        model: 'Modelo',
        condition: 'Condição',
        category: 'Categoria',
        subcategory: 'Subcategoria',
        basePrice: 'Preço base',
        description: 'Descrição',
      },

      prices: {
        hourly: 'Por hora',
        daily: 'Diário',
        weekly: 'Semanal',
        monthly: 'Mensal',
      },

      images: {
        title: 'Imagens',
        description:
          'Envie até 5 imagens. Arraste para alterar a ordem de exibição.',

        actions: {
          addImages: 'Adicionar imagens',
          addImage: 'Adicionar imagem',
          moveLeft: 'Mover para a esquerda',
          moveRight: 'Mover para a direita',
          remove: 'Remover imagem',
        },

        main: 'Principal',
        preview: 'Pré-visualização',
        hint: 'A primeira imagem será usada como miniatura principal.',
      },

      validation: {
        name: {
          blank: 'O título é obrigatório.',
          size: 'O título deve ter pelo menos 3 caracteres.',
          max_size: 'O título deve ter no máximo 100 caracteres.',
        },
        model: {
          blank: 'O modelo é obrigatório.',
          max_size: 'O modelo deve ter no máximo 50 caracteres.',
        },
        brand: {
          blank: 'A marca é obrigatória.',
          max_size: 'A marca deve ter no máximo 50 caracteres.',
        },
        description: {
          max_size: 'A descrição deve ter no máximo 1000 caracteres.',
        },
        basePrice: {
          required: 'O preço base é obrigatório.',
          price_invalid: 'O preço deve ser um valor válido.',
        },
        itemCondition: {
          required: 'A condição do item é obrigatória.',
        },
        subCategoryId: {
          blank: 'A subcategoria é obrigatória.',
        },
        addressId: {
          required: 'O endereço é obrigatório.',
          blank: 'O endereço é obrigatório.',
        },

        images: {
          max_images: 'Você pode enviar no máximo 5 imagens.',
          empty: 'Este arquivo de imagem está vazio.',
          unsupported_media_type:
            'Formato de imagem não suportado. Use JPEG, PNG ou WebP.',
          duplicate_order:
            'As imagens não podem ter a mesma ordem de exibição.',
        },
      },
    },

    messages: {
      create: {
        loading: 'Criando item...',
        uploadingImages: 'Enviando imagens...',
        validationFailed: {
          title: 'Falha na validação',
          message: 'Revise os campos destacados e tente novamente.',
        },
        images: {
          title: 'Imagens',
          message: 'O item foi criado, mas não foi possível enviar as imagens.',
        },
        success: {
          title: 'Sucesso',
          message: 'Item criado com sucesso.',
        },
      },
    },
  },

  feed: {
    title: 'Explorar itens',

    empty: {
      title: 'Nenhum item encontrado',
      description: 'Não há itens correspondentes aos filtros atuais.',
    },

    filters: {
      title: 'FILTROS',
      refine: 'Refinar resultados',
      clear: 'Limpar filtros',

      category: 'Categoria',
      allCategories: 'Todas as categorias',

      subcategory: 'Subcategoria',
      allSubcategories: 'Todas as subcategorias',

      condition: 'Condição',
      anyCondition: 'Qualquer condição',

      sort: 'Ordenar por',
      recommended: 'Recomendado',

      apply: 'Aplicar filtros',

      clearCategory: 'Limpar categoria',
      clearSubcategory: 'Limpar subcategoria',
      clearCondition: 'Limpar condição',
      clearSort: 'Limpar ordenação',
    },
  },

  account: {
    sidebar: {
      title: 'Minha conta',
      openMenu: 'Abrir menu',

      dashboard: 'Painel',

      listings: {
        title: 'Anúncios',
        myListings: 'Meus anúncios',
        create: 'Criar anúncio',
      },

      rentals: {
        title: 'Aluguéis',
        renting: 'Alugando',
        rentingOut: 'Alugando para outros',
      },

      account: {
        title: 'Conta',
        profile: 'Perfil',
        addresses: 'Endereços',
        security: 'Segurança',
        settings: 'Configurações',
      },

      favorites: 'Favoritos',
    },

    rentals: {
      loading: 'Carregando Aluguéis...',
      empty: {
        title: 'Nenhum aluguel encontrado',
        message: 'Você não está alugando nenhum item no momento.',

        rentingOut: {
          title: 'Nenhum aluguel encontrado',
          message: 'Nenhum dos seus anúncios está alugado no momento.',
        },
      },
    },

    listings: {
      loading: 'Carregando anúncios...',

      empty: {
        title: 'Nenhum anúncio encontrado',
        message: 'Você ainda não possui nenhum anúncio.',
      },
    },

    addresses: {
      title: 'Meus endereços',
      description: 'Gerencie seus endereços salvos',
      add: 'Adicionar endereço',
      loading: 'Carregando endereços...',

      dialog: {
        title: 'Endereço',
      },

      empty: {
        title: 'Nenhum endereço cadastrado',
        message: 'Você ainda não possui nenhum endereço salvo.',
      },

      messages: {
        added: 'Endereço adicionado com sucesso',
        updated: 'Endereço atualizado com sucesso',

        confirmDelete: {
          title: 'Excluir endereço',
          message: 'Tem certeza de que deseja excluir este endereço?',
        },

        create: {
          loading: 'Criando anúncio...',
          uploadingImages: 'Enviando imagens...',

          validationFailed: {
            title: 'Falha na validação',
            message: 'Revise os campos destacados e tente novamente.',
          },

          images: {
            title: 'Imagens',
            message:
              'O anúncio foi criado, mas não foi possível enviar as imagens.',
          },

          success: {
            title: 'Sucesso',
            message: 'Anúncio criado com sucesso.',
          },
        },
      },

      form: {
        street: 'Rua',
        number: 'Número',
        complement: 'Complemento',
        district: 'Bairro',
        city: 'Cidade',
        state: 'Estado',
        country: 'País',
        zipCode: 'CEP',
      },

      validation: {
        street: {
          blank: 'A rua é obrigatória.',
          size: 'A rua deve ter entre 3 e 120 caracteres.',
        },
        number: {
          blank: 'O número é obrigatório.',
          max_size: 'O número deve ter no máximo 20 caracteres.',
        },
        complement: {
          max_size: 'O complemento deve ter no máximo 80 caracteres.',
        },
        district: {
          blank: 'O bairro é obrigatório.',
          max_size: 'O bairro deve ter no máximo 80 caracteres.',
        },
        city: {
          blank: 'A cidade é obrigatória.',
          max_size: 'A cidade deve ter no máximo 80 caracteres.',
        },
        state: {
          blank: 'O estado é obrigatório.',
          max_size: 'O estado deve ter no máximo 40 caracteres.',
        },
        country: {
          blank: 'O país é obrigatório.',
          max_size: 'O país deve ter no máximo 40 caracteres.',
        },
        zipCode: {
          blank: 'O CEP é obrigatório.',
          max_size: 'O CEP deve ter no máximo 20 caracteres.',
        },
      },
    },
  },
} as const;
