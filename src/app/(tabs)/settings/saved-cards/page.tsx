'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CreditCard, X } from 'lucide-react';

interface Card {
  id: string;
  brand: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
}

const INITIAL_CARDS: Card[] = [
  { id: '1', brand: 'Visa', last4: '4242', expiry: '08/27' },
  { id: '2', brand: 'Mastercard', last4: '5555', expiry: '12/26' },
];

export default function SavedCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  function formatCardNumber(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  function formatExpiry(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  function handleDelete(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setDeleteTarget(null);
  }

  function handleAddCard() {
    if (!cardNumber || !cardName || !expiry) return;
    const last4 = cardNumber.replace(/\s/g, '').slice(-4);
    const brand = cardNumber.startsWith('4') ? 'Visa' : 'Mastercard';
    const newCard: Card = { id: Date.now().toString(), brand, last4, expiry };
    setCards((prev) => [...prev, newCard]);
    setCardNumber('');
    setCardName('');
    setExpiry('');
    setCvv('');
    setShowAddModal(false);
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%' }}>

      {/* Header */}
      <div
        className="sticky top-0 z-10 relative flex items-center justify-center px-4"
        style={{ height: 56, backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
      >
        <button
          onClick={() => router.back()}
          className="absolute left-4 flex items-center gap-1"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5' }}
        >
          <ChevronLeft size={22} color="#4f46e5" />
          <span className="text-[15px] font-semibold">Back</span>
        </button>
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Saved Cards</span>
      </div>

      {/* Card list */}
      <div className="px-5 pt-5 pb-8 flex flex-col gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center gap-3 rounded-2xl px-4 py-4 bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 44, height: 44, backgroundColor: '#ede9fe' }}
            >
              <CreditCard size={22} color="#4f46e5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{card.brand} •••• {card.last4}</p>
              <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Expires {card.expiry}</p>
            </div>
            <button
              onClick={() => setDeleteTarget(card.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
            >
              Delete
            </button>
          </div>
        ))}

        {cards.length === 0 && (
          <p className="text-center py-10 text-sm" style={{ color: '#94a3b8' }}>
            No saved cards
          </p>
        )}

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full rounded-2xl py-4 font-bold text-base mt-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
        >
          + Add New Card
        </button>

        <p className="text-center text-xs mt-1" style={{ color: '#94a3b8' }}>
          Real card processing not implemented yet
        </p>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-[360px] rounded-2xl p-6 bg-white"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>Remove this card?</p>
            <p className="text-sm mb-6" style={{ color: '#64748b' }}>
              This card will be permanently removed from your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl py-3 font-semibold"
                style={{ border: '1px solid #e2e8f0', color: '#64748b' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="flex-1 rounded-xl py-3 font-semibold text-white"
                style={{ backgroundColor: '#ef4444' }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add card bottom sheet */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-[430px] rounded-t-3xl p-6 pb-10 bg-white flex flex-col gap-5"
            style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold" style={{ color: '#0f172a' }}>Add New Card</p>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} color="#94a3b8" />
              </button>
            </div>

            <ModalField label="Card Number">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
              />
            </ModalField>

            <ModalField label="Cardholder Name">
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Smith"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
              />
            </ModalField>

            <div className="flex gap-3">
              <div className="flex-1">
                <ModalField label="Expiry (MM/YY)">
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="08/27"
                    inputMode="numeric"
                    className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
                  />
                </ModalField>
              </div>
              <div className="flex-1">
                <ModalField label="CVV">
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="•••"
                    inputMode="numeric"
                    className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
                  />
                </ModalField>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="w-5 h-5 rounded accent-amber-400"
              />
              <span className="text-sm" style={{ color: '#475569' }}>Save this card for future payments</span>
            </label>

            <button
              onClick={handleAddCard}
              className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
            >
              Add Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: '#475569' }}>{label}</label>
      {children}
    </div>
  );
}
