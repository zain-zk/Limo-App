import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  LogOut, Save, RefreshCw, LayoutDashboard, Settings, Home, Menu,
  Calendar, MessageSquare, Loader2, Info, HelpCircle, Plus, Trash2, Link2, Copy,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useContent } from '../../context/ContentContext';
import {
  login, fetchMe, clearAuthToken, getAuthToken,
  updateSection, fetchBookings, updateBooking, createPaymentLink, fetchContactMessages,
  type Booking,
} from '../../lib/api';
import type { SiteContent, HomeContent, NavItem, AboutContent, FaqContent } from '../../types/content';
import { DEFAULT_ABOUT, DEFAULT_FAQ, DEFAULT_HOME, DEFAULT_NAVIGATION, DEFAULT_SITE } from '../../lib/defaults';

function AdminLogin({ onSuccess }: { onSuccess: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(username, password);
      toast.success(`Welcome, ${data.username}`);
      onSuccess(data.username);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">
      <Card className="w-full max-w-md bg-[#1A1A1A] border-[#D4AF37]/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Admin <span className="text-[#D4AF37]">CMS</span>
          </CardTitle>
          <p className="text-gray-400 text-sm">Sign in to manage site content</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white">Username</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" autoComplete="username" />
            </div>
            <div>
              <Label className="text-white">Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" autoComplete="current-password" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-4">
            Default: admin / admin123 (change in .env)
          </p>
          <Link to="/" className="block text-center text-[#D4AF37] text-sm mt-4 hover:underline">← Back to site</Link>
        </CardContent>
      </Card>
    </div>
  );
}

function SiteSettingsForm({ initial, onSaved }: { initial: SiteContent; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection('site', form);
      toast.success('Site settings saved');
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label className="text-white">Business Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        <div><Label className="text-white">Tagline</Label><Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        <div><Label className="text-white">Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        <div><Label className="text-white">Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        <div><Label className="text-white">WhatsApp Number</Label><Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" placeholder="digits only, e.g. 1234567890" /></div>
      </div>
      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label className="text-white">Street</Label><Input value={form.address.street} onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">City</Label><Input value={form.address.city} onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Province</Label><Input value={form.address.province} onChange={(e) => setForm({ ...form, address: { ...form.address, province: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Postal Code</Label><Input value={form.address.postal} onChange={(e) => setForm({ ...form, address: { ...form.address, postal: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
      </div>
      <Button onClick={save} disabled={saving} className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Save Site Settings
      </Button>
    </div>
  );
}

function HomeContentForm({ initial, onSaved }: { initial: HomeContent; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection('home', form);
      toast.success('Home page content saved');
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Hero Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label className="text-white">Title</Label><Input value={form.hero.title} onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Title Highlight</Label><Input value={form.hero.titleHighlight} onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleHighlight: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div className="md:col-span-2"><Label className="text-white">Subtitle</Label><Textarea value={form.hero.subtitle} onChange={(e) => setForm({ ...form, hero: { ...form.hero, subtitle: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Services ({form.services.length})</h3>
        <div className="space-y-4">
          {form.services.map((svc, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input value={svc.icon || ''} placeholder="Icon (Car, Plane...)" onChange={(e) => { const services = [...form.services]; services[i] = { ...svc, icon: e.target.value }; setForm({ ...form, services }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={svc.title} placeholder="Title" onChange={(e) => { const services = [...form.services]; services[i] = { ...svc, title: e.target.value }; setForm({ ...form, services }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={svc.description} placeholder="Description" onChange={(e) => { const services = [...form.services]; services[i] = { ...svc, description: e.target.value }; setForm({ ...form, services }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Fleet ({form.fleet.length})</h3>
        <div className="space-y-4">
          {form.fleet.map((v, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input value={v.name} placeholder="Vehicle name" onChange={(e) => { const fleet = [...form.fleet]; fleet[i] = { ...v, name: e.target.value }; setForm({ ...form, fleet }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input type="number" value={v.passengers} placeholder="Passengers" onChange={(e) => { const fleet = [...form.fleet]; fleet[i] = { ...v, passengers: Number(e.target.value) }; setForm({ ...form, fleet }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input type="number" value={v.luggage} placeholder="Bags" onChange={(e) => { const fleet = [...form.fleet]; fleet[i] = { ...v, luggage: Number(e.target.value) }; setForm({ ...form, fleet }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={v.features.join(', ')} placeholder="Features (comma separated)" className="md:col-span-3 bg-[#1A1A1A] border-[#D4AF37]/20 text-white" onChange={(e) => { const fleet = [...form.fleet]; fleet[i] = { ...v, features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean) }; setForm({ ...form, fleet }); }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Testimonials</h3>
        <div className="space-y-4">
          {form.testimonials.map((t, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input value={t.name} placeholder="Name" onChange={(e) => { const testimonials = [...form.testimonials]; testimonials[i] = { ...t, name: e.target.value }; setForm({ ...form, testimonials }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={t.role} placeholder="Role" onChange={(e) => { const testimonials = [...form.testimonials]; testimonials[i] = { ...t, role: e.target.value }; setForm({ ...form, testimonials }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Textarea value={t.text} placeholder="Quote" className="md:col-span-2 bg-[#1A1A1A] border-[#D4AF37]/20 text-white" onChange={(e) => { const testimonials = [...form.testimonials]; testimonials[i] = { ...t, text: e.target.value }; setForm({ ...form, testimonials }); }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Bottom CTA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label className="text-white">Title</Label><Input value={form.cta.title} onChange={(e) => setForm({ ...form, cta: { ...form.cta, title: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Highlight</Label><Input value={form.cta.titleHighlight} onChange={(e) => setForm({ ...form, cta: { ...form.cta, titleHighlight: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div className="md:col-span-2"><Label className="text-white">Subtitle</Label><Input value={form.cta.subtitle} onChange={(e) => setForm({ ...form, cta: { ...form.cta, subtitle: e.target.value } })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
      </div>

      <Button onClick={save} disabled={saving} className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Save Home Content
      </Button>
    </div>
  );
}

function NavigationForm({ initial, onSaved }: { initial: NavItem[]; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection('navigation', form);
      toast.success('Navigation saved');
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {form.map((item, i) => (
        <div key={i} className="grid grid-cols-2 gap-3">
          <Input value={item.label} placeholder="Label" onChange={(e) => { const nav = [...form]; nav[i] = { ...item, label: e.target.value }; setForm(nav); }} className="bg-[#0B0B0B] border-[#D4AF37]/20 text-white" />
          <Input value={item.path} placeholder="Path" onChange={(e) => { const nav = [...form]; nav[i] = { ...item, path: e.target.value }; setForm(nav); }} className="bg-[#0B0B0B] border-[#D4AF37]/20 text-white" />
        </div>
      ))}
      <Button onClick={save} disabled={saving} className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Save Navigation
      </Button>
    </div>
  );
}

const STATUS_OPTIONS = ['new', 'pending_quote', 'confirmed', 'completed', 'cancelled'];
const PAYMENT_STATUS_OPTIONS = ['unpaid', 'pending', 'paid', 'refunded', 'pay_driver'];

function BookingCard({ booking, onUpdated }: { booking: Booking; onUpdated: () => void }) {
  const [quoteAmount, setQuoteAmount] = useState(booking.quoteAmount?.toString() ?? '');
  const [quoteNotes, setQuoteNotes] = useState(booking.quoteNotes ?? '');
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes ?? '');
  const [saving, setSaving] = useState(false);
  const [creatingLink, setCreatingLink] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(booking.paymentUrl ?? '');

  const saveQuote = async () => {
    setSaving(true);
    try {
      await updateBooking(booking.id, {
        quoteAmount: quoteAmount === '' ? null : Number(quoteAmount),
        quoteNotes,
        adminNotes,
        status: booking.status === 'new' ? 'pending_quote' : booking.status,
      });
      toast.success('Quote saved');
      onUpdated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePaymentLink = async () => {
    // Persist quote first so Stripe uses the amount shown in the form
    setCreatingLink(true);
    try {
      if (quoteAmount !== '' && Number(quoteAmount) > 0) {
        await updateBooking(booking.id, {
          quoteAmount: Number(quoteAmount),
          quoteNotes,
          adminNotes,
          status: booking.status === 'new' ? 'pending_quote' : booking.status,
        });
      }

      const result = await createPaymentLink(booking.id);
      setPaymentUrl(result.url);
      toast.success('Payment link created');
      onUpdated();
      try {
        await navigator.clipboard.writeText(result.url);
        toast.message('Link copied to clipboard');
      } catch {
        // Clipboard may be blocked; link still shown below
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create payment link');
    } finally {
      setCreatingLink(false);
    }
  };

  const copyLink = async () => {
    if (!paymentUrl) return;
    try {
      await navigator.clipboard.writeText(paymentUrl);
      toast.success('Payment link copied');
    } catch {
      toast.error('Could not copy — select the link manually');
    }
  };

  const canCreateLink =
    booking.paymentStatus !== 'paid' &&
    (Number(quoteAmount) > 0 || Number(booking.quoteAmount) > 0);

  return (
    <Card className="bg-[#0B0B0B] border-[#D4AF37]/10">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap justify-between gap-2">
          <div>
            <p className="text-white font-medium">{booking.fullName} · {booking.phone}</p>
            <p className="text-gray-400 text-sm">{booking.date} at {booking.time} · {booking.serviceType}</p>
            <p className="text-gray-300 text-sm mt-1">{booking.pickupAddress} → {booking.dropoffAddress}</p>
            <p className="text-gray-500 text-xs mt-1">
              {booking.passengers} pax · {booking.luggage} bags · prefers {booking.paymentMethod}
              {booking.flightNumber ? ` · flight ${booking.flightNumber}` : ''}
            </p>
            {booking.specialInstructions && (
              <p className="text-gray-400 text-xs mt-1">Notes: {booking.specialInstructions}</p>
            )}
            {booking.paidAt && (
              <p className="text-green-400 text-xs mt-1">Paid at {new Date(booking.paidAt).toLocaleString()}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <select
              value={booking.status}
              onChange={async (e) => {
                try {
                  await updateBooking(booking.id, { status: e.target.value });
                  toast.success('Status updated');
                  onUpdated();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : 'Update failed');
                }
              }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 text-white rounded px-2 py-1 text-sm"
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={booking.paymentStatus || 'unpaid'}
              onChange={async (e) => {
                try {
                  await updateBooking(booking.id, { paymentStatus: e.target.value });
                  toast.success('Payment status updated');
                  onUpdated();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : 'Update failed');
                }
              }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 text-white rounded px-2 py-1 text-sm"
            >
              {PAYMENT_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-[#D4AF37]/10">
          <div>
            <Label className="text-gray-400 text-xs">Quote amount (CAD)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={quoteAmount}
              onChange={(e) => setQuoteAmount(e.target.value)}
              className="mt-1 bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
              placeholder="e.g. 185"
            />
          </div>
          <div>
            <Label className="text-gray-400 text-xs">Quote notes (for customer)</Label>
            <Input
              value={quoteNotes}
              onChange={(e) => setQuoteNotes(e.target.value)}
              className="mt-1 bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
              placeholder="Includes wait time, tolls..."
            />
          </div>
          <div>
            <Label className="text-gray-400 text-xs">Internal admin notes</Label>
            <Input
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="mt-1 bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
              placeholder="Driver assigned..."
            />
          </div>
        </div>

        {(paymentUrl || booking.paymentUrl) && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 shrink-0">Payment link:</span>
            <a
              href={paymentUrl || booking.paymentUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="text-[#D4AF37] underline truncate max-w-full"
            >
              {paymentUrl || booking.paymentUrl}
            </a>
            <Button type="button" size="sm" variant="outline" onClick={copyLink} className="border-[#D4AF37]/30 text-[#D4AF37] h-7">
              <Copy className="w-3 h-3 mr-1" /> Copy
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">{new Date(booking.createdAt).toLocaleString()}</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={saveQuote} disabled={saving} size="sm" className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
              Save Quote
            </Button>
            <Button
              onClick={handleCreatePaymentLink}
              disabled={!canCreateLink || creatingLink || booking.paymentStatus === 'paid'}
              size="sm"
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37]"
            >
              {creatingLink ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4 mr-1" />}
              {booking.paymentStatus === 'paid' ? 'Paid' : 'Create Payment Link'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AboutContentForm({ initial, onSaved }: { initial: AboutContent; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection('about', form);
      toast.success('About page saved');
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label className="text-white">Title</Label><Input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Highlight</Label><Input value={form.heroHighlight} onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div className="md:col-span-2"><Label className="text-white">Subtitle</Label><Textarea value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Story</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><Label className="text-white">Story Title</Label><Input value={form.storyTitle} onChange={(e) => setForm({ ...form, storyTitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Story Highlight</Label><Input value={form.storyHighlight} onChange={(e) => setForm({ ...form, storyHighlight: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Years Value</Label><Input value={form.yearsValue} onChange={(e) => setForm({ ...form, yearsValue: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Years Label</Label><Input value={form.yearsLabel} onChange={(e) => setForm({ ...form, yearsLabel: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
        <div className="space-y-3">
          {form.storyParagraphs.map((p, i) => (
            <Textarea
              key={i}
              value={p}
              placeholder={`Paragraph ${i + 1}`}
              onChange={(e) => {
                const storyParagraphs = [...form.storyParagraphs];
                storyParagraphs[i] = e.target.value;
                setForm({ ...form, storyParagraphs });
              }}
              className="bg-[#0B0B0B] border-[#D4AF37]/20 text-white"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Focus Areas</h3>
        <div className="space-y-3">
          {form.focusAreas.map((item, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input value={item.icon || ''} placeholder="Icon" onChange={(e) => { const focusAreas = [...form.focusAreas]; focusAreas[i] = { ...item, icon: e.target.value }; setForm({ ...form, focusAreas }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={item.title} placeholder="Title" onChange={(e) => { const focusAreas = [...form.focusAreas]; focusAreas[i] = { ...item, title: e.target.value }; setForm({ ...form, focusAreas }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={item.description} placeholder="Description" onChange={(e) => { const focusAreas = [...form.focusAreas]; focusAreas[i] = { ...item, description: e.target.value }; setForm({ ...form, focusAreas }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Core Values</h3>
        <div className="space-y-3">
          {form.values.map((item, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input value={item.icon || ''} placeholder="Icon" onChange={(e) => { const values = [...form.values]; values[i] = { ...item, icon: e.target.value }; setForm({ ...form, values }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={item.title} placeholder="Title" onChange={(e) => { const values = [...form.values]; values[i] = { ...item, title: e.target.value }; setForm({ ...form, values }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={item.description} placeholder="Description" onChange={(e) => { const values = [...form.values]; values[i] = { ...item, description: e.target.value }; setForm({ ...form, values }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Why Choose Us</h3>
        <div className="space-y-3">
          {form.whyChooseUs.map((item, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input value={item.title} placeholder="Title" onChange={(e) => { const whyChooseUs = [...form.whyChooseUs]; whyChooseUs[i] = { ...item, title: e.target.value }; setForm({ ...form, whyChooseUs }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
                <Input value={item.description} placeholder="Description" onChange={(e) => { const whyChooseUs = [...form.whyChooseUs]; whyChooseUs[i] = { ...item, description: e.target.value }; setForm({ ...form, whyChooseUs }); }} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button onClick={save} disabled={saving} className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Save About Page
      </Button>
    </div>
  );
}

function FaqContentForm({ initial, onSaved }: { initial: FaqContent; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection('faq', form);
      toast.success('FAQ page saved');
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { question: 'New question?', answer: 'Answer goes here.' }],
    });
  };

  const removeItem = (index: number) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label className="text-white">Title</Label><Input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">Highlight</Label><Input value={form.heroHighlight} onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div className="md:col-span-2"><Label className="text-white">Subtitle</Label><Textarea value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#D4AF37] font-medium">Questions ({form.items.length})</h3>
          <Button type="button" variant="outline" size="sm" onClick={addItem} className="border-[#D4AF37]/30 text-[#D4AF37]">
            <Plus className="w-4 h-4 mr-1" /> Add FAQ
          </Button>
        </div>
        <div className="space-y-4">
          {form.items.map((item, i) => (
            <Card key={i} className="bg-[#0B0B0B] border-[#D4AF37]/10">
              <CardContent className="p-4 space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={item.question}
                    placeholder="Question"
                    onChange={(e) => {
                      const items = [...form.items];
                      items[i] = { ...item, question: e.target.value };
                      setForm({ ...form, items });
                    }}
                    className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeItem(i)} className="border-red-500/30 text-red-400 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={item.answer}
                  placeholder="Answer"
                  onChange={(e) => {
                    const items = [...form.items];
                    items[i] = { ...item, answer: e.target.value };
                    setForm({ ...form, items });
                  }}
                  className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#D4AF37] mb-3 font-medium">Bottom CTA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label className="text-white">CTA Title</Label><Input value={form.ctaTitle} onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-white">CTA Highlight</Label><Input value={form.ctaHighlight} onChange={(e) => setForm({ ...form, ctaHighlight: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
          <div className="md:col-span-2"><Label className="text-white">CTA Subtitle</Label><Input value={form.ctaSubtitle} onChange={(e) => setForm({ ...form, ctaSubtitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
        </div>
      </div>

      <Button onClick={save} disabled={saving} className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Save FAQ Page
      </Button>
    </div>
  );
}

function BookingsPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setBookings(await fetchBookings());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-gray-400 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading bookings...</div>;
  if (!bookings.length) return <p className="text-gray-400">No bookings yet.</p>;

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={load} className="border-[#D4AF37]/30 text-[#D4AF37]">
        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
      </Button>
      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} onUpdated={load} />
      ))}
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState<Array<{ id: string; name: string; phone: string; message: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactMessages()
      .then(setMessages)
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;
  if (!messages.length) return <p className="text-gray-400">No contact messages yet.</p>;

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <Card key={m.id} className="bg-[#0B0B0B] border-[#D4AF37]/10">
          <CardContent className="p-4">
            <p className="text-white font-medium">{m.name} · {m.phone}</p>
            <p className="text-gray-300 text-sm mt-2">{m.message}</p>
            <p className="text-gray-500 text-xs mt-2">{new Date(m.createdAt).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AdminDashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const { site, home, navigation, about, faq, refresh } = useContent();

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <header className="border-b border-[#D4AF37]/20 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-[#D4AF37]" />
            <div>
              <h1 className="text-xl text-white font-medium" style={{ fontFamily: 'var(--font-heading)' }}>High5 Limo CMS</h1>
              <p className="text-gray-400 text-xs">Signed in as {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={refresh} className="border-[#D4AF37]/30 text-[#D4AF37]">
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Link to="/"><Button variant="outline" className="border-[#D4AF37]/30 text-white">View Site</Button></Link>
            <Button variant="outline" onClick={onLogout} className="border-red-500/30 text-red-400">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="site">
          <TabsList className="bg-[#1A1A1A] border border-[#D4AF37]/20 mb-6 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="site" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><Settings className="w-4 h-4 mr-1" /> Site</TabsTrigger>
            <TabsTrigger value="home" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><Home className="w-4 h-4 mr-1" /> Home</TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><Info className="w-4 h-4 mr-1" /> About</TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><HelpCircle className="w-4 h-4 mr-1" /> FAQ</TabsTrigger>
            <TabsTrigger value="navigation" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><Menu className="w-4 h-4 mr-1" /> Navigation</TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><Calendar className="w-4 h-4 mr-1" /> Bookings</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0B0B0B]"><MessageSquare className="w-4 h-4 mr-1" /> Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="site">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20"><CardContent className="p-6">
              <SiteSettingsForm initial={site ?? DEFAULT_SITE} onSaved={refresh} />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="home">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20"><CardContent className="p-6">
              <HomeContentForm initial={home ?? DEFAULT_HOME} onSaved={refresh} />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20"><CardContent className="p-6">
              <AboutContentForm initial={about ?? DEFAULT_ABOUT} onSaved={refresh} />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20"><CardContent className="p-6">
              <FaqContentForm initial={faq ?? DEFAULT_FAQ} onSaved={refresh} />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="navigation">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20"><CardContent className="p-6">
              <NavigationForm initial={navigation ?? DEFAULT_NAVIGATION} onSaved={refresh} />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="bookings"><BookingsPanel /></TabsContent>
          <TabsContent value="messages"><MessagesPanel /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export function Admin() {
  const [username, setUsername] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      setChecking(false);
      return;
    }
    fetchMe()
      .then((user) => setUsername(user.username))
      .catch(() => clearAuthToken())
      .finally(() => setChecking(false));
  }, []);

  const logout = () => {
    clearAuthToken();
    setUsername(null);
    toast.success('Logged out');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" theme="dark" />
      {username ? (
        <AdminDashboard username={username} onLogout={logout} />
      ) : (
        <AdminLogin onSuccess={setUsername} />
      )}
    </>
  );
}
