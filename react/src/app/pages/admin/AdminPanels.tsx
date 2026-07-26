import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Save, Download, Plus, Trash2, Car, FileText, BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  fetchAdminStats, downloadBookingsReport,
  fetchAllVehicles, createVehicle, updateVehicle, deleteVehicle,
  fetchAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  updateSection, type Vehicle, type BlogPost, type AdminStats,
} from '../../../lib/api';
import type { LegalContent } from '../../../types/content';
import { DEFAULT_LEGAL } from '../../../lib/defaults';

export function DashboardPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const exportReport = async () => {
    try {
      const blob = await downloadBookingsReport(from || undefined, to || undefined);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Export failed');
    }
  };

  if (loading) return <p className="text-gray-400 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading dashboard...</p>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.totalBookings },
          { label: 'Messages', value: stats.totalMessages },
          { label: 'Revenue (paid)', value: `$${stats.revenue.toFixed(2)}` },
          { label: 'Pending Quote', value: stats.statusCounts.pending_quote ?? 0 },
        ].map(({ label, value }) => (
          <Card key={label} className="bg-[#0B0B0B] border-[#D4AF37]/10">
            <CardContent className="p-4">
              <p className="text-gray-400 text-xs">{label}</p>
              <p className="text-2xl text-[#D4AF37] font-semibold mt-1">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#0B0B0B] border-[#D4AF37]/10">
        <CardHeader><CardTitle className="text-white flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#D4AF37]" /> Recent Bookings</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {stats.recentBookings.map((b) => (
            <div key={b.id} className="flex justify-between text-sm border-b border-[#D4AF37]/5 pb-2">
              <span className="text-white">{b.fullName}</span>
              <span className="text-gray-400">{b.date} · {b.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#0B0B0B] border-[#D4AF37]/10">
        <CardHeader><CardTitle className="text-white flex items-center gap-2"><Download className="w-5 h-5 text-[#D4AF37]" /> Export Report</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3 items-end">
          <div><Label className="text-gray-400 text-xs">From</Label><Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 bg-[#1A1A1A] border-[#D4AF37]/20 text-white" /></div>
          <div><Label className="text-gray-400 text-xs">To</Label><Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 bg-[#1A1A1A] border-[#D4AF37]/20 text-white" /></div>
          <Button onClick={exportReport} className="bg-[#D4AF37] text-[#0B0B0B]">Download CSV</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function VehiclesPanel() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchAllVehicles().then(setVehicles).catch(() => toast.error('Failed to load vehicles')).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const addVehicle = async () => {
    try {
      await createVehicle({ name: 'New Vehicle', passengers: 4, luggage: 2, features: [] });
      toast.success('Vehicle added');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    }
  };

  if (loading) return <p className="text-gray-400"><Loader2 className="w-4 h-4 animate-spin inline" /> Loading...</p>;

  return (
    <div className="space-y-4">
      <Button onClick={addVehicle} className="bg-[#D4AF37] text-[#0B0B0B]"><Plus className="w-4 h-4 mr-2" /> Add Vehicle</Button>
      {vehicles.map((v) => (
        <Card key={v.id} className="bg-[#0B0B0B] border-[#D4AF37]/10">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input defaultValue={v.name} onBlur={(e) => updateVehicle(v.id, { name: e.target.value }).then(load)} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
            <Input type="number" defaultValue={v.passengers} onBlur={(e) => updateVehicle(v.id, { passengers: Number(e.target.value) }).then(load)} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" placeholder="Passengers" />
            <Input defaultValue={v.imageUrl || ''} onBlur={(e) => updateVehicle(v.id, { imageUrl: e.target.value }).then(load)} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" placeholder="Image URL" />
            <div className="flex gap-2">
              <label className="flex items-center gap-2 text-white text-sm"><input type="checkbox" defaultChecked={v.active} onChange={(e) => updateVehicle(v.id, { active: e.target.checked }).then(load)} /> Active</label>
              <Button size="sm" variant="outline" onClick={() => deleteVehicle(v.id).then(load)} className="border-red-500/30 text-red-400"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {!vehicles.length && <p className="text-gray-400 flex items-center gap-2"><Car className="w-4 h-4" /> No vehicles yet.</p>}
    </div>
  );
}

export function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchAllBlogPosts().then(setPosts).catch(() => toast.error('Failed to load posts')).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const addPost = async () => {
    try {
      await createBlogPost({ title: 'New Post', body: 'Write your content here...', published: false });
      toast.success('Post created');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    }
  };

  if (loading) return <p className="text-gray-400"><Loader2 className="w-4 h-4 animate-spin inline" /> Loading...</p>;

  return (
    <div className="space-y-4">
      <Button onClick={addPost} className="bg-[#D4AF37] text-[#0B0B0B]"><Plus className="w-4 h-4 mr-2" /> New Post</Button>
      {posts.map((p) => (
        <Card key={p.id} className="bg-[#0B0B0B] border-[#D4AF37]/10">
          <CardContent className="p-4 space-y-3">
            <Input defaultValue={p.title} onBlur={(e) => updateBlogPost(p.id, { title: e.target.value }).then(load)} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
            <Textarea defaultValue={p.body} rows={4} onBlur={(e) => updateBlogPost(p.id, { body: e.target.value }).then(load)} className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white" />
            <div className="flex flex-wrap gap-3 items-center">
              <label className="flex items-center gap-2 text-white text-sm"><input type="checkbox" defaultChecked={p.published} onChange={(e) => updateBlogPost(p.id, { published: e.target.checked }).then(load)} /> Published</label>
              <Button size="sm" variant="outline" onClick={() => deleteBlogPost(p.id).then(load)} className="border-red-500/30 text-red-400"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {!posts.length && <p className="text-gray-400 flex items-center gap-2"><FileText className="w-4 h-4" /> No posts yet.</p>}
    </div>
  );
}

export function LegalForm({ initial, onSaved }: { initial: LegalContent; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection('legal', form);
      toast.success('Legal pages saved');
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-white">Privacy Title</Label>
        <Input value={form.privacyTitle} onChange={(e) => setForm({ ...form, privacyTitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" />
        <Label className="text-white mt-3 block">Privacy Body (HTML)</Label>
        <Textarea value={form.privacyBody} onChange={(e) => setForm({ ...form, privacyBody: e.target.value })} rows={8} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white font-mono text-sm" />
      </div>
      <div>
        <Label className="text-white">Terms Title</Label>
        <Input value={form.termsTitle} onChange={(e) => setForm({ ...form, termsTitle: e.target.value })} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" />
        <Label className="text-white mt-3 block">Terms Body (HTML)</Label>
        <Textarea value={form.termsBody} onChange={(e) => setForm({ ...form, termsBody: e.target.value })} rows={8} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white font-mono text-sm" />
      </div>
      <Button onClick={save} disabled={saving} className="bg-[#D4AF37] text-[#0B0B0B]">
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Save Legal Pages
      </Button>
    </div>
  );
}
