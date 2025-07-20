import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Users, Shield, ShoppingCart } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

interface ServiceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onAddToCart: (service: Service) => void;
}

export function ServiceDetails({ isOpen, onClose, service, onAddToCart }: ServiceDetailsProps) {
  if (!service) return null;

  const handleAddToCart = () => {
    onAddToCart(service);
    onClose();
  };

  const getServiceDetails = (serviceId: string) => {
    const details = {
      'banho-tosa': {
        duration: '2-3 horas',
        capacity: '1 pet por vez',
        includes: ['Banho completo', 'Escovação', 'Corte de unhas', 'Limpeza de ouvidos', 'Perfume']
      },
      'creche': {
        duration: '8 horas',
        capacity: '15 pets máximo',
        includes: ['Supervisão profissional', 'Atividades lúdicas', 'Socialização', 'Lanche incluído', 'Relatório diário']
      },
      'hotelzinho': {
        duration: 'Pernoite',
        capacity: '20 pets máximo',
        includes: ['Suíte individual', '3 refeições', 'Passeios', 'Monitoramento 24h', 'Medicamentos']
      },
      'pet-sitter': {
        duration: '4-8 horas',
        capacity: 'Seu pet em casa',
        includes: ['Cuidados na sua casa', 'Passeios', 'Alimentação', 'Companhia', 'Fotos do dia']
      },
      'acessorios': {
        duration: 'Imediato',
        capacity: 'Loja física/online',
        includes: ['Produtos premium', 'Garantia de qualidade', 'Entrega grátis', 'Troca fácil', 'Suporte']
      }
    };
    
    return details[serviceId as keyof typeof details] || details['banho-tosa'];
  };

  const serviceDetails = getServiceDetails(service.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins text-xl">{service.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-lg px-3 py-1">
              {service.price}
            </Badge>
          </div>
          
          <div>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Duração</p>
                <p className="text-xs text-muted-foreground">{serviceDetails.duration}</p>
              </div>
              
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Capacidade</p>
                <p className="text-xs text-muted-foreground">{serviceDetails.capacity}</p>
              </div>
              
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Garantia</p>
                <p className="text-xs text-muted-foreground">100% seguro</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 font-poppins">O que está incluído:</h3>
            <div className="grid grid-cols-1 gap-2">
              {serviceDetails.includes.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 font-poppins">Características:</h3>
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar
            </Button>
            <Button variant="pet" onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agendar Serviço
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}