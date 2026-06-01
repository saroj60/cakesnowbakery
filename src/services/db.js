import { supabase } from '../lib/supabase';

// --- Auth ---
export const login = async (email, password) => {
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  if (trimmedEmail === 'cakesnowbakery.com' && trimmedPassword === 'cakesnowbakery@@2026') {
    sessionStorage.setItem('admin_session', 'true');
    return { user: { email: trimmedEmail }, error: null };
  }
  return { user: null, error: 'Invalid login credentials' };
};

export const logout = async () => {
  sessionStorage.removeItem('admin_session');
};

export const getSession = async () => {
  if (sessionStorage.getItem('admin_session') === 'true') {
    return { user: { email: 'cakesnowbakery.com' } };
  }
  return null;
};

// --- Products ---
export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products from Supabase:", error);
    return [];
  }
  return data || [];
};

export const saveProduct = async (product) => {
  if (product.id) {
    const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select().single();
    if (error) {
      console.error("Error updating product in Supabase:", error);
      throw error;
    }
    return data;
  }
  
  const { data, error } = await supabase.from('products').insert([product]).select().single();
  if (error) {
    console.error("Error inserting product into Supabase:", error);
    throw error;
  }
  return data;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    console.error("Error deleting product from Supabase:", error);
    throw error;
  }
};

// --- Storage ---
export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- Orders ---
// Fallback to memory if table doesn't exist
let memoryOrders = [];

export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) {
    console.warn("Orders table might not exist, using memory fallback.");
    return [...memoryOrders];
  }
  return data || [];
};

export const saveOrder = async (order) => {
  const orderData = {
    id: order.id || 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    customer: order.customer,
    items: order.items,
    total: order.total,
    status: order.status || 'Pending',
    createdAt: new Date().toISOString()
  };

  const { data, error } = await supabase.from('orders').upsert([orderData]).select().single();
  if (error) {
    console.warn("Orders table might not exist, saving to memory fallback.");
    if (order.id) {
      const index = memoryOrders.findIndex(o => o.id === order.id);
      if (index !== -1) {
        memoryOrders[index] = { ...memoryOrders[index], ...orderData };
        return memoryOrders[index];
      }
    }
    memoryOrders.unshift(orderData);
    return orderData;
  }
  return data;
};

// --- Settings ---
let memorySettings = { isOpen: true, deliveryCharge: 0 };

export const getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*').single();
  if (error) {
    return { ...memorySettings };
  }
  return data || { ...memorySettings };
};

export const updateSettings = async (settings) => {
  const { data, error } = await supabase.from('settings').upsert([settings]).select().single();
  if (error) {
    memorySettings = { ...memorySettings, ...settings };
    return memorySettings;
  }
  return data;
};
