document.addEventListener('DOMContentLoaded', function () {
                // Dados dos serviços (poderia vir de uma API)
                const services = {
                    "Banho Completo": {
                        description: "Nosso banho completo inclui:\n\n- Shampoo e condicionador premium\n- Secagem profissional\n- Escovação de pelos\n- Limpeza de ouvidos\n- Corte de unhas\n\nDuração aproximada: 45 minutos",
                        category: "banho-tosa"
                    },
                    "Tosa Higiênica": {
                        description: "Tosa focada em higiene e conforto:\n\n- Corte de pelos nas áreas íntimas\n- Limpeza de patas\n- Corte de unhas\n- Limpeza de ouvidos\n- Banho rápido incluído\n\nDuração: 60 minutos",
                        category: "banho-tosa"
                    },
                    "Banho e Tosa Felina": {
                        description: "Serviço especializado para gatos:\n\n- Shampoo específico para felinos\n- Secagem tranquila\n- Escovação cuidadosa\n- Corte de unhas\n- Limpeza de ouvidos\n\nAmbiente calmo e adaptado",
                        category: "banho-tosa"
                    },
                    "Creche Meio Período": {
                        description: "Cuido diário com:\n\n- Até 5 horas de estadia\n- Brinquedos e atividades\n- Socialização supervisionada\n- Alimentação conforme necessidade\n- Relatório diário do seu pet",
                        category: "creche"
                    },
                    "Creche Período Integral": {
                        description: "Experiência completa para seu pet:\n\n- Até 10 horas de cuidados\n- Atividades recreativas\n- Exercícios físicos\n- Socialização com outros pets\n- Alimentação e hidratação",
                        category: "creche"
                    },
                    "Pacote Semanal Creche": {
                        description: "Economize com nosso pacote:\n\n- 5 dias de creche\n- Atividades diárias variadas\n- Brinquedos e exercícios\n- Banho ao final da semana\n- Desconto de 12%",
                        category: "creche"
                    },
                    "Hotel Diária Simples": {
                        description: "Acomodação confortável:\n\n- Espaço individual\n- Alimentação básica\n- Passeios diários\n- Monitoramento 24h\n- Cama e cobertores",
                        category: "hotelzinho"
                    },
                    "Hotel Diária Premium": {
                        description: "Experiência luxuosa:\n\n- Suíte privativa\n- Alimentação premium\n- Passeios personalizados\n- Camera de monitoramento\n- Brinquedos e cuidados extras",
                        category: "hotelzinho"
                    },
                    "Pacote Férias Hotel": {
                        description: "Pacote completo de 7 dias:\n\n- Acomodação premium\n- Alimentação especial\n- Banho de beleza ao final\n- Atividades diárias\n- Relatório fotográfico",
                        category: "hotelzinho"
                    },
                    "Pet Sitter Visita Diária": {
                        description: "Visita personalizada:\n\n- 1 hora de cuidado\n- Alimentação e hidratação\n- Limpeza do ambiente\n- Brincadeiras e carinho\n- Relatório detalhado",
                        category: "pet-sitter"
                    },
                    "Pet Sitter Hospedagem em Casa": {
                        description: "Cuidado na casa do cuidador:\n\n- Ambiente familiar\n- Cuidados 24h\n- Alimentação premium\n- Passeios diários\n- Atividades recreativas",
                        category: "pet-sitter"
                    },
                    "Pet Sitter Personalizado": {
                        description: "Para necessidades especiais:\n\n- Acompanhamento veterinário\n- Administração de medicamentos\n- Dietas especiais\n- Cuidados com pets idosos\n- Atendimento individualizado",
                        category: "pet-sitter"
                    }
                };

                // Variáveis do carrinho
                let cart = [];
                const cartPanel = document.getElementById('cart-panel');
                const cartIcon = document.getElementById('cart-icon');
                const cartCount = document.getElementById('cart-count');
                const cartItemsContainer = document.getElementById('cart-items');
                const cartTotalElement = document.getElementById('cart-total');
                const checkoutBtn = document.getElementById('checkout-btn');

                // Elementos do modal de serviço
                const serviceHighlight = document.querySelector('.service-highlight');
                const highlightContent = document.querySelector('.highlight-content');
                const serviceTitle = document.getElementById('service-title');
                const serviceDescription = document.getElementById('service-description');
                const btnViewDetails = document.querySelectorAll('.btn-view-details');
                const closeBtns = document.querySelectorAll('.close-btn');
                const btnBookService = document.getElementById('btn-book-service');

                // Elementos do modal de agendamento
                const bookingModal = document.querySelector('.booking-modal');
                const bookingForm = document.querySelector('.booking-form');
                const btnCancel = document.querySelector('.btn-cancel');

                // Mensagem de sucesso
                const successMessage = document.getElementById('success-message');

                // Event Listeners

                // Abrir detalhes do serviço
                btnViewDetails.forEach(btn => {
                    btn.addEventListener('click', function () {
                        const serviceName = this.getAttribute('data-service');
                        const servicePrice = this.getAttribute('data-price');

                        serviceTitle.textContent = serviceName;
                        serviceDescription.innerHTML = `<p>${services[serviceName].description.replace(/\n/g, '<br>')}</p><p class="price">Preço: R$ ${servicePrice},00</p>`;
                        btnBookService.setAttribute('data-service', serviceName);
                        btnBookService.setAttribute('data-price', servicePrice);

                        serviceHighlight.style.display = 'flex';
                    });
                });

                // Fechar modais
                closeBtns.forEach(btn => {
                    btn.addEventListener('click', function () {
                        serviceHighlight.style.display = 'none';
                        bookingModal.style.display = 'none';
                    });
                });

                // Abrir modal de agendamento
                btnBookService.addEventListener('click', function () {
                    serviceHighlight.style.display = 'none';
                    bookingModal.style.display = 'flex';
                });
            });