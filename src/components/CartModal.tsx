import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartModal({ isOpen, onClose, items, onRemoveItem, onClearCart }: CartModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      setIsScheduling(true);
      setTimeout(() => {
        alert(`Agendamento confirmado para ${selectedDate} às ${selectedTime}!`);
        onClearCart();
        onClose();
        setIsScheduling(false);
      }, 1500);
    } else {
      alert("Por favor, selecione data e horário!");
    }
  };

  const total = items.length * 50; // Simplified total calculation

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-poppins flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Meus Agendamentos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum serviço agendado ainda</p>
              <p className="text-sm">Adicione serviços para agendar</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {item.price}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-semibold font-poppins">Agendar Serviços</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      Data
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      Horário
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Rua dos Pets, 123 - Centro</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total: R$ {total}</span>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClearCart}>
                    Limpar
                  </Button>
                  <Button 
                    variant="pet" 
                    onClick={handleSchedule}
                    disabled={isScheduling}
                  >
                    {isScheduling ? 'Agendando...' : 'Confirmar'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}