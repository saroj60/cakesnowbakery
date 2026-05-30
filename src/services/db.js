import { supabase } from '../lib/supabase';

// --- Auth ---
export const login = async (email, password) => {
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  if (trimmedEmail === 'cakesnowbakery.com' && trimmedPassword === 'cakesnowbakery@@2026') {
    localStorage.setItem('admin_session', 'true');
    return { user: { email: trimmedEmail }, error: null };
  }
  return { user: null, error: 'Invalid login credentials' };
};

export const logout = async () => {
  localStorage.removeItem('admin_session');
};

export const getSession = async () => {
  if (localStorage.getItem('admin_session') === 'true') {
    return { user: { email: 'cakesnowbakery.com' } };
  }
  return null;
};

// --- Products ---
export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(p => ({
      ...p,
      image: p.image_url,
      isActive: p.is_active,
      isPerLb: p.is_per_lb || false,
      occasion: p.occasion,
      tags: p.occasion ? [p.occasion] : ['Birthdays']
    }));
  } catch (error) {
    console.warn("Supabase fetch failed, returning mock data. Error:", error.message);
    return [
      {
        id: 'mock-1',
        name: 'Royal Chocolate Fudge',
        category: 'Cakes',
        description: 'Decadent dark chocolate layers filled with rich Belgian ganache.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
        isActive: true,
        tags: ['Weddings']
      },
      {
        id: 'mock-2',
        name: 'Strawberry Cream Dream',
        category: 'Cakes',
        description: 'Fresh organic strawberries layered with light vanilla sponge.',
        price: 1400,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
        isActive: true,
        tags: ['Baby showers']
      },
      {
        id: 'mock-3',
        name: 'Red Velvet Rosette',
        category: 'Cakes',
        description: 'Classic velvety cocoa crumb layers with rich cream cheese frosting.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800',
        isActive: true,
        tags: ['Anniversaries']
      },
      {
        id: 'mock-4',
        name: 'Classic Vanilla Bean',
        category: 'Cakes',
        description: 'Light and fluffy vanilla cake made with real Madagascar vanilla beans.',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
        isActive: true,
        tags: ['Birthdays']
      },
      {
        id: 'mock-5',
        name: 'Black Forest Gateau',
        category: 'Cakes',
        description: 'Layers of chocolate sponge, sour cherries, and whipped cream.',
        price: 1350,
        image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800',
        isActive: true,
        tags: ['Job promotions']
      },
      {
        id: 'mock-6',
        name: 'Lemon Blueberry Pound',
        category: 'Cakes',
        description: 'Zesty lemon pound cake studded with fresh blueberries.',
        price: 950,
        image: 'https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?auto=format&fit=crop&q=80&w=800',
        isActive: true,
        tags: ['Opening a new business']
      }
    ];
  }
};

export const saveProduct = async (product) => {
  const productData = {
    name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image,
    category: product.category,
    occasion: product.occasion || 'General / Any',
    is_active: product.isActive,
    is_per_lb: product.isPerLb || false
  };

  if (product.id) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', product.id)
      .select();
    if (error) throw error;
    return data[0];
  } else {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();
    if (error) throw error;
    return data[0];
  }
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// --- Storage ---
export const uploadImage = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// --- Orders ---
export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data.map(o => ({
    ...o,
    createdAt: o.created_at,
    customer: {
      name: o.customer_name,
      phone: o.customer_phone,
      address: o.customer_address,
      lat: o.lat,
      lng: o.lng,
      notes: o.notes
    }
  }));
};

export const saveOrder = async (order) => {
  const orderData = {
    id: order.id || 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    customer_address: order.customer.address,
    lat: order.customer.lat,
    lng: order.customer.lng,
    notes: order.customer.notes,
    items: order.items,
    total: order.total,
    status: order.status || 'Pending'
  };

  const { data, error } = await supabase
    .from('orders')
    .upsert([orderData])
    .select();
  
  if (error) throw error;
  return data[0];
};

// --- Settings ---
export const getSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || { isOpen: true, deliveryCharge: 0 };
};

export const updateSettings = async (settings) => {
  const { data, error } = await supabase
    .from('settings')
    .upsert([{ id: 1, ...settings }])
    .select();
  
  if (error) throw error;
  return data[0];
};
