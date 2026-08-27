export const ptBR = {
  enums: {
    itemStatus: {
      analysis: 'Em análise',
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
      email: 'E-mail',
      password: 'Senha',
      submit: 'Entrar',
    },
  },

  navbar: {
    search: 'Pesquisar...',
  },

  home: {
    audiovisual: {
      title: 'Capture cada momento',
      description: 'Câmeras profissionais, iluminação e equipamentos de áudio.',
      viewAll: 'Ver tudo',
    },

    construction: {
      title: 'Construa com as ferramentas certas',
      description:
        'Equipamentos para construção de projetos de qualquer tamanho.',
      viewAll: 'Ver tudo',
    },

    events: {
      title: 'Crie eventos inesquecíveis',
      description:
        'Tudo o que você precisa para organizar e realizar seu próximo evento.',
      viewAll: 'Ver tudo',
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
    view: 'Ver',
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
} as const;
