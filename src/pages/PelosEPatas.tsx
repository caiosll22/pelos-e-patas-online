import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/ServiceCard";
import { CartModal } from "@/components/CartModal";
import { ServiceDetails } from "@/components/ServiceDetails";
import { 
  Heart, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  ShoppingCart,
  Menu,
  X,
  Instagram,
  Facebook,
  MessageCircle
} from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

export default function PelosEPatas() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services: Service[] = [
    {
      id: "banho-tosa",
      title: "Banho e Tosa",
      description: "Serviço completo de higiene e beleza para seu pet",
      price: "R$ 50-80",
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: ["Banho", "Escovação", "Corte de unhas", "Limpeza de ouvidos", "Perfume"]
    },
    {
      id: "creche",
      title: "Creche",
      description: "Diversão e socialização para seu pet durante o dia",
      price: "R$ 60/dia",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: ["Supervisão 24h", "Atividades lúdicas", "Socialização", "Lanche incluído", "Relatório diário"]
    },
    {
      id: "hotelzinho",
      title: "Hotelzinho",
      description: "Hospedagem confortável e segura para seu pet",
      price: "R$ 80/noite",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: ["Suíte individual", "3 refeições", "Passeios", "Monitoramento", "Medicamentos"]
    },
    {
      id: "pet-sitter",
      title: "Pet Sitter",
      description: "Cuidados personalizados na sua própria casa",
      price: "R$ 40/hora",
      image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: ["Cuidados domiciliares", "Passeios", "Alimentação", "Companhia", "Fotos do dia"]
    },
    {
      id: "acessorios",
      title: "Acessórios",
      description: "Produtos de qualidade para o bem-estar do seu pet",
      price: "R$ 15-200",
      image: "https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: ["Brinquedos", "Coleiras", "Camas", "Ração premium", "Produtos de higiene"]
    }
  ];

  const addToCart = (service: Service) => {
    const cartItem: CartItem = {
      id: service.id,
      title: service.title,
      price: service.price,
      image: service.image
    };
    
    setCartItems(prev => {
      if (prev.find(item => item.id === cartItem.id)) {
        return prev;
      }
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const viewDetails = (service: Service) => {
    setSelectedService(service);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary font-poppins">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Pelos e Patas</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors">Serviços</a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors">Sobre</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t p-4">
            <nav className="flex flex-col gap-3">
              <a href="#servicos" className="text-foreground hover:text-primary transition-colors">Serviços</a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-colors">Sobre</a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <img 
              src={heroImage} 
              alt="Pets felizes" 
              className="w-full h-80 object-cover rounded-2xl shadow-warm mb-8"
            />
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Cuidamos do seu <span className="text-primary">melhor amigo</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serviços completos de qualidade para pets com muito amor e carinho. 
              Seu pet merece o melhor cuidado!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="pet" size="lg" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agendar Serviços
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="h-5 w-5 mr-2" />
                (11) 99999-9999
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Pets Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5★</div>
              <div className="text-muted-foreground">Avaliação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Anos Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços para garantir o bem-estar e felicidade do seu pet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onAddToCart={addToCart}
                onViewDetails={viewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Por que escolher a Pelos e Patas?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Amor pelos Pets</h3>
                <p className="text-muted-foreground">Tratamos cada pet com muito carinho e dedicação, como se fossem nossos próprios filhos.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Equipe Qualificada</h3>
                <p className="text-muted-foreground">Profissionais experientes e apaixonados por animais, sempre em busca do melhor para seu pet.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excelência</h3>
                <p className="text-muted-foreground">Comprometidos com a qualidade e satisfação total dos nossos clientes e seus pets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Entre em Contato</h2>
            <p className="text-xl text-muted-foreground">Estamos aqui para cuidar do seu pet!</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background rounded-lg shadow-soft">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Telefone</h3>
              <p className="text-muted-foreground">(11) 99999-9999</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-soft">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Endereço</h3>
              <p className="text-muted-foreground">Rua dos Pets, 123<br />Centro - São Paulo</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-soft">
              <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Horário</h3>
              <p className="text-muted-foreground">Segunda a Sábado<br />8h às 18h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Pelos e Patas</h3>
            </div>
            
            <div className="flex justify-center gap-6 mb-6">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-background/80">
              © 2024 Pelos e Patas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
      
      <ServiceDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        service={selectedService}
        onAddToCart={addToCart}
      />
    </div>
  );
}