import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Info } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  onAddToCart: (service: any) => void;
  onViewDetails: (service: any) => void;
}

export function ServiceCard({ 
  id, 
  title, 
  description, 
  price, 
  image, 
  features, 
  onAddToCart, 
  onViewDetails 
}: ServiceCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const service = { id, title, description, price, image, features };
    onAddToCart(service);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleViewDetails = () => {
    const service = { id, title, description, price, image, features };
    onViewDetails(service);
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`} 
          />
        </button>
        <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
          {price}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="font-poppins text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="pet" 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAdded ? 'Adicionado!' : 'Agendar'}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleViewDetails}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}