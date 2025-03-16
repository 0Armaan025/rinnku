import { Layout, PanelLeft, Crop, Grip, Link as LinkIcon, User, Headphones, Video, ShoppingBag, MessageCircle } from 'lucide-react';

const themeOptions = [
  {
    id: 'midnight',
    name: 'Midnight',
    from: 'from-indigo-600',
    to: 'to-blue-700',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-blue-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-blue-400'
  },
  {
    id: 'slate',
    name: 'Slate',
    from: 'from-slate-600',
    to: 'to-slate-800',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-slate-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-slate-300'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    from: 'from-emerald-500',
    to: 'to-teal-700',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-emerald-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-emerald-400'
  },
  {
    id: 'amber',
    name: 'Amber',
    from: 'from-amber-500',
    to: 'to-orange-600',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-amber-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-amber-400'
  },
  {
    id: 'rose',
    name: 'Rose',
    from: 'from-rose-500',
    to: 'to-pink-600',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-rose-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-rose-400'
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    from: 'from-gray-600',
    to: 'to-gray-800',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-gray-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-gray-400'
  },
];

// Simplified layout templates for cleaner options
const layoutTemplates = [
  {
    id: 'standard',
    name: 'Standard',
    icon: <Layout size={16} />,
    description: 'Classic stacked layout'
  },
  {
    id: 'compact',
    name: 'Compact',
    icon: <PanelLeft size={16} />,
    description: 'Space-efficient design'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: <Crop size={16} />,
    description: 'Clean, distraction-free design'
  },
  {
    id: 'grid',
    name: 'Grid',
    icon: <Grip size={16} />,
    description: 'Two-column grid layout'
  },
];

// Link animations
const animationOptions = [
  { id: 'none', name: 'None', description: 'No animation' },
  { id: 'pulse', name: 'Pulse', description: 'Gentle pulsing effect' },
  { id: 'scale', name: 'Scale', description: 'Grows slightly on hover' },
  { id: 'slide', name: 'Slide', description: 'Slides in from the side' }
];

// Link types
const linkTypes = [
  { id: 'default', name: 'Default', icon: <LinkIcon size={16} /> },
  { id: 'social', name: 'Social', icon: <User size={16} /> },
  { id: 'music', name: 'Music', icon: <Headphones size={16} /> },
  { id: 'video', name: 'Video', icon: <Video size={16} /> },
  { id: 'shop', name: 'Shop', icon: <ShoppingBag size={16} /> },
  { id: 'message', name: 'Message', icon: <MessageCircle size={16} /> }
];

const customizationUtils = {
  themeOptions,
  layoutTemplates,
  animationOptions,
  linkTypes
};

export default customizationUtils;