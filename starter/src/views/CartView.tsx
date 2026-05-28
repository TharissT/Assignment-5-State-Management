import { Button } from '@/components/controls/buttons/Button';
import { SectionHeader } from '@/components/site/Loading';
import { useUserContext } from '@/hooks';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

export const CartView = () => {
  const { cart, removeFromCart, clearCart, cartTotal, addFavorite } = useUserContext();

  const TAX_RATE = 0.13;
  const taxes = cartTotal * TAX_RATE;
  const total = cartTotal + taxes;

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <FiShoppingCart size={48} className="mx-auto mb-4 text-zinc-700" />
        <p className="text-xl font-bold text-zinc-500">Your cart is empty.</p>
        <p className="mt-2 text-sm text-zinc-600">Add movies or TV seasons to your cart to purchase them.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title="Cart">
        <Button variant="danger" onClick={clearCart}>
          Empty Cart
        </Button>
      </SectionHeader>

      <div className="rounded border border-zinc-800 bg-zinc-900/40">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-zinc-800 px-6 py-3 text-xs font-bold tracking-wider text-zinc-500 uppercase">
          <span>Items</span>
          <span className="text-center">Type</span>
          <span className="text-center">Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Items */}
        {cart.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-zinc-800/60 px-6 py-4 last:border-0"
          >
            <div className="flex items-center gap-3">
              <img src={item.imageUrl} alt={item.title} className="h-16 w-12 rounded object-cover" />
              <span className="text-sm font-semibold text-white">{item.title}</span>
            </div>
            <span className="text-center text-xs text-zinc-400 capitalize">{item.type === 'tv-season' ? 'TV Season' : 'Movie'}</span>
            <span className="text-center text-sm font-bold text-white">${item.price.toFixed(2)}</span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                title="Move to Favorites"
                onClick={() => {
                  addFavorite({
                    id: item.id,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    media: item.type === 'tv-season' ? 'tv' : 'movie',
                  });
                }}
                className="cursor-pointer rounded p-1.5 text-zinc-400 transition-colors hover:text-red-400"
              >
                <FiHeart size={16} />
              </button>
              <button
                type="button"
                title="Remove from Cart"
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer rounded p-1.5 text-zinc-400 transition-colors hover:text-red-500"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="space-y-2 border-t border-zinc-700 px-6 py-4">
          <div className="flex justify-between text-sm text-zinc-400">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-400">
            <span>Taxes (13%)</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-red-400">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
