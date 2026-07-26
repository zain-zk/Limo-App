const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  pending_quote: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  confirmed: 'bg-green-500/15 text-green-300 border-green-500/30',
  completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  cancelled: 'bg-red-500/15 text-red-300 border-red-500/30',
  unpaid: 'bg-gray-500/15 text-gray-300 border-gray-500/30',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  paid: 'bg-green-500/15 text-green-300 border-green-500/30',
  pay_driver: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  refunded: 'bg-red-500/15 text-red-300 border-red-500/30',
};

export function StatusBadge({ label }: { label: string }) {
  const key = label.toLowerCase().replace(/\s+/g, '_');
  const style = STATUS_STYLES[key] ?? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${style}`}>
      {label.replace(/_/g, ' ')}
    </span>
  );
}
