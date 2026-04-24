'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, X } from 'lucide-react';

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

  // Add card form state
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
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Saved Cards</h1>
        </div>

        {/* Card list */}
        <div className="flex-1 px-5 flex flex-col gap-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-3 rounded-2xl px-4 py-4"
              style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, backgroundColor: '#1e1b4b' }}
              >
                <CreditCard size={22} color="#f59e0b" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{card.brand} •••• {card.last4}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Expires {card.expiry}</p>
              </div>
              <button
                onClick={() => setDeleteTarget(card.id)}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
              >
                Delete
              </button>
            </div>
          ))}

          {cards.length === 0 && (
            <p className="text-center py-10 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              No saved cards
            </p>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full rounded-2xl py-4 font-bold text-base mt-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#f59e0b', color: '#0a0a1a' }}
          >
            + Add New Card
          </button>

          <p className="text-center text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Real card processing not implemented yet
          </p>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-[360px] rounded-2xl p-6"
            style={{ backgroundColor: '#12122a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-bold text-white mb-2">Remove this card?</p>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              This card will be permanently removed from your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl py-3 font-semibold"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
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

      {/* Add card modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-[430px] rounded-t-3xl p-6 pb-10 flex flex-col gap-5"
            style={{ backgroundColor: '#12122a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-white">Add New Card</p>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} color="rgba(255,255,255,0.5)" />
              </button>
            </div>

            <ModalField label="Card Number">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                style={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
              />
            </ModalField>

            <ModalField label="Cardholder Name">
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Smith"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                style={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
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
                    className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                    style={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
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
                    className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                    style={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
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
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Save this card for future payments</span>
            </label>

            <button
              onClick={handleAddCard}
              className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#f59e0b', color: '#0a0a1a' }}
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
      <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</label>
      {children}
    </div>
  );
}
