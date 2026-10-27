import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    description: string;
    image: string;
  } | null;
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-3xl max-h-[88svh] rounded-2xl p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-primary pr-6 text-left">{product.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70svh] pr-2 sm:pr-4">
          <div className="space-y-6">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-56 sm:h-80 object-cover rounded-2xl"
            />
            <div className="text-foreground whitespace-pre-line leading-relaxed">
              {product.description}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
