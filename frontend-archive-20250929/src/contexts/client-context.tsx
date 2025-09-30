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

  // Save clients to localStorage whenever clients change
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem('mizan-clients', JSON.stringify(clients));
    }
  }, [clients]);

  const loadClients = async () => {
    try {
      // ALWAYS load from localStorage first for immediate UI
      const savedClients = localStorage.getItem('mizan-clients');
      console.log('🔍 Checking localStorage for clients...', savedClients ? 'FOUND' : 'EMPTY');
      
      if (savedClients) {
        try {
          const parsedClients = JSON.parse(savedClients);
          console.log('📱 Loaded clients from localStorage:', parsedClients);
          setClients(parsedClients);
        } catch (parseError) {
          console.error('Error parsing localStorage clients:', parseError);
          localStorage.removeItem('mizan-clients'); // Clear corrupted data
        }
      }

      // Then try to sync with backend (but don't overwrite localStorage unless backend has more data)
      try {
        const response = await fetch('https://mizan-backend-production.up.railway.app/api/superadmin/clients');
        if (response.ok) {
          const data = await response.json();
          if (data.clients && data.clients.length > 0) {
            console.log('🔄 Backend has clients:', data.clients.length);
            // Only update if backend has more clients than localStorage
            const currentLocalCount = savedClients ? JSON.parse(savedClients).length : 0;
            if (data.clients.length > currentLocalCount) {
              console.log('📦 Updating localStorage with backend data');
              setClients(data.clients);
              localStorage.setItem('mizan-clients', JSON.stringify(data.clients));
            }
          } else {
            console.log('🔄 Backend returned empty clients, keeping localStorage data');
          }
        } else {
          console.log('🔄 Backend not available, using localStorage only');
        }
      } catch (backendError) {
        console.log('🔄 Backend sync failed, using localStorage only:', backendError.message);
      }
    } catch (error) {
      console.error('Critical error in loadClients:', error);
    }
  };

  const addClient = async (clientData: Omit<Client, 'id' | 'status' | 'lastActive' | 'mrr' | 'createdAt'>) => {
    console.log('🆕 Adding new client:', clientData.name);
    
    // ALWAYS create client locally first for immediate UI feedback
    const newClient: Client = {
      id: `local-${Date.now()}`,
      ...clientData,
      status: 'active',
      lastActive: 'Just now',
      mrr: calculateMRR(clientData.plan, clientData.employees),
      createdAt: new Date().toISOString()
    };

    const updatedClients = [...clients, newClient];
    console.log('💾 Saving client locally first. Current clients:', clients.length, 'Updated clients:', updatedClients.length);
    
    // Update state and localStorage immediately
    setClients(updatedClients);
    localStorage.setItem('mizan-clients', JSON.stringify(updatedClients));
    console.log('✅ Client saved locally:', newClient.name, 'localStorage updated');

    // Then try to save to backend asynchronously
    try {
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/superadmin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🔄 Backend also saved client:', data.client?.name);
        // Keep localStorage as the primary source of truth
      } else {
        console.log('🔄 Backend save failed, keeping local version');
      }
    } catch (error) {
      console.log('🔄 Backend not available, client saved locally only:', error.message);
    }
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
