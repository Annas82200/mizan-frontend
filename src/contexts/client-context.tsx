"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  plan: string;
  employees: number;
  industry: string;
  strategy?: string;
  vision?: string;
  mission?: string;
  values?: string;
  status: string;
  lastActive: string;
  mrr: number;
  createdAt: string;
}

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'status' | 'lastActive' | 'mrr' | 'createdAt'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  refreshClients: () => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);

  // Load clients on mount
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      // Try to load from backend first
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/superadmin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      } else {
        // Fallback to localStorage
        const savedClients = localStorage.getItem('mizan-clients');
        if (savedClients) {
          setClients(JSON.parse(savedClients));
        }
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
      // Fallback to localStorage
      const savedClients = localStorage.getItem('mizan-clients');
      if (savedClients) {
        setClients(JSON.parse(savedClients));
      }
    }
  };

  const addClient = async (clientData: Omit<Client, 'id' | 'status' | 'lastActive' | 'mrr' | 'createdAt'>) => {
    try {
      // Try to save to backend first
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/superadmin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });

      if (response.ok) {
        const data = await response.json();
        const newClient = data.client;
        setClients(prev => [...prev, newClient]);
        // Also save to localStorage as backup
        localStorage.setItem('mizan-clients', JSON.stringify([...clients, newClient]));
        return;
      }
    } catch (error) {
      console.error('Failed to save to backend:', error);
    }

    // Fallback to localStorage only
    const newClient: Client = {
      id: Date.now().toString(),
      ...clientData,
      status: 'active',
      lastActive: 'Just now',
      mrr: calculateMRR(clientData.plan, clientData.employees),
      createdAt: new Date().toISOString()
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem('mizan-clients', JSON.stringify(updatedClients));
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    const updatedClients = clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    );
    setClients(updatedClients);
    localStorage.setItem('mizan-clients', JSON.stringify(updatedClients));
  };

  const deleteClient = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    localStorage.setItem('mizan-clients', JSON.stringify(updatedClients));
  };

  const getClient = (id: string) => {
    return clients.find(client => client.id === id);
  };

  const refreshClients = async () => {
    await loadClients();
  };

  return (
    <ClientContext.Provider value={{
      clients,
      addClient,
      updateClient,
      deleteClient,
      getClient,
      refreshClients
    }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
}

function calculateMRR(plan: string, employees: number) {
  switch (plan.toLowerCase()) {
    case 'entry':
      return 0;
    case 'pro':
      return 79;
    case 'pro-plus':
      return employees * 8;
    case 'enterprise':
      return 0; // Custom pricing
    default:
      return 0;
  }
}
