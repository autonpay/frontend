import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { useCreateAgent } from '../../hooks/useAgents';
import { Bot, Info, Code } from 'lucide-react';
import './CreateAgentModal.css';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ isOpen, onClose }) => {
  const { mutateAsync: createAgent, isPending: loading } = useCreateAgent();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metadata: '{\n  "role": "autonomous_spender",\n  "model": "gpt-4o"\n}',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedMetadata = {};
      try {
        parsedMetadata = JSON.parse(formData.metadata);
      } catch (err) {
        // Fallback or ignore if invalid JSON
        console.warn('Invalid JSON in metadata, sending as empty object');
      }

      const payload = {
        name: formData.name,
        description: formData.description || undefined,
        metadata: parsedMetadata
      };

      const res = await createAgent(payload);
      if (res.success) {
        onClose();
        setFormData({ name: '', description: '', metadata: '{\n  "role": "autonomous_spender",\n  "model": "gpt-4o"\n}' });
      }
    } catch (err) {
      console.error('Failed to create agent:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initialize New Agent" size="md">
      <form onSubmit={handleSubmit} className="create-agent-form">
        <div className="form-section">
           <div className="section-header">
              <Bot size={18} />
              <span>Identity & Workspace</span>
           </div>
           <div className="form-group">
              <label>Agent Name</label>
              <input 
                name="name"
                placeholder="Marketing Spend Agent Alpha"
                value={formData.name}
                onChange={handleChange}
                required
              />
           </div>
        </div>

        <div className="form-section">
           <div className="section-header">
              <Info size={18} />
              <span>Description</span>
           </div>
           <div className="form-group">
              <input 
                name="description"
                placeholder="High-frequency SaaS orchestrator"
                value={formData.description}
                onChange={handleChange}
              />
           </div>
        </div>

        <div className="form-section">
           <div className="section-header">
              <Code size={18} />
              <span>Agent Metadata (JSON)</span>
           </div>
           <div className="form-group">
              <textarea 
                name="metadata"
                className="code-textarea"
                rows={5}
                value={formData.metadata}
                onChange={handleChange}
              />
           </div>
        </div>

        <div className="form-actions">
           <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
              Cancel
           </Button>
           <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Bootstrapping...' : 'Instantiate Agent'}
           </Button>
        </div>
      </form>
    </Modal>
  );
};
