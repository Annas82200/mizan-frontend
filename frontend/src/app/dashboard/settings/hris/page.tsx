'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Database, Plus, RefreshCw, CheckCircle, XCircle, AlertTriangle, Play, Settings } from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  hrisType: string;
  connectionType: string;
  status: 'active' | 'paused' | 'error' | 'configuring';
  lastSyncAt: string | null;
  lastSyncStatus: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export default function HRISSettingsPage() {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConnector, setNewConnector] = useState({
    name: '', hrisType: 'custom_rest', connectionType: 'rest', baseUrl: '',
  });

  useEffect(() => { loadConnectors(); }, []);

  const loadConnectors = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/hris/connectors');
      setConnectors((response.data as { connectors: Connector[] }).connectors);
    } catch (err) {
      setError('Failed to load HRIS connectors');
    } finally {
      setIsLoading(false);
    }
  };

  const createConnector = async () => {
    try {
      await apiClient.post('/api/hris/connectors', {
        ...newConnector,
        authConfig: { type: 'api_key', credentials: {} },
      });
      setShowAddForm(false);
      setNewConnector({ name: '', hrisType: 'custom_rest', connectionType: 'rest', baseUrl: '' });
      loadConnectors();
    } catch (err) {
      setError('Failed to create connector');
    }
  };

  const testConnection = async (connectorId: string) => {
    try {
      const response = await apiClient.post(`/api/hris/connectors/${connectorId}/test`);
      const testResult = response.data as { success: boolean; message?: string };
      if (testResult.success) {
        loadConnectors();
      } else {
        setError(`Connection test failed: ${testResult.message}`);
      }
    } catch (err) {
      setError('Connection test failed');
    }
  };

  const triggerSync = async (connectorId: string, type: 'full' | 'incremental') => {
    try {
      await apiClient.post(`/api/hris/connectors/${connectorId}/sync/${type}`);
      loadConnectors();
    } catch (err) {
      setError(`Sync failed`);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'configuring': return <Settings className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Database className="h-6 w-6" />
            HRIS Connectors
          </h1>
          <p className="text-gray-500 mt-1">Connect your HR systems to sync employee data automatically</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add Connector
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {/* Add connector form */}
      {showAddForm && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">New HRIS Connector</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={newConnector.name} onChange={(e) => setNewConnector({...newConnector, name: e.target.value})}
                className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="My HRIS" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Connection Type</label>
              <select value={newConnector.connectionType} onChange={(e) => setNewConnector({...newConnector, connectionType: e.target.value})}
                className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="rest">REST API</option>
                <option value="soap">SOAP/XML</option>
                <option value="webhook">Webhook (Real-time)</option>
                <option value="sftp">SFTP/CSV File</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
              <input type="text" value={newConnector.baseUrl} onChange={(e) => setNewConnector({...newConnector, baseUrl: e.target.value})}
                className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="https://api.yourhris.com" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={createConnector} className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800">Create</button>
            <button onClick={() => setShowAddForm(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Connector list */}
      {connectors.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <Database className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No connectors configured</h3>
          <p className="mt-2 text-sm text-gray-500">Add your first HRIS connector to start syncing employee data.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {connectors.map((connector) => (
            <div key={connector.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {statusIcon(connector.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{connector.name}</h3>
                    <p className="text-xs text-gray-500">
                      {connector.connectionType.toUpperCase()} {' · '} {connector.hrisType}
                      {connector.lastSyncAt && ` · Last sync: ${new Date(connector.lastSyncAt).toLocaleString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => testConnection(connector.id)}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                    <CheckCircle className="h-3 w-3" /> Test
                  </button>
                  <button onClick={() => triggerSync(connector.id, 'incremental')}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                    <RefreshCw className="h-3 w-3" /> Sync
                  </button>
                  <button onClick={() => triggerSync(connector.id, 'full')}
                    className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs hover:bg-gray-200">
                    <Play className="h-3 w-3" /> Full Sync
                  </button>
                </div>
              </div>
              {connector.errorMessage && (
                <div className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">{connector.errorMessage}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
